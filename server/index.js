import express from 'express'
import cors from "cors";
import mygames from "./mygame.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use("/mygame", mygames)

app.listen(8080, () => {
    console.log("8080")
});