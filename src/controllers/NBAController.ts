import express, { Router, Request, Response } from 'express'
import Player from '../types/models/Player'
import playerService from '../services/playersService'

const router: Router = express.Router()

router.post(`/filter`, async (req: Request, res: Response): Promise<void> => {
    try {
        const players = await playerService.filterPlayers(req.body)
        if (players) {
            res.json({
                players
            })
        }
    } catch {
        res.status(400).json({
            err: true,
            message: `requst faild`,
            data: null
        })
    }
})

router.post(`/AddTeam`, async (req: Request, res: Response): Promise<void> => {
    try {
        await playerService.writeTeam(req.body)
        {
            res.json({
                Message:`team`,
               players:req.body
            })
        }
    } catch {
        res.status(400).json({
            err: true,
            message: `requst faild`,
            data: null
        })
    }
})

router.get(`/GetAllTeam`, )

export default router