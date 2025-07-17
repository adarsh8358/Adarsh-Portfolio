import { config } from 'dotenv';
config();

const _config = {
    PORT: process.env.PORT || "",
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
}

export default Object.freeze(_config);