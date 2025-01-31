import express from "express"
import { Session } from "../schemas/session.schema";
import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import tester from "../middleware/tester";

const router = express.Router();

router.get('/', tester, async (_, res) => {
    const sessions = await Session.find();
    res.status(STATUS_CODES.success)
        .json({
            message: STATUS_MESSAGES.success,
            sessions
        })
})

export { router };
