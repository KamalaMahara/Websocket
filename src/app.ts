import express from 'express'
import type { Request, Response } from 'express'
import path from 'path'
import("../src/todo/todoController.js")
const app = express()
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.get("/", (req: Request, res: Response) => {
  res.render("home.ejs")

})
export default app