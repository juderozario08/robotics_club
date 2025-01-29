import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import { logError } from "../utils/logging";
import type { NextFunction, Request, Response } from "express";
import { validateEmail, validateFeatures, validateName, validatePassword, validateRole, validateUsername } from "../../helpers/validationFunctions";

export default function signupValidation(req: Request, res: Response, next: NextFunction) {
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

