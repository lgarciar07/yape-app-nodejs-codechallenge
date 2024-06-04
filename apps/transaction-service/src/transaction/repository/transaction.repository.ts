// transaction-service/src/transaction/repository/transaction.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionInput } from '../dto/create-transaction.input';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async create(input: CreateTransactionInput): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(input);
    return createdTransaction.save();
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionModel.findById(id).exec();
  }

  async updateStatus(id: string, status: string): Promise<Transaction | null> {
    return this.transactionModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async transactionStatus(id: string, transactionStatus: { "name": string }): Promise<Transaction | null> {
    return this.transactionModel
        .findByIdAndUpdate(id, { transactionStatus }, { new: true })
        .exec();
  }

  async handleTransactionResponse(message: any): Promise<void> {
    const status = message.status === 'Approved' ? 'Approved' : 'Rejected';
    const transactionStatus = {"name": status}
    await this.transactionStatus(message.id, transactionStatus);
    await this.updateStatus(message.id, status);
    console.log(`Status updated to ${status} for transaction ${message.id}`);
  }
}
