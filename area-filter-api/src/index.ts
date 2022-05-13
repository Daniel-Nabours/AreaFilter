import express from "express"
import { config } from "dotenv"
import { createBounds, deleteBounds, updateBounds } from "./queries"

config()

//@ts-ignore
const app = express()
const port = 8000

app.post("/bounds", createBounds)
app.delete("/bounds/:id", deleteBounds)
app.put("/bounds/:id", updateBounds)

app.listen(port, () => console.log("app listening on port 8000"))