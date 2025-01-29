import type { Response } from "express"

export function logError(res: Response, message: string, code: number, err: any = null) {
    if (err !== null) {
        console.log(err, "\n")
    }
    res.status(code)
        .json({ message: message })
}

export function logSuccess(res: Response, data: any, code: number, message: any = null) {
    console.log(message, "\n");
    res.status(code).json(data);
}
