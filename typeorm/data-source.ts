import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "postgres://sfleyywetapbsy:dab4b94e704b18492fb52c6142340036bb27fec0cd540f25fb3626205b8e512a@ec2-52-205-61-230.compute-1.amazonaws.com:5432/d9j40g56isn3q4",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    }
})