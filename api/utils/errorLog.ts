export default function logError(res: any, message: string, code: number, err: any = null) {
    if (err !== null) {
        console.log(err, "\n")
    }
    res.status(code)
        .json({
            message: message
        })
}
