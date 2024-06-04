import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Client,
  ClientKafka,
  Payload,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'anti-fraud-group',
      },
    },
  })
  client: ClientKafka;

  @MessagePattern('transaction-created')
  processTransaction(@Payload() message: any) {
    const isFraudulent = message.dataKafka;
    console.log('isFraudulent: ', isFraudulent);
    const response = isFraudulent.value < 1000 ? 'Approved' : 'Rejected';
    this.client.emit('transaction-response', {
      id: isFraudulent.id,
      status: response,
    });
  }
}
