import express from "express";
import cors from "cors";
import * as testController from  "./controllers/testController";
import * as recomendationController from "./controllers/recomendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", testController.testing);

app.post("/recommendations", recomendationController.create);

app.post("/recommendations/:id/upvote", recomendationController.vote);

app.post("/recommendations/:id/downvote", recomendationController.vote);

export default app;
