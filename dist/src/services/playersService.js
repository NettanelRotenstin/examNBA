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
Object.defineProperty(exports, "__esModule", { value: true });
const DAL_1 = require("../config/DAL");
const EnumsPosition_1 = require("../types/Enums/EnumsPosition");
class playerService {
    static filterPlayers(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { position, threePercent, twoPercent, points } = searchParams;
            if (!position || !threePercent || !twoPercent || !points) {
                throw new Error(`least one of poarams is missing!`);
            }
            if (!Object.values(EnumsPosition_1.EnumPosition).includes(position)) {
                throw new Error(`position is invalid!`);
            }
            const allPlayersData = yield (0, DAL_1.getFileData)(`players`);
            if (allPlayersData) {
                const filterByPosition = allPlayersData.filter(plr => plr.position === position);
                const filterByThree = filterByPosition.filter(plr => plr.threePercent >= threePercent);
                const filterByTwe = filterByThree.filter(plr => plr.twoPercent >= threePercent);
                const finalFilter = filterByTwe.filter(plr => plr.points >= points);
                return finalFilter;
            }
            return [];
        });
    }
    static writeTeam(team) {
        return __awaiter(this, void 0, void 0, function* () {
            let allTeams = yield (0, DAL_1.getFileData)(`teams`);
            if (!allTeams) {
                allTeams = [];
            }
            let flag = true;
            for (let i = 0; i < team.PlayersOfTeam.length; i++) {
                for (let j = 0; j < team.PlayersOfTeam.length; j++) {
                    if (team.PlayersOfTeam[i].position === team.PlayersOfTeam[j].position) {
                        flag = false;
                        break;
                    }
                }
            }
            if (!flag) {
                throw new Error(`position is not uniq!`);
            }
            allTeams.push(team);
            yield (0, DAL_1.saveFileData)(`teams`, allTeams);
        });
    }
    static getAllTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            let allTeams = yield (0, DAL_1.getFileData)(`teams`);
            if (!allTeams) {
                allTeams = [];
            }
            return allTeams;
        });
    }
}
exports.default = playerService;
