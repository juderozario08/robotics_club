import express from 'express'
import logError from '../utils/errorLog'
import bcrypt from "bcrypt"
import { STATUS_CODES, STATUS_MESSAGES } from '../status';
import { User } from '../schemas/user.schema';
import { Session } from '../schemas/session.schema';
import signupValidation from '../middleware/signupValidation';

const router = express.Router()

router.post("/login", async (req, res) => {
    try {
        const { username, password, deviceId } = req.body;
        if (!username || !password) {
            logError(
                res,
                STATUS_MESSAGES.invalid_login,
                STATUS_CODES.not_acceptable,
                "Login Error: Username or Password not provided"
            );
            return
        }

        const user = await User.findOne({ username })
        if (!user) {
            logError(
                res,
                STATUS_MESSAGES.invalid_login,
                STATUS_CODES.unauthorized,
                "Login Error: Username not found in the database"
            )
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            logError(
                res,
                STATUS_MESSAGES.invalid_login,
                STATUS_CODES.unauthorized,
                "Login Error: Password does not match with the provided username"
            )
            return;
        }
        const session = await Session.findOne({ userId: user._id })
        if (session) {
            // TODO: Implement a functionality to log them out of whatever other device
            // they were logged in and then create this new session
            logError(
                res,
                STATUS_MESSAGES.already_logged_in,
                STATUS_CODES.unauthorized,
                "Login Error: User already logged in on another device"
            )
            return
        }

        const sessionData = {
            userId: user._id,
            deviceId,
            username
        }
        await Session.create(sessionData)
        console.log("Created session: ", sessionData, "\n")
        const response = {
            message: STATUS_MESSAGES.success,
            id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
        console.log("Login Success!", response, "\n")
        res.status(STATUS_CODES.success)
            .json(response)
    } catch (err) {
        logError(res, STATUS_MESSAGES.server_error, STATUS_CODES.server_error, err)
    }
})

router.post("/signup", signupValidation, async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, role, features } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            role,
            features
        }
        await User.create(userData)
        console.log("User signup success!", userData, "\n")
        res.status(STATUS_CODES.success)
            .json({ message: STATUS_MESSAGES.success })

    } catch (err) {
        logError(res, STATUS_MESSAGES.server_error, STATUS_CODES.server_error, err)
    }
})

router.post("/logout", async (req, res) => {
    try {
        const { userId, deviceId } = req.body;
        if (!userId || !deviceId) {
            console.log("Logout failed: userId not given!\n")
            res.status(STATUS_CODES.not_found)
                .json({ message: STATUS_MESSAGES.not_found })
            return
        }
        const session = await Session.findOneAndDelete({ userId, deviceId })
        if (!session) {
            console.log("Logout failed: Session not found!", req.body, "\n")
            res.status(STATUS_CODES.unauthorized)
                .json({ message: STATUS_MESSAGES.not_authenticated })
            return
        }
        console.log("Logout Success!", req.body, "\n")
        res.status(STATUS_CODES.success)
            .json({
                message: STATUS_MESSAGES.success
            })
    } catch (err) {
        logError(res, STATUS_MESSAGES.server_error, STATUS_CODES.server_error, err)
    }
})

export { router }
