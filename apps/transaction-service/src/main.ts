import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'transaction',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'transaction-response-group',
      },
    },
  });
  await microservice.listen();
  await app.listen(3000);
}
bootstrap().then(() => console.log('Microservice is listening 3000'));
