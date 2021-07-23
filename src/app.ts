import express from "express";
import cors from "cors";
import * as testController from  "./controllers/testController";
import * as recommendationController from "./controllers/recommendationController";
import * as genresController from "./controllers/genresController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", testController.testing);

app.post("/recommendations", recommendationController.create);

app.post("/recommendations+", recommendationController.createWithGenres);

app.post("/recommendations/:id/upvote", recommendationController.vote);

app.post("/recommendations/:id/downvote", recommendationController.vote);

app.get("/recommendations/random", recommendationController.getRandom);

app.get("/recommendations/top/:amount", recommendationController.getTop);

app.post("/genres", genresController.create);

app.get("/genres", genresController.getAll);

//app.get("/genres/:id", genresController.getSummary);

export default app;
