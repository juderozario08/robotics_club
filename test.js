import { Roles } from "./shared/model.ts";

let user;
let users;
let userId;
let deviceId;

const link = "http://localhost:8080";

async function testSignup(data) {
    try {
        const response = await fetch(`${link}/users/signup`, data);
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

async function testLogin() {
    const response = await fetch(`${link}/users/login`);
    if (response.ok) {
        const data = await response.json();
        console.log(data, "\n");
    }
}

async function testLogout() {
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
            data: { method: "POST", username: "rozarij", firstname: "Jude", lastname: "Rozario", email: "test@mail.com", password: "Caosfib12512!$", role: Roles.admin }
        },
        {
            expected: true,
            data: { method: "POST", username: "jarozari", firstname: "Jude", lastname: "Rozario", email: "test2@mail.com", password: "Caosfib12512!$", role: Roles.admin }
        },
        {
            expected: false,
            data: { method: "POST", username: "jarozari", firstname: "Jude", lastname: "Rozario", email: "test3@mail.com", password: "Caosfib12512!$", role: Roles.admin }
        },
        {
            expected: false,
            data: { method: "POST", username: "alkgaslkjf", firstname: "Jude", lastname: "Rozario", email: "test2@mail.com", password: "Caosfib12512!$", role: Roles.admin }
        },
        {
            expected: false,
            data: { method: "POST", username: "abcde", firstname: "Jude", lastname: "Rozario", email: "test5@mail.com", password: "Caosfib12512!$", role: Roles.admin }
        },
        {
            expected: false,
            data: { method: "POST", username: "alkgaslkjf", firstname: "J", lastname: "Rozario", email: "test6@mail.com", password: "Caosfib12512!$", role: Roles.admin }
        },
        {
            expected: false,
            data: { method: "POST", username: "alkgaslkjf", firstname: "Jude", lastname: "R", email: "test7@mail.com", password: "Caosfib12512!$", role: Roles.admin }
        },
        {
            expected: false,
            data: { method: "POST", username: "alkgaslkjf", firstname: "Jude", lastname: "R", email: "test@.com", password: "Caosfib12512!$", role: Roles.admin }
        },
        {
            expected: false,
            data: { method: "POST", username: "alkgaslkjf", firstname: "Jude", lastname: "Rasogk", email: "test9@mail.com", password: "aojb12", role: Roles.admin }
        },
        {
            expected: false,
            data: { method: "POST", username: "alkgaslkjf", firstname: "Jude", lastname: "Raosgh", email: "test10@mail.com", password: "AOjb12asokgb213!$", role: Roles.LENGTH }
        },
    ]
    for (let i = 0; i < tests.length; i++) {
        const result = await testSignup(tests[i].data)
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
