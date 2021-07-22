import supertest from "supertest";
import app from "../../src/app";
import "../../src/setup";
import { clearDatabase, endConnection} from "../utils/database";

beforeEach(async () => {
    await clearDatabase();
});

describe("POST /recommendations", () => {
    function invalidRecommendation(){
        return {
            name: "Sm",
            youtubeLink: "www.youtube.com/video/123123"
        }
    }
    function validRecommendation(){
        return {
            name: "Smells like teen spirit",
            youtubeLink: "http://www.youtube.com/video/123123"
        }
    }

    it("should answer with status 400 for a invalid recommendation", async () => {

        const body = invalidRecommendation();

        const response = await supertest(app).post("/recommendations").send(body);
        expect(response.status).toBe(400);
    });

    it("should answer with status 201 for a valid recommendation ", async () => {

        const body = validRecommendation();

        const response = await supertest(app).post("/recommendations").send(body);

        expect(response.status).toBe(201);
    });
});

afterAll(async () => {
    await endConnection();
});