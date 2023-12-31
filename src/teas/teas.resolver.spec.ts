import { Test, TestingModule } from '@nestjs/testing';
import { TeasResolver } from './teas.resolver';

describe('TeasResolver', () => {
  let resolver: TeasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeasResolver],
    }).compile();

    resolver = module.get<TeasResolver>(TeasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
