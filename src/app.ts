import express from "express";
import cors from "cors";
import * as testController from  "./controllers/testController";
import * as recomendationController from "./controllers/recomendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", testController.testing);

app.post("/recommendations", recomendationController.create);

app.put("/recommendations/:id/upvote", recomendationController.upvote);

export default app;
