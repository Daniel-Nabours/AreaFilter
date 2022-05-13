import express from "express"
import dotenv from "dotenv" 
import { createBounds , deleteBounds, updateBounds} from "./queries"

dotenv.config();

const app = express();
const port = 8000; 

app.post("/bounds", createBounds)
app.delete("/bounds/:id", deleteBounds)
app.put("/bounds/:id", updateBounds)

app.listen(port, () => console.log("app listening on port 8000"))