Setup zookeeper first,
Then Start you kafka with this configuration

KAFKA_ZOOKEEPER_CONNECT: "192.168.39.24:2181"
KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://192.168.39.24:9092"
KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: "1"

change all the values in the configuration as per your local configuration

then you are ready to connect
