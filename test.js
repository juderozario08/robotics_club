
/**
 * @param {string} password
 * @return boolean
 * */
function validatePassword(password) {
    let seenUppercase = false;
    let seenLowercase = false;
    let seenNumbers = false;
    let seenSymbols = false;
    if (password.length < 8) {
        return false;
    }
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

console.log(
    validatePassword("Sara14347272!$"),
    validatePassword("aowbr bu"),
    validatePassword("Crjj142117!4"),
    validatePassword("!4_(@)"),
)
