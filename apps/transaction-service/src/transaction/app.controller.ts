import { Controller } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { TransactionRepository } from './repository/transaction.repository';

@Controller()
export class AppController {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'transaction-response-listener',
      },
    },
  })
  client: ClientKafka;

  @EventPattern('transaction-response')
  async handleTransactionResponse(@Payload() message: any) {
    console.log('Response received:', message);
    await this.transactionRepository.handleTransactionResponse(message);
  }
}
