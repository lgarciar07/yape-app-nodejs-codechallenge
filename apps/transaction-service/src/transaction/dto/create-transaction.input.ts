import { Field, InputType } from '@nestjs/graphql';


@InputType()
class TransactionTypeInput {
  @Field()
  name: string;
}

@InputType()
class TransactionStatusInput {
  @Field(type => String, { nullable: true })
  name?: string;
}

@InputType()
export class CreateTransactionInput {
  @Field()
  accountExternalIdDebit: string;

  @Field()
  accountExternalIdCredit: string;

  @Field()
  transferTypeId: number;

  @Field()
  value: number;

  @Field(() => TransactionTypeInput)
  transactionType: TransactionTypeInput;

  @Field(type => TransactionStatusInput, { nullable: true })
  transactionStatus?: TransactionStatusInput;

}
