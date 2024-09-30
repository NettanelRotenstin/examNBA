import { getFileData, saveFileData } from "../config/DAL";
import SearchPlayerDTO from "../types/DTO's/searchPlayerDTO";
import { EnumPosition } from "../types/Enums/EnumsPosition";
import Player from "../types/models/Player";
import Team from "../types/models/Team";


export default class playerService {
    public static async filterPlayers(searchParams: SearchPlayerDTO): Promise<Player[]> {

        const { position, threePercent, twoPercent, points } = searchParams
        if (!position || !threePercent || !twoPercent || !points) {
            throw new Error(`least one of poarams is missing!`)
        }
        if (!Object.values(EnumPosition).includes(position)) {
            throw new Error(`position is invalid!`)
        }

        const allPlayersData: Player[] | void = await getFileData(`players`)!

        if (allPlayersData) {
            const filterByPosition: Player[] = allPlayersData.filter(plr => plr.position === position)
            const filterByThree: Player[] = filterByPosition.filter(plr => plr.threePercent >= threePercent)
            const filterByTwe: Player[] = filterByThree.filter(plr => plr.twoPercent >= threePercent)
            const finalFilter: Player[] = filterByTwe.filter(plr => plr.points >= points)
            return finalFilter
        }
        return []
    }


    public static async writeTeam(team: Team): Promise<void> {
        let allTeams: Team[] | void = await getFileData(`teams`)
        if (!allTeams) {
            allTeams = []
        }
        let flag = true
        for (let i = 0; i < team.PlayersOfTeam.length; i++) {
            for (let j = 0; j < team.PlayersOfTeam.length; j++) {
                if (team.PlayersOfTeam[i].position === team.PlayersOfTeam[j].position) {
                    flag = false
                    break
                }
            }
        }
        if (!flag) {
            throw new Error(`position is not uniq!`)
        }
        allTeams.push(team)
        await saveFileData(`teams`, allTeams)
    }

    public static async getAllTeams(): Promise<Team[] | unknown> {
        let allTeams = await getFileData(`teams`)
        if (!allTeams) {
            allTeams = []
        }
        return allTeams
    }
}