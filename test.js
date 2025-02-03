let user;
let users;
let userId;

const link = "http://localhost:8080";

async function testSignup(data) {
    try {
        const response = await fetch(`${link}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data, "\n");
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

async function testLogin(data) {
    try {
        const response = await fetch(`${link}/users/login`, data);
        if (response.ok) {
            const data = await response.json();
            console.log(data, "\n");
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

async function testLogout() {
    try {
        const response = await fetch(`${link}/users/logout`, data);
        if (response.ok) {
            const data = await response.json();
            console.log(data, "\n");
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

async function testGetAll() {
}

async function testGet() {
}

async function testPut() {
}

async function testDel() {
}

async function getAllSession() {
}

async function signupTesting() {
    const failMessage = (i, got, expected) => {
        const message = `USER${i + 1} SIGNUP TEST: FAILED! Expected ${expected} got ${got}`
        console.log(message)
        throw new Error(message)
    }
    const successMessage = (i) => {
        console.log(`USER${i + 1} SIGNUP TEST: FAILED!`);
    }
    const tests = [
        {
            expected: true,
            body: { username: "rozarij", firstname: "Jude", lastname: "Rozario", email: "test@mail.com", password: "Caosfib12512!$", role: 0, features: "0" }
        },
        {
            expected: true,
            body: { username: "jarozari", firstname: "Jude", lastname: "Rozario", email: "test2@mail.com", password: "Caosfib12512!$", role: 0, features: "0" }
        },
        {
            expected: false,
            body: { username: "jarozari", firstname: "Jude", lastname: "Rozario", email: "test3@mail.com", password: "Caosfib12512!$", role: 0, features: "0" }
        },
        {
            expected: false,
            body: { username: "alkgaslkjf", firstname: "Jude", lastname: "Rozario", email: "test2@mail.com", password: "Caosfib12512!$", role: 0, features: "0" }
        },
        {
            expected: false,
            body: { username: "abcde", firstname: "Jude", lastname: "Rozario", email: "test5@mail.com", password: "Caosfib12512!$", role: 0, features: "0" }
        },
        {
            expected: false,
            body: { username: "alkgaslkjf", firstname: "J", lastname: "Rozario", email: "test6@mail.com", password: "Caosfib12512!$", role: 0, features: "0" }
        },
        {
            expected: false,
            body: { username: "alkgaslkjf", firstname: "Jude", lastname: "R", email: "test7@mail.com", password: "Caosfib12512!$", role: 0, features: "0" }
        },
        {
            expected: false,
            body: { username: "alkgaslkjf", firstname: "Jude", lastname: "R", email: "test@.com", password: "Caosfib12512!$", role: 0, features: "0" }
        },
        {
            expected: false,
            body: { username: "alkgaslkjf", firstname: "Jude", lastname: "Rasogk", email: "test9@mail.com", password: "aojb12", role: 0, features: "0" }
        },
        {
            expected: false,
            body: { username: "alkgaslkjf", firstname: "Jude", lastname: "Raosgh", email: "test10@mail.com", password: "AOjb12asokgb213!$", role: 8, features: "0" }
        },
    ]
    for (let i = 0; i < tests.length; i++) {
        const result = await testSignup(tests[i].body)
        if (tests[i].expected !== result) {
            failMessage(i, result, tests[i].expected);
        } else {
            successMessage(i)
        }
    }
}

async function main() {
    try {
        await signupTesting();
    } catch (err) {
        console.log("Test failed: ", err)
    }
    await testLogin()
}

main()
