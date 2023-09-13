import express from "express";
import path from "path";
import { port } from "./src/config/config.js";
import connectDb from "./src/config/db.js";
import chalk from "chalk";
import engineersRouter from "./src/routes/engineers.js";
import cors from 'cors';
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

var whitelist = ['http://localhost:3000', 'http://localhost:5173', 'https://fullstackassignmemt1.onrender.com'];

const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(cors(corsOptionsDelegate));
app.use(express.json());

app.use('/', engineersRouter);

app.use((err, _req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).send(err.message || "Unknown Error");
});

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })

} else {
    app.get('/api', (req, res) => {
        res.send('API is running....')
    })
}

const PORT = port || 3000;

connectDb();



app.listen(PORT, () => {
    console.log(process.env.PORT);
    console.log(`${chalk.green.bold('Server')} listening on port ${chalk.green.bold(PORT)}`);
});
