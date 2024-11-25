import kafkaConfig from "./kafka.config";

export async function init(){
    try {
        await kafkaConfig.connect();
        await kafkaConfig.createTopic('post');
    } catch (error:any) {
        console.log("error in init",error.message);
        process.exit(1);
    }
}