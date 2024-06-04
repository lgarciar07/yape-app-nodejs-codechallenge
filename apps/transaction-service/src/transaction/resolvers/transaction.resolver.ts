import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionInput } from '../dto/create-transaction.input';
import { KafkaService } from '../../kafka/kafka.service';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly kafkaService: KafkaService,
  ) {}

  @Mutation(() => Transaction)
  async createTransaction(
    @Args('input') input: CreateTransactionInput,
  ): Promise<Transaction> {
    const resultTransfer = await this.transactionService.create(input);
    const id = resultTransfer.id;
    const dataKafka = { id, ...input };
    await this.kafkaService.emit('transaction-created', { dataKafka });
    return resultTransfer;
  }

  @Query(() => Transaction)
  async getTransaction(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Transaction> {
    return this.transactionService.findById(id);
  }

  @Query(() => [Transaction])
  async getTransactions(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }
  @Mutation(() => Transaction)
  async updateTransactionStatus(
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => String }) status: string,
  ): Promise<Transaction> {
    return this.transactionService.updateStatus(id, status);
  }
}
