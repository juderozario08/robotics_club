import express from 'express'
import { logError, logSuccess } from '../utils/logging'
import bcrypt from "bcrypt"
import { STATUS_CODES, STATUS_MESSAGES } from '../status';
import { User } from '../schemas/user.schema';
import { Session } from '../schemas/session.schema';
import signupValidation from '../middleware/signupValidation';

const router = express.Router()

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
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
                "Login Error: User already logged in!"
            )
            return
        }

        const sessionData = {
            userId: user._id,
            username
        }
        await Session.create(sessionData)
        const response = {
            message: STATUS_MESSAGES.success,
            id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
        logSuccess(
            res,
            response,
            STATUS_CODES.success,
            `Created session: ${sessionData}\nLogin Success! ${response}`
        );
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
        logSuccess(
            res,
            { message: STATUS_MESSAGES.success },
            STATUS_CODES.success,
            `User signup success! ${userData}`
        )
    } catch (err) {
        logError(res, STATUS_MESSAGES.server_error, STATUS_CODES.server_error, err)
    }
})

router.post("/logout", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            logError(
                res,
                STATUS_MESSAGES.not_found,
                STATUS_CODES.not_found,
                "Logout failed: userId not given!"
            );
            return
        }
        const session = await Session.findOneAndDelete({ userId })
        if (!session) {
            logError(
                res,
                STATUS_MESSAGES.not_authenticated,
                STATUS_CODES.unauthorized,
                `Logout failed: Session not found! ${req.body}`
            );
            return
        }
        logSuccess(
            res,
            { message: STATUS_MESSAGES.success },
            STATUS_CODES.success,
            `Logout Success! ${req.body}`
        )
    } catch (err) {
        logError(
            res,
            STATUS_MESSAGES.server_error,
            STATUS_CODES.server_error,
            err
        )
    }
})

export { router }
