import express from 'express'
import { init } from './config/services'
import kafkaConfig from './config/kafka.config';
const app = express();

app.use(express.json());
init();

app.get("/",(req:any,res:any)=>{
    res.send("hello")
})

app.post("/create",async(req:any,res:any) => {
  const {title,content} = req.body;
  try {
     await kafkaConfig.sendTopic('post',JSON.stringify({title,content}));
     return res.json({message:"post created successfully"})
  } catch (error:any) {
    return res.json({message: error.message})
  }
})

app.listen(4000,()=>{
    console.log("Producer listening on 4000")
})