import express from "express";
import cors from "cors";
import schemeRouter from "./routes/scheme.route";
import aiRouter from "./routes/ai.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("YojnaMitra Backend Running");
});

app.use(schemeRouter);
app.use(aiRouter);
app.use(authRoutes);

export default app;