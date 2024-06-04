import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('transaction-created');
    this.clientKafka.subscribeToResponseOf('transaction-updated');
    this.clientKafka.subscribeToResponseOf('transaction-deleted');
    this.clientKafka.subscribeToResponseOf('transaction-response');
    this.clientKafka.subscribeToResponseOf('transaction-status-created');
    this.clientKafka.subscribeToResponseOf('transaction-status-updated');
    await this.clientKafka.connect();
  }

  async emit(topic: string, message: any) {
    return this.clientKafka.emit(topic, message);
  }
}
