import express from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"
import { createBounds, deleteBounds, updateBounds } from "./queries"
import cors from "cors"

config()

//@ts-ignore
const app = express()
app.use(bodyParser.json())
app.use(cors({
  origin:"http://localhost:3000"
}))
const port = 8000
 
app.post("/bounds", createBounds)
app.delete("/bounds/:id", deleteBounds)
app.put("/bounds/:id", updateBounds)

app.listen(port, () => console.log("app listening on port 8000"))