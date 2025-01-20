import express from "express"
import { User } from "../schemas/user.schema";
import { STATUS_CODES, STATUS_MESSAGES } from "../globals";

// TODO: Do some error logging to keep track of all errors that can occur and figure out
// how to keep proper track of errors in a parsable manner as well
const userRouter = express.Router();

userRouter.get("/:userId", async (_, res) => {
    try {
        const users = await User.find({});
        res.status(STATUS_CODES.success).json({
            users,
            message: STATUS_MESSAGES.success
        })
    }
    catch (err) {
        res.status(STATUS_CODES.server_error).json({ message: STATUS_MESSAGES.server_error })
    }
});

userRouter.get("/:id/:userId", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.find({ id });
        res.status(200).json({
            user,
            message: "ok"
        })
    } catch (err) {
        res.status(STATUS_CODES.server_error).json({ message: STATUS_MESSAGES.server_error })
    }
});

export { userRouter };
