import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    // @InjectRepository(Flavor)
    // private readonly flavorsRepository: Repository<Flavor>,
    private readonly flavorByCoffeeLoader: FlavorsByCoffeeLoader,
  ) {}

  @ResolveField('flavors', () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorByCoffeeLoader.load(coffee.id);
    // return this.flavorsRepository
    //   .createQueryBuilder('flavor')
    //   .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', { coffeeId: coffee.id })
    //   .getMany();
  }
}
