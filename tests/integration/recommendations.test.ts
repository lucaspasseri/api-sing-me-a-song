import supertest from "supertest";
import app from "../../src/app";
import "../../src/setup";
import { clearDatabase, endConnection} from "../utils/database";

beforeEach(async () => {
    await clearDatabase();
});

function validRecommendation(){
    return {
        name: "Smells like teen spirit",
        youtubeLink: "http://www.youtube.com/video/123123"
    }
}

describe("POST /recommendations", () => {
    function invalidRecommendation(){
        return {
            name: "Sm",
            youtubeLink: "www.youtube.com/video/123123"
        }
    }

    it("should answer with status 400 for a invalid recommendation.", async () => {

        const body = invalidRecommendation();

        const response = await supertest(app).post("/recommendations").send(body);
        expect(response.status).toBe(400);
    });

    it("should answer with status 200 for a valid recommendation.", async () => {

        const body = validRecommendation();

        const response = await supertest(app).post("/recommendations").send(body);

        expect(response.status).toBe(200);
    });
});

describe("POST /recommendations/:id/upvote", () => {

    it("should answer with status 400 for a invalid params.", async () => {

        const response = await supertest(app).post("/recommendations/a/upvote");
        expect(response.status).toBe(400);
    });

    it("should answer with status 400 for a invalid song id.", async () => {

        const songId = 10;

        const response = await supertest(app).post(`/recommendations/${songId}/upvote`);

        expect(response.status).toBe(400);
    });

    it("should answer with status 200 for a valid song id.", async () => {

        const body = validRecommendation();

        const newRecommendation = await supertest(app).post("/recommendations").send(body);

        const newSongId = newRecommendation.body.id;

        const response = await supertest(app).post(`/recommendations/${newSongId}/upvote`);

        expect(response.status).toBe(200);
    });
});

describe("POST /recommendations/:id/downvote", () => {

    it("should answer with status 400 for a invalid params.", async () => {

        const response = await supertest(app).post("/recommendations/a/downvote");
        expect(response.status).toBe(400);
    });

    it("should answer with status 400 for a invalid song id.", async () => {

        const songId = 10;

        const response = await supertest(app).post(`/recommendations/${songId}/downvote`);

        expect(response.status).toBe(400);
    });

    it("should answer with status 200 for a valid song id.", async () => {

        const body = validRecommendation();

        const newRecommendation = await supertest(app).post("/recommendations").send(body);

        const newSongId = newRecommendation.body.id;

        const response = await supertest(app).post(`/recommendations/${newSongId}/downvote`);

        expect(response.status).toBe(200);
    });

    it("should answer with status 200 when a song get vote quantity less than -5, then this song and its votes get deleted.", async () => {

        const body = validRecommendation();

        const newRecommendation = await supertest(app).post("/recommendations").send(body);

        const newSongId = newRecommendation.body.id;

        for( let i = 0; i < 5; i++){
            await supertest(app).post(`/recommendations/${newSongId}/downvote`); 
        }

        const response = await supertest(app).post(`/recommendations/${newSongId}/downvote`);

        expect(response.text).toBe("deleted");
    });
});

afterAll(async () => {
    await endConnection();
});