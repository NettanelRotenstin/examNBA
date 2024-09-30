import SearchPlayerDTO from "../types/DTO's/searchPlayerDTO";
import Player from "../types/models/Player";
 

export default class playerService{
    public static async filterPlayers(searchParams: SearchPlayerDTO): Promise<Player[]>{
        
    }
}