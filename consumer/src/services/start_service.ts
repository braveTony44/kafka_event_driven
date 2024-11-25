import { Kafka } from "kafkajs";
import connect from "../config/db.config";
import kafkaConfig from "../config/kafka.config";
import { postConsumer } from "./consume.post";

export async function init(){
    try {
        await connect();
        await kafkaConfig.connect();
        await postConsumer()
    } catch (error:any) {
        console.log("error initializing",error.message)
        process.exit(1);
    }
}