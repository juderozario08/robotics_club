import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import { Session } from "../schemas/session.schema";
import logError from "../utils/errorLog";
import type { NextFunction, Request, Response } from "express";

export default async function authenticateSession(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(STATUS_CODES.not_found)
                .json({
                    message: STATUS_MESSAGES.not_found
                })
            return
        }
        const sessionExists = await Session.findOne({ userId });
        if (!sessionExists) {
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

