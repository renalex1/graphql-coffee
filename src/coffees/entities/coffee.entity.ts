import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
import { Drink } from 'src/common/interfaces/drink.interface';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';
import { loggerMiddleware } from '../middleware/logger.middleware';

@Entity()
@ObjectType({ description: 'Coffee Model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ middleware: [loggerMiddleware] })
  name: string;

  @Column()
  @Field()
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  @Field()
  createdAt?: Date;

  @Column({ nullable: true })
  @Field(() => CoffeeType)
  type?: CoffeeType;
}
