import kafkaConfig from "../config/kafka.config";
import postModel from "../model/db.schema";

export async function postConsumer(){
    const messages:any[] = [];
    let processing = false;

    try {
        await kafkaConfig.subscribeTopic("post")
        await kafkaConfig.consume(async(message)=>{
            messages.push(message);
            console.log("message pushed",message)

            if(messages.length > 10){
                // bulk insertion of messages into db
                processMessage();
            }
        })
        setInterval(processMessage,5000);
    } catch (error:any) {
        console.log("error on postConsumer",error.message);
    }

    async function processMessage(){
        if(messages.length > 0 && !processing){
            processing = true;
            const batchToProcess = [...messages]
            messages.length = 0
            try {
                await postModel.insertMany(batchToProcess,{ordered: false})
                console.log("bulk inserted")
            } catch (error:any) {
                console.log("error on insertMany",error.message)
                messages.push(...batchToProcess);
            }finally{
                processing = false;
            }
        }
      }
}



