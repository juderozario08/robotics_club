import express from 'express'
import logError from '../utils/errorLog'
import { STATUS_CODES, STATUS_MESSAGES } from '../globals';
import { User } from '../schemas/user.schema';

const loginRouter = express.Router()

loginRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(STATUS_CODES.not_acceptable)
                .json({
                    message: STATUS_MESSAGES.invalid_login
                })
            return
        }

        // TODO: UNHASH THE PASSWORD TO BE ENCRPYTED AND THEN SAVED
        const user = await User.findOne({ username, password })
        if (!user) {
            res.status(STATUS_CODES.not_found)
                .json({
                    message: STATUS_MESSAGES.not_found
                })
            return
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

loginRouter.post("/signup", async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        if (!firstname || !lastname || !username || !email || !password) {
            res.status(STATUS_CODES.not_acceptable)
                .json({
                    message: STATUS_MESSAGES.invalid_signup,
                })
            return
        }

        await User.create({
            firstname,
            lastname,
            username,
            email,
            password
        })
        res.status(STATUS_CODES.success)
            .json({
                message: STATUS_MESSAGES.success
            })

    } catch (err) {
        logError(res, err)
    }
})

export { loginRouter }
