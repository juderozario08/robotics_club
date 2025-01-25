import express from "express"
import { User } from "../schemas/user.schema";
import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import authenticateSession from "../middleware/auth";
import logError from "../utils/errorLog";

const userRouter = express.Router();
/* GET ALL USERS ROUTER */
userRouter.get("/:userId", authenticateSession, async (_, res) => {
    try {
        const users = await User.find({});
        res.status(STATUS_CODES.success).json({
            users,
            message: STATUS_MESSAGES.success
        })
    }
    catch (err) {
        logError(res, err)
    }
});

/* GET SPECIFIC USER ROUTER */
userRouter.get("/:id/:userId", authenticateSession, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(STATUS_CODES.not_found)
                .json({
                    message: STATUS_MESSAGES.not_found
                });
            return;
        }

        const user = await User.findById(id);
        if (!user) {
            res.status(STATUS_CODES.not_found)
                .json({
                    message: STATUS_MESSAGES.invalid_id
                });
            return;
        }

        res.status(STATUS_CODES.success).json({
            user,
            message: STATUS_MESSAGES.success
        })
    } catch (err) {
        logError(res, err)
    }
});

/* PUT ROUTER */
userRouter.put("/:id/:userId", authenticateSession, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(STATUS_CODES.not_found)
                .json({
                    message: STATUS_MESSAGES.not_found
                });
            return;
        }

        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            res.status(STATUS_CODES.not_found)
                .json({
                    message: STATUS_MESSAGES.invalid_id
                });
            return;
        }

        res.status(STATUS_CODES.success)
            .json({ message: STATUS_MESSAGES.success, user });
    } catch (err) {
        logError(res, err)
    }
})

/* DELETE ROUTER */
userRouter.delete("/:id/:userId", authenticateSession, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(STATUS_CODES.not_found)
                .json({ message: STATUS_MESSAGES.not_found });
            return;
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(STATUS_CODES.not_found)
                .json({ message: STATUS_MESSAGES.invalid_id });
            return;
        }

        res.status(STATUS_CODES.success)
            .json({
                message: STATUS_MESSAGES.success,
                name: user.username
            })
    } catch (err) {
        logError(res, err)
    }
})

export { userRouter };
