import { STATUS_CODES, STATUS_MESSAGES } from "../status"

export default function logError(res: any, err: any) {
    console.log(err, "\n")
    res.status(STATUS_CODES.server_error)
        .json({
            message: STATUS_MESSAGES.server_error
        })
}
