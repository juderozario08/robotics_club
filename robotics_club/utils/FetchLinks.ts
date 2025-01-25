const port = '8080';
const host = `http://localhost:${port}`
const users = `${host}/users`

export const postLoginUrl = `${users}/login`
export const postLogoutUrl = `${users}/logout`
export const postSignupUrl = `${users}/signup`

const authedUsersUrl = `${host}/authed/users`

export const getAllUsersUrl = (userId: String) => {
    return `${authedUsersUrl}/${userId}`
}

export const getUserUrl = (id: String, userId: String) => {
    return `${authedUsersUrl}/${id}/${userId}`
}
