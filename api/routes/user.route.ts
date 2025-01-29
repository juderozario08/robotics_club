import express from "express"
import { User } from "../schemas/user.schema";
import { STATUS_CODES, STATUS_MESSAGES } from "../status";
import authenticateSession from "../middleware/auth";
import { logError, logSuccess } from "../utils/logging";

const router = express.Router();

/* GET ALL USERS ROUTER */
router.get("/:userId/:deviceId", authenticateSession, async (_, res) => {
    try {
        const users = await User.find({});
        logSuccess(
            res,
            { users, message: STATUS_MESSAGES.success },
            STATUS_CODES.success,
            "Fetching all users succeeded!"
        );
    }
    catch (err) {
        logError(
            res,
            STATUS_MESSAGES.server_error,
            STATUS_CODES.server_error,
            err
        );
    }
});

/* GET SPECIFIC USER ROUTER */
router.get("/:id/:userId/:deviceId", authenticateSession, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            logError(
                res,
                STATUS_MESSAGES.not_found,
                STATUS_CODES.not_found,
                `Fetching User Failed: Id not provided. ${{ id }}`
            )
            return;
        }

        const user = await User.findById(id);
        if (!user) {
            logError(
                res,
                STATUS_MESSAGES.invalid_id,
                STATUS_CODES.not_found,
                `Fetching User Failed: Id not found. ${{ id }}`
            )
            return;
        }

        logSuccess(
            res,
            { user, message: STATUS_MESSAGES.success },
            STATUS_CODES.success,
            `Fetching user succeeded!, ${{ id }}`
        );
    } catch (err) {
        logError(
            res,
            STATUS_MESSAGES.server_error,
            STATUS_CODES.server_error,
            err
        )
    }
});

/* PUT ROUTER */
router.put("/:id/:userId/:deviceId", authenticateSession, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            logError(
                res,
                STATUS_MESSAGES.not_found,
                STATUS_CODES.not_found,
                `Updating User Failed: Id not provided. ${{ id }}`
            );
            return;
        }

        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            logError(
                res,
                STATUS_MESSAGES.invalid_id,
                STATUS_CODES.not_found,
                `Updating User Failed: Id not found.${{ id }}`
            );
            return;
        }

        logSuccess(
            res,
            { user, message: STATUS_MESSAGES.success },
            STATUS_CODES.success,
            `Updating User Succeeded!, ${{ id }}`
        );
    } catch (err) {
        logError(
            res,
            STATUS_MESSAGES.server_error,
            STATUS_CODES.server_error,
            err
        );
    }
})

/* DELETE ROUTER */
router.delete("/:id/:userId/:deviceId", authenticateSession, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            logError(
                res,
                STATUS_MESSAGES.not_found,
                STATUS_CODES.not_found,
                `Deleting User Failed: Id not provided.${{ id }}`
            );
            return;
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            logError(
                res,
                STATUS_MESSAGES.invalid_id,
                STATUS_CODES.not_found,
                `Deleting User Failed: Id not found.${{ id }}`
            );
            return;
        }
        logSuccess(
            res,
            { message: STATUS_MESSAGES.success, name: user.username },
            STATUS_CODES.success,
            `Deleting User Succeeded! ${{ id }}`
        )
    } catch (err) {
        logError(res, STATUS_MESSAGES.server_error, STATUS_CODES.server_error, err);
    }
})

export { router };
