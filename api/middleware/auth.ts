import { STATUS_CODES, STATUS_MESSAGES } from "../globals";
import { Session } from "../schemas/session.schema";

export default async function authenticateSession(req: any, res: any, next: any) {
    try {
        const index = req.originalUrl.lastIndexOf("/");
        const userId = req.originalUrl.slice(index + 1);
        console.log(userId);
        if (!userId) {
            return res.status(STATUS_CODES.unauthorized).json({ message: STATUS_MESSAGES.unauthorized })
        }
        const sessionExists = await Session.findOne({ userId });
        if (!sessionExists) {
            return res.status(STATUS_CODES.unauthorized).json({ message: STATUS_MESSAGES.unauthorized })
        }
        // TODO: FIGURE OUT THE ROLES LATER. THIS IS JUST FOR CURRENT TESTING
        if (sessionExists.role !== 'admin') {
            return res.status(STATUS_CODES.forbidden).json({ message: STATUS_MESSAGES.forbidden })
        }
        next();
    } catch (err) {
        return res.status(STATUS_CODES.server_error).json({ message: STATUS_MESSAGES.server_error })
    }
}
