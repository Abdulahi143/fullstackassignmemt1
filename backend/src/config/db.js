import mongoose from "mongoose";
import chalk from "chalk";

import { dbURl } from "./config.js";

const connectDb = async () => {
    try {
        await mongoose.connect(dbURl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) 

        console.log(`${chalk.green.bold('Database')} connected successfully`);
    } catch (err) {
        console.log(`${chalk.red.bold('Error')} connecting to the database`, err);  
        process.exit(1)      
    }
};

export default connectDb;