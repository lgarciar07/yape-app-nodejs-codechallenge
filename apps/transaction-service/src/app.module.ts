import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TransactionModule } from './transaction/transaction.module';
import { AppController } from './transaction/app.controller';
import { TransactionRepository } from './transaction/repository/transaction.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/transaction'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [TransactionRepository],
})
export class AppModule {}
