import { Roles } from "../model/model"

export function validateUsername(username: string): boolean { return username.length >= 6 }

export function validatePassword(password: string): boolean {
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

export function validateEmail(email: String): boolean {
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

export function validateRole(role: number): boolean { return role >= 0 && role < Roles.__LENGTH }

export function validateFeatures(features: string): boolean { return !!features.match(/^[0-1]+$/); }

export function validateName(firstname: string, lastname: string): boolean {
    return firstname.length > 1 && lastname.length > 1
}
