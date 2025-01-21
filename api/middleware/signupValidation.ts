import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import logError from "../utils/errorLog";

export default function signupValidation(req: any, res: any, next: any) {
    try {
        const { username, password, email, role, features, firstname, lastname } = req.body;
        if (!validateUsername(username)
            || !validatePassword(password)
            || !validateEmail(email)
            || !validateRole(role)
            || !validateFeatures(features)
            || !validateName(firstname, lastname)
        ) {
            res.status(STATUS_CODES.not_acceptable)
                .json({ message: STATUS_MESSAGES.invalid_signup })
            return
        }
        next();
    } catch (err) {
        logError(res, err)
    }
}

function validateUsername(username: String): boolean {
    if (!username) {
        return false;
    }
    return true;
}
function validatePassword(password: String): boolean {
    if (!password) {
        return false;
    }
    return true;
}
function validateEmail(email: String): boolean {
    if (!email) {
        return false;
    }
    return true;
}
function validateRole(role: String): boolean {
    if (!role) {
        return false;
    }
    return true;
}
function validateFeatures(features: String): boolean {
    if (!features) {
        return false;
    }
    return true;
}
function validateName(firstname: String, lastname: String): boolean {
    if (!firstname || !lastname) {
        return false;
    }
    return true;
}
