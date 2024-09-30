import { getFileData } from "../config/DAL";
import SearchPlayerDTO from "../types/DTO's/searchPlayerDTO";
import { EnumPosition } from "../types/Enums/EnumsPosition";
import Player from "../types/models/Player";


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
        console.log(allPlayersData)

        if (allPlayersData) {
            const filterByPosition: Player[] = allPlayersData.filter(plr => plr.position === position)
            const filterByThree:Player[]  = filterByPosition.filter(plr => plr.threePercent >= threePercent)
            const filterByTwe:Player[]  = filterByThree.filter(plr => plr.twoPercent >= threePercent)
            const finalFilter:Player[]  = filterByTwe.filter(plr => plr.points >= points)
            return finalFilter
        }
        return []
    }


    
}