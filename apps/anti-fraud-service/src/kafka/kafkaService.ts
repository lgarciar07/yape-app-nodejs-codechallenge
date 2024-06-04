import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('transaction-created');
    this.clientKafka.subscribeToResponseOf('transaction-status-updated');
    this.clientKafka.subscribeToResponseOf('transaction-rejected');
    await this.clientKafka.connect();
  }

  async emit(topic: string, message: any) {
    const result = this.clientKafka.emit(topic, message);
  }
}
