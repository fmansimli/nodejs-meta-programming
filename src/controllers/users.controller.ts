import express, { Request, Response } from "express";
import { Controller, Get, Post } from "../decorators/route.decorators";

@Controller("/users")
export class UserController {
  constructor(private app: express.Application) {}

  @Get("/")
  getUsers(req: Request, res: Response) {
    res.send("Get all users");
  }

  @Post("/")
  createUser(req: Request, res: Response) {
    res.send("Create a user");
  }
}
