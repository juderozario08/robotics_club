import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import { Roles } from "../../model/model"
import logError from "../utils/errorLog";
import type { NextFunction, Request, Response } from "express";

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
            res.status(STATUS_CODES.not_acceptable)
                .json({ message: STATUS_MESSAGES.invalid_signup })
            return
        }
        next();
    } catch (err) {
        logError(res, err)
    }
}

function validateUsername(username: string): boolean { return username.length >= 6 }

function validatePassword(password: string): boolean {
    let seenUppercase = false;
    let seenLowercase = false;
    let seenNumbers = false;
    let seenSymbols = false;
    for (let i = 0; i < password.length; i++) {
        if (password[i].match(/[A-Z]/)) {
            seenUppercase = true;
        } else if (password[i].match(/[a-z]/)) {
            seenLowercase = true;
        } else if (password[i].match(/[0-9]/)) {
            seenNumbers = true;
        } else if (password[i].match(/[?$!@.%&]/)) {
            seenSymbols = true;
        }
    }
    return seenUppercase && seenLowercase && seenNumbers && seenSymbols;
}

function validateEmail(email: String): boolean {
    let seenAt = false;
    let seenWordsAfterAt = false;
    let seenDotAfterAt = false;
    let seenLettersAfterDot = false;
    for (let i = 0; i < email.length; i++) {
        if (seenDotAfterAt && email[i] === '.') {
            return false;
        }
        if (!seenAt && email[i] === '@') {
            seenAt = true;
            continue
        }
        if (!seenWordsAfterAt && seenAt && !!email[i].match(/[A-Za-z]/)) {
            seenWordsAfterAt = true;
            continue
        }
        if (!seenDotAfterAt && seenWordsAfterAt && email[i] === '.') {
            seenDotAfterAt = true;
            continue
        }
        if (!seenLettersAfterDot && seenDotAfterAt && !!email[i - 1].match(/[A-Za-z]/)) {
            seenLettersAfterDot = true;
            continue;
        }
    }
    return seenAt && seenWordsAfterAt && seenDotAfterAt && seenLettersAfterDot;
}

function validateRole(role: number): boolean { return role >= 0 && role < Roles.__LENGTH }

function validateFeatures(features: string): boolean { return !!features.match(/^[0-1]+$/); }

function validateName(firstname: string, lastname: string): boolean { return firstname.length > 1 && lastname.length > 1 }
