import express from "express"
import { userRouter } from "./routes/user.route";
const app = express();
const port = 8080;

app.use(userRouter)

app.listen(port, () => {
    console.log("Listening on port: ", port);
})

