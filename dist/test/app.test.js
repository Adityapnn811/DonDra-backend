var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const app = require("./index");
const supertest = require("supertest");
const request = supertest(app);
jest.setTimeout(30000);
describe("/test endpoint", () => {
    it("should return a response", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request.get("/test");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Endpoint success");
    }));
});
describe("/testDB endpoint", () => {
    it("should return a response", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request.get("/testDB");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Database is running and connected");
    }));
});
//# sourceMappingURL=app.test.js.map