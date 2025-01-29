import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import { Session } from "../schemas/session.schema";
import { logError } from "../utils/logging";
import type { NextFunction, Request, Response } from "express";

export default async function authenticateSession(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, deviceId } = req.params;
        if (!userId || !deviceId) {
            logError(
                res,
                STATUS_MESSAGES.not_found,
                STATUS_CODES.not_found,
                `Authentication Failed: userId or deviceId not provided! ${{ userId, deviceId }}`
            );
            return
        }
        const sessionExists = await Session.findOne({ userId, deviceId });
        if (!sessionExists) {
            logError(
                res,
                STATUS_MESSAGES.not_authenticated,
                STATUS_CODES.unauthorized,
                `Authentication Failed: User not logged in. ${{ userId, deviceId }}`
            );
            return
        }
        next();
    } catch (err) {
        logError(
            res,
            STATUS_MESSAGES.server_error,
            STATUS_CODES.server_error,
            err
        );
    }
}
