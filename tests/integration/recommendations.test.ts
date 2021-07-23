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

    it(`should answer with status 200 and 
        text 'deleted' when a song get vote quantity less than -5,
        then this song get deleted.`, async () => {

        const body = validRecommendation();

        const newRecommendation = await supertest(app).post("/recommendations").send(body);

        const newSongId = newRecommendation.body.id;

        for( let i = 0; i < 5; i++){
            await supertest(app).post(`/recommendations/${newSongId}/downvote`); 
        }

        const response = await supertest(app).post(`/recommendations/${newSongId}/downvote`);
        expect(response.status).toBe(200);
        expect(response.text).toBe("deleted");
    });    
});

describe("GET /recommendations/random", () => {

    it("should answer with status 404 if no song was found on database.", async () => {

        const response = await supertest(app).get("/recommendations/random");
        expect(response.status).toBe(404);
    });

    it("should answer with status 200 if at least one song was found on database.", async () => {

        const body = validRecommendation();

        const lowScoreRecommendation = await supertest(app).post("/recommendations").send(body);

        let highScoreRecommendation = await supertest(app).post("/recommendations").send(body);

        const highScoreSongId = highScoreRecommendation.body.id;

        for (let i = 0; i < 11; i++ ){
            await supertest(app).post(`/recommendations/${highScoreSongId}/upvote`);
        }

        const response = await supertest(app).get("/recommendations/random");

        expect(response.status).toBe(200);
    });
});

describe("GET /recommendations/top/:amount", () => {

    it("should answer with status 400 for a invalid params.", async () => {

        const response = await supertest(app).get("/recommendations/top/a");
        expect(response.status).toBe(400);
    });

    it(`should answer with status 200 and
        an empty array if no song was found on database.`, async () => {

        const response = await supertest(app).get("/recommendations/top/10");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([]));
    });

    it(`should answer with status 200,
        an array with a chosen length
        and with songs order by descending score.`, async () => {

        const body = validRecommendation();

        // create five recomendations

        for( let i = 0; i < 5; i++){
            await supertest(app).post("/recommendations").send(body); 
        }

        // upvotes five times to recommendation with id = 5

        let songId = 5;

        for (let i = 0; i < 5; i++ ){
            await supertest(app).post(`/recommendations/${songId}/upvote`);
        }

        // upvotes three times to recommendation with id = 3

        songId = 3;

        for (let i = 0; i < 3; i++ ){
            await supertest(app).post(`/recommendations/${songId}/upvote`);
        }

        const response = await supertest(app).get("/recommendations/top/3");

        expect(response.status).toBe(200);

        expect(response.body).toEqual(expect.arrayContaining([
            {
                id: 5,
                name: "Smells like teen spirit",
                url: "http://www.youtube.com/video/123123",
                score: 5
            },
            {
                id: 3,
                name: "Smells like teen spirit",
                url: "http://www.youtube.com/video/123123",
                score: 3
            },
            {
                id: 1,
                name: "Smells like teen spirit",
                url: "http://www.youtube.com/video/123123",
                score: 0
            },
        ]));
    });
});

afterAll(async () => {
    await endConnection();
});