import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Server as SocketIOServer, Socket } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

const server = http.createServer(app);

const io = new SocketIOServer(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

server.listen(process.env.SOCKET_PORT, () => {
    console.log(`socket server is listening on port ${process.env.SOCKET_PORT}`);
});

io.on('connection', (socket: Socket) => {
    console.log('New User Connected', socket.id);
    socket.on("created", () => {
        socket.emit("new_message");
        console.log("socket emitted");
    });
});