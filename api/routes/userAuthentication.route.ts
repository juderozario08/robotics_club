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
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(STATUS_CODES.not_acceptable)
                .json({ message: STATUS_MESSAGES.invalid_login })
            return
        }

        const user = await User.findOne({ username })
        if (!user) {
            res.status(STATUS_CODES.unauthorized)
                .json({ message: STATUS_MESSAGES.invalid_login });
            return;
        }

        // TODO: UNHASH THE PASSWORD TO BE CHECKED
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(STATUS_CODES.unauthorized)
                .json({ message: STATUS_MESSAGES.invalid_login });
            return;
        }
        else {
            const session = await Session.findOne({ userId: user._id })
            if (session) {
                // TODO: Implement a functionality to log them out of whatever other device
                // they were logged in and then create this new session
                res.status(STATUS_CODES.unauthorized)
                    .json({ message: STATUS_MESSAGES.already_logged_in })
                return
            }
            await Session.create({
                userId: user._id,
                username
            })
        }

        res.status(STATUS_CODES.success)
            .json({
                message: STATUS_MESSAGES.success,
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            })
    } catch (err) {
        logError(res, err)
    }
})

userAuthentication.post("/signup", signupValidation, async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, role, features } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            role,
            features
        })
        res.status(STATUS_CODES.success)
            .json({ message: STATUS_MESSAGES.success })

    } catch (err) {
        logError(res, err)
    }
})

userAuthentication.post("/logout", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(STATUS_CODES.not_found)
                .json({ message: STATUS_MESSAGES.not_found })
            return
        }
        const session = await Session.findOneAndDelete({ userId })
        if (!session) {
            res.status(STATUS_CODES.unauthorized)
                .json({ message: STATUS_MESSAGES.not_authenticated })
            return
        }
        res.status(STATUS_CODES.success)
            .json({
                message: STATUS_MESSAGES.success
            })
    } catch (err) {
        logError(res, err)
    }
})

export { userAuthentication }
