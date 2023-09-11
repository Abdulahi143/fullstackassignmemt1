import dotenv from 'dotenv';


dotenv.config();

export const port = process.env.PORT;
export const dbURl = process.env.DATABASE_URL;