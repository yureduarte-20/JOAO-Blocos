import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Doubt, DoubtRelations, User, Problem} from '../models';
import {UserRepository} from './user.repository';
import {ProblemRepository} from './problem.repository';

export class DoubtRepository extends DefaultCrudRepository<
  Doubt,
  typeof Doubt.prototype.id,
  DoubtRelations
> {

  public readonly student: BelongsToAccessor<User, typeof Doubt.prototype.id>;

  public readonly advisor: BelongsToAccessor<User, typeof Doubt.prototype.id>;

  public readonly problem: BelongsToAccessor<Problem, typeof Doubt.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ProblemRepository') protected problemRepositoryGetter: Getter<ProblemRepository>,
  ) {
    super(Doubt, dataSource);
    this.problem = this.createBelongsToAccessorFor('problem', problemRepositoryGetter,);
    this.registerInclusionResolver('problem', this.problem.inclusionResolver);
    this.advisor = this.createBelongsToAccessorFor('advisor', userRepositoryGetter,);
    this.registerInclusionResolver('advisor', this.advisor.inclusionResolver);
    this.student = this.createBelongsToAccessorFor('student', userRepositoryGetter,);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
  }
}
