import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {TransactionStatusEnum} from "../enums/transaction-status.enum";
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
class TransactionType {
    @Field()
    @Prop({ required: true })
    name: string;
}

@ObjectType()
export class TransactionStatus {
  @Field()
  @Prop({ default: TransactionStatusEnum.PENDING })
  name?: string;
}

@ObjectType()
@Schema()
export class Transaction extends Document {
  @Field(type => TransactionStatus)
  @Prop({ type: TransactionStatus, default: () => ({ name: TransactionStatusEnum.PENDING }) })
  transactionStatus: TransactionStatus;

  @Field(() => ID)
  id: string;

  @Field(() => ID)
  @Prop({ default: uuidv4 })
  transactionExternalId?: string;

  @Field()
  @Prop({ required: true })
  accountExternalIdDebit: string;

  @Field()
  @Prop()
  accountExternalIdCredit: string;

  @Field(() => Int)
  @Prop({ required: true })
  transferTypeId: number;

  @Field(() => Float)
  @Prop({ required: true })
  value: number;

  @Field()
  @Prop({ default: TransactionStatusEnum.PENDING })
  status: string;

  @Field()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Field()
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Field(type => TransactionType)
  @Prop({ type: TransactionType, required: true })
  transactionType: TransactionType;
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction)