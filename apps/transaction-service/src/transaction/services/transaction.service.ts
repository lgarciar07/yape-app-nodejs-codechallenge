import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionInput } from '../dto/create-transaction.input';
import { KafkaService } from '../../kafka/kafka.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private kafkaService: KafkaService,
  ) {}

  async create(input: CreateTransactionInput): Promise<Transaction> {
    const transaction = new this.transactionModel(input);
    await transaction.save();
    return transaction;
  }

  async updateStatus(id: string, status: string): Promise<Transaction | null> {
    return this.transactionModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionModel.findById(id).exec();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }
}
