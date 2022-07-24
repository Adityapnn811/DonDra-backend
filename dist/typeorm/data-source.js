"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Moneytoring_1 = require("./entity/Moneytoring");
const Transfer_1 = require("./entity/Transfer");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "postgres://sfleyywetapbsy:dab4b94e704b18492fb52c6142340036bb27fec0cd540f25fb3626205b8e512a@ec2-52-205-61-230.compute-1.amazonaws.com:5432/d9j40g56isn3q4",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Moneytoring_1.Moneytoring, Transfer_1.Transfer],
    migrations: [],
    subscribers: [],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    }
});
//# sourceMappingURL=data-source.js.map