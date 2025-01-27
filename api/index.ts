import express from "express";
import { router as userRouter } from "./routes/user.route";
import mongoose from "mongoose";
import 'dotenv/config'
import { router as userAuthentication } from "./routes/userAuthentication.route";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/authed/users", userRouter);
app.use("/users", userAuthentication);

app.listen(port, () => {
    if (process.env.DB_DEV_URI) {
        mongoose.connect(process.env.DB_DEV_URI)
            .then(() => {
                console.log("Connected to database");
                console.log("Listening on port: ", port);
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        console.log("Database URI is undefined!")
    }
});
