"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFileData = exports.getFileData = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const getFileData = (resource) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playersString = yield promises_1.default.readFile(`./data/${resource}.json`, `utf-8`);
        const parsedData = JSON.parse(playersString);
        return parsedData;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getFileData = getFileData;
const saveFileData = (resource, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stringifyData = JSON.stringify(data);
        yield promises_1.default.writeFile(`${__dirname}/../../data/${resource}.json`, stringifyData, {
            encoding: `utf8`
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.saveFileData = saveFileData;
