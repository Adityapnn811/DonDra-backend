const app = require("./index")
const supertest = require("supertest")
const request = supertest(app)

describe("/test endpoint", () => {
    it("should return a response", async () => {
        const response = await request.get("/test")
        expect(response.status).toBe(200)
        expect(response.text).toBe("Endpoint success");
    })
})

describe("/testDB endpooint", () => {
    it("should return a response", async () => {
        const response = await request.get("/testDB")
        expect(response.status).toBe(200)
        expect(response.text).toBe("Database is running and connected");
    })
})