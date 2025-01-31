import type { NextFunction, Request, Response } from "express";
import { logError } from "../utils/logging";
import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import { Session } from "../schemas/session.schema";
import { User } from "../schemas/user.schema";
import { Roles } from "../../shared/model";

export default async function tester(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        const session = await Session.findOne({ userId })
        if (!session) {
            logError(
                res,
                STATUS_MESSAGES.not_found,
                STATUS_CODES.not_found,
                `Session not found! ${{ userId }}`
            )
            return;
        }
        const user = await User.findOne({ _id: userId })
        if (user && user.role === Roles.tester) {
            logError(
                res,
                STATUS_MESSAGES.not_found,
                STATUS_CODES.not_found,
                `Session not found! ${{ userId }}`
            )
            return;
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
