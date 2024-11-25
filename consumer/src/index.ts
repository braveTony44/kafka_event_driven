import express from 'express'
import connect from './config/db.config';
import { init } from './services/start_service';
const app = express()

app.get("/",(req,res)=>{
    res.send("hello")
})
init();
app.listen(5000,()=>{
    console.log("Consumer listening on 5000")
})