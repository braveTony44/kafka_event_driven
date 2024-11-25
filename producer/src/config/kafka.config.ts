import { Kafka, Admin, logLevel, Producer } from "kafkajs";

class KafkaConfig {
  private kafka: Kafka;
  private producer: Producer;
  private admin: Admin;
  private brokers: string;

  constructor() {
    this.brokers = process.env.KAFKA_BROKERS || "192.168.39.24:9092";
    this.kafka = new Kafka({
      clientId: "producer",
      brokers: [this.brokers],
      logLevel: logLevel.ERROR,
    });
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
  }

  async connect(): Promise<void> {
    try {
      await this.producer.connect();
      await this.admin.connect();
      console.log("Kafka connected");
    } catch (error: any) {
      console.log("Kafka connection error: " + error.message);
    }
  }

  async createTopic(topic: string):Promise<void> {
    try {
        await this.admin.createTopics({
            topics:[{topic,numPartitions:1}]
        })
        console.log("Topic created",topic)
    } catch (error:any) {
        console.log("Error on creating topics",error.message)
        
    }
  }

  async sendTopic(topic:string,message:string):Promise<void> {
    try {
        await this.producer.send({
            topic,
            messages:[{value:message}]
        })
        console.log("Message sent to topic " + topic)
    } catch (error:any) {
        console.log("Error sending message " + error.message)
    }
  }

  async disconnect(): Promise<void>{
    try {
        await this.producer.disconnect();
        await this.admin.disconnect();
        console.log("Kafka disconnect")
    } catch (error:any) {
        console.log("error in disconnect",error.message)
    }
  }
}

export default new KafkaConfig();