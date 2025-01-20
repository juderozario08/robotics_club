import express from "express";
import { userRouter } from "./routes/user.route";
import mongoose from "mongoose";
import 'dotenv/config'
import authenticateSession from "./middleware/auth";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/authed", authenticateSession);
app.use("/authed/users", userRouter);

app.listen(port, async () => {
    try {
        let client = await mongoose.connect(String(process.env.DB_URI));
        if (!client) {
            throw new Error("Could not connect to database!");
        } else {
            console.log("Connected to database");
            console.log("Listening on port: ", port);
        }
    } catch (err) {
        console.log(err)
    }
});
