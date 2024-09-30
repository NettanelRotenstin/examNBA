"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const NBAController_1 = __importDefault(require("./src/controllers/NBAController"));
const app = (0, express_1.default)();
const PORT = 1234;
app.use(express_1.default.json());
app.use('/api', NBAController_1.default);
app.listen(process.env.PORT, () => {
    console.log(`server started on port : ${process.env.PORT} visit http://localhost:${process.env.PORT} `);
});
