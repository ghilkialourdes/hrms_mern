import http from 'http';
import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { dbConnect } from './config/connections.js';
import routes from './routes.js';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => { res.send("Server running") });
app.use("/api", routes);

const server = http.createServer(app);
console.log(`Server is running on port ${config?.PORT}`);
server.listen(config.PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    }
    console.log(`Server is running on port ${config.PORT}`);
    dbConnect(config.DB_URI);
});