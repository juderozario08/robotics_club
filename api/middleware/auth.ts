import { STATUS_CODES, STATUS_MESSAGES } from "../globals";
import { Session } from "../schemas/session.schema";
import logError from "../utils/errorLog";

export default async function authenticateSession(req: any, res: any, next: any) {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(STATUS_CODES.not_found)
                .json({
                    message: STATUS_MESSAGES.not_found
                })
        }
        const sessionExists = await Session.findOne({ userId });
        if (!sessionExists) {
            return res.status(STATUS_CODES.unauthorized)
                .json({
                    message: STATUS_MESSAGES.invalid_user_id
                })
        }
        // TODO: FIGURE OUT THE ROLES LATER. THIS IS JUST FOR CURRENT TESTING
        if (sessionExists.role !== 'admin') {
            return res.status(STATUS_CODES.forbidden)
                .json({
                    message: STATUS_MESSAGES.forbidden
                })
        }
        next();
    } catch (err) {
        logError(res, err)
    }
}
