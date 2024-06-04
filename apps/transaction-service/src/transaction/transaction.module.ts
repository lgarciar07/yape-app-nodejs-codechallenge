import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionService } from './services/transaction.service';
import { TransactionResolver } from './resolvers/transaction.resolver';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    KafkaModule,
  ],
  providers: [TransactionService, TransactionRepository, TransactionResolver],
  exports: [TransactionService, TransactionRepository, MongooseModule],
})
export class TransactionModule {}
