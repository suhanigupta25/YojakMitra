import express from "express";
import cors from "cors";
import router from "./routes/scheme.route"

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("YojnaMitra Backend Running");
});

app.use(router); 

export default app;