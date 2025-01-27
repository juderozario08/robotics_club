import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import logError from "../utils/errorLog";
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
            console.log("Signup Failed: Invalid signup data", req.body, "\n")
            res.status(STATUS_CODES.not_acceptable)
                .json({ message: STATUS_MESSAGES.invalid_signup })
            return
        }
        next();
    } catch (err) {
        logError(res, err)
    }
}

