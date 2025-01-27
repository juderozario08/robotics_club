import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import { Session } from "../schemas/session.schema";
import logError from "../utils/errorLog";
import type { NextFunction, Request, Response } from "express";

export default async function authenticateSession(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, deviceId } = req.params;
        if (!userId || !deviceId) {
            console.log("Authentication Failed: userId or deviceId not provided!", { userId, deviceId }, "\n")
            res.status(STATUS_CODES.not_found)
                .json({
                    message: STATUS_MESSAGES.not_found
                })
            return
        }
        const sessionExists = await Session.findOne({ userId, deviceId });
        if (!sessionExists) {
            console.log("Authentication Failed: User not logged in", { userId, deviceId }, "\n")
            res.status(STATUS_CODES.unauthorized)
                .json({
                    message: STATUS_MESSAGES.not_authenticated
                })
            return
        }
        next();
    } catch (err) {
        logError(res, err)
    }
}
