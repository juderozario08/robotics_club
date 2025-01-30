import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import { logError } from "../utils/logging";
import type { NextFunction, Request, Response } from "express";
import { validateEmail, validateFeatures, validateName, validatePassword, validateRole, validateUsername } from "../../helpers/validationFunctions";
import { User } from "../schemas/user.schema";

export default async function signupValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password, email, role, features, firstname, lastname } = req.body;
        if (!validateUsername(username)
            || !validatePassword(password)
            || !validateEmail(email)
            || !validateRole(role)
            || !validateFeatures(features)
            || !validateName(firstname, lastname)
        ) {
            logError(
                res,
                STATUS_MESSAGES.invalid_signup,
                STATUS_CODES.not_acceptable,
                `Signup Failed: Invalid signup data. ${req.body}`
            )
            return
        }
        const usernameUser = await User.find({ username })
        if (usernameUser) {
            logError(
                res,
                STATUS_MESSAGES.invalid_data,
                STATUS_CODES.forbidden,
                `A user with the username: ${username} already exists!`
            )
            return
        }
        const emailUser = await User.find({ email })

        if (emailUser) {
            logError(
                res,
                STATUS_MESSAGES.invalid_data,
                STATUS_CODES.forbidden,
                `A user with the email: ${email} already exists!`
            )
            return
        }
        next();
    } catch (err) {
        logError(
            res,
            STATUS_MESSAGES.server_error,
            STATUS_CODES.server_error,
            err
        )
    }
}

