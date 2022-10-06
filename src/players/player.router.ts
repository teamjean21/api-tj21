import express, { Request, Response } from "express";
import { Player } from "./player.interface";
import * as PlayerService from "./player.service";

export const playerRouter = express.Router();

playerRouter.get("/:name", async (req: Request, res: Response) => {
    const name: string = req.params.name;
  
    try {
      const player: Player = await PlayerService.find(name);
  
      if (player) {
        return res.status(200).send(player);
      }
  
      res.status(404).send("item not found");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  });