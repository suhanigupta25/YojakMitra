import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import schemeRouter from "./routes/scheme.route";
import aiRouter from "./routes/ai.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("YojnaMitra Backend Running");
});

app.use(schemeRouter);
app.use(aiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`YojnaMitra AI Backend running on port ${PORT}`));

export default app;