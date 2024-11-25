import { Kafka, logLevel, Consumer } from "kafkajs";

class KafkaConfig {
  private kafka: Kafka;
  private consumer: Consumer;
  private brokers: string;

  constructor() {
    this.brokers = process.env.KAFKA_BROKERS || "192.168.39.24:9092";
    this.kafka = new Kafka({
      clientId: "producer",
      brokers: [this.brokers],
      logLevel: logLevel.ERROR,
    });
    this.consumer = this.kafka.consumer({
      groupId: "post",
    });
  }

  async connect(): Promise<void> {
    try {
      await this.consumer.connect();
      console.log("Kafka connected");
    } catch (error: any) {
      console.log("Kafka connection error: " + error.message);
    }
  }

  async subscribeTopic(topic: string): Promise<void> {
    try {
      await this.consumer.subscribe({
        topic,
        fromBeginning: true,
      });
      console.log("subscribed to topic " + topic);
    } catch (error: any) {
      console.log("error in subscribeTopic: " + error.message);
    }
  }

  async consume(callback: (message: any) => void): Promise<void> {
    try {
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          callback(JSON.parse(message?.value?.toString()!));
        },
      });
    } catch (error: any) {
      console.log("error on consumer", error.message);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.consumer.disconnect();
      console.log("Kafka disconnect");
    } catch (error: any) {
      console.log("error in disconnect", error.message);
    }
  }
}

export default new KafkaConfig();
