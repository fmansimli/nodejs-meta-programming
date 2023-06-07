import { Kafka, Consumer } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['localhost:9092']
});



function KafkaGroup(group: string): ClassDecorator {
  return function (target: any) {
    target.prototype.kafkaGroup = group;
  };
}

function KafkaTopic(topic: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // @ts-ignore
      const group = this.kafkaGroup; // Access the consumer group from the class instance

      const consumer = kafka.consumer({ groupId: group });

      await consumer.connect();
      await consumer.subscribe({ topic });

      await consumer.run({
        eachMessage: async ({ message }) => {
          await originalMethod.call(this, message);
        },
      });
    };

    return descriptor;
  };
}
