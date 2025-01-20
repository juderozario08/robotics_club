import express from "express"
import { Session } from "../schemas/session.schema";
import { User } from "../schemas/user.schema";

// TODO: Do some error logging to keep track of all errors that can occur and figure out
// how to keep proper track of errors in a parsable manner as well
const userRouter = express.Router();

userRouter.get("/authed/users/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const sessionExists = await Session.findOne({ userId });
        /*
          TODO: Maybe role dependent as well so double check to make sure that the role is authorized.
          Maybe attempt something like a feature manager for this.
          Also figure out a solution for session checking using a middleware
        */
        if (!sessionExists) {
            res.status(401).json({ message: "Unauthorized" })
            return
        }
        if (sessionExists.role !== 'admin') {
            res.status(403).json({ message: "Forbidden" })
            return
        }
        const users = await User.find({});
        res.status(200).json({
            users,
            message: "ok"
        })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
});

userRouter.get("/authed/users/:id/:userId", async (req, res) => {
    try {

        const { id, userId } = req.params;
        // Use session middleware
        const user = await User.find({ id });
        res.status(200).json({
            user,
            message: "ok"
        })
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
});

export { userRouter };
