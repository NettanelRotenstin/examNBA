import { json } from 'express'
import fs from 'fs/promises'
import Player from '../types/models/Player'

export const getFileData = async (resource: string): Promise<Player[] | void> => {
    try {
        const playersString: string = await fs.readFile(`${__dirname}/../../data/${resource}.json`, `utf-8`)
        const parsedData: Player[] = JSON.parse(playersString)
        return parsedData
    } catch (error) {
        console.log(error)
    }
}


export const saveFileData = async <T>(resource: string, data: T[]): Promise<boolean> => {
    try {
        const stringifyData: string = JSON.stringify(data)
        await fs.writeFile(`${__dirname}/../../data/${resource}.json`, stringifyData, {
            encoding: `utf8`
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}