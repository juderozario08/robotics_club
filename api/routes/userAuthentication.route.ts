import express from 'express'
import logError from '../utils/errorLog'
import bcrypt from "bcrypt"
import { STATUS_CODES, STATUS_MESSAGES } from '../status';
import { User } from '../schemas/user.schema';
import { Session } from '../schemas/session.schema';
import signupValidation from '../middleware/signupValidation';

const userAuthentication = express.Router()

userAuthentication.post("/login", async (req, res) => {
    try {
        const { username, password, deviceId } = req.body;
        if (!username || !password) {
            console.log("Login Error: Username or Password not provided\n")
            res.status(STATUS_CODES.not_acceptable)
                .json({ message: STATUS_MESSAGES.invalid_login })
            return
        }

        const user = await User.findOne({ username })
        if (!user) {
            console.log("Login Error: Username not found in the database\n")
            res.status(STATUS_CODES.unauthorized)
                .json({ message: STATUS_MESSAGES.invalid_login });
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("Login Error: Password does not match with the provided username\n")
            res.status(STATUS_CODES.unauthorized)
                .json({ message: STATUS_MESSAGES.invalid_login });
            return;
        }
        const session = await Session.findOne({ userId: user._id })
        if (session) {
            // TODO: Implement a functionality to log them out of whatever other device
            // they were logged in and then create this new session
            console.log("Login Error: User already logged in on another device\n")
            res.status(STATUS_CODES.unauthorized)
                .json({ message: STATUS_MESSAGES.already_logged_in })
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
        logError(res, err)
    }
})

userAuthentication.post("/signup", signupValidation, async (req, res) => {
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
        logError(res, err)
    }
})

userAuthentication.post("/logout", async (req, res) => {
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
        logError(res, err)
    }
})

export { userAuthentication }
