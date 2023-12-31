import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeesService } from './coffees/coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './coffees/entities/coffee.entity';
import { Flavor } from './coffees/entities/flavor.entity';
import { DateScalar } from './common/scalars/date.scalar';
import { Tea } from './teas/entities/tea.entity';
import { DrinksResolver } from './drinks/drinks.resolver';
import { TeasModule } from './teas/teas.module';
import { TeasService } from './teas/teas.service';
import { TeaFlavor } from './teas/entities/flavor.entity';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: ['query'],
    }),
    TypeOrmModule.forFeature([Coffee, Flavor, Tea, TeaFlavor]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        // dateScalarMode: 'timestamp',
        orphanedTypes: [Tea],
      },
      installSubscriptionHandlers: true,
    }),
    CoffeesModule,
    TeasModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeesService, DateScalar, DrinksResolver, TeasService],
})
export class AppModule {}
