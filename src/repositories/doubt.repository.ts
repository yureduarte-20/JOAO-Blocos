import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Doubt, DoubtRelations, Problem, User} from '../models';
import {ProblemRepository} from './problem.repository';
import {UserRepository} from './user.repository';

export class DoubtRepository extends DefaultCrudRepository<
  Doubt,
  typeof Doubt.prototype.id,
  DoubtRelations
> {

  public readonly advisor: BelongsToAccessor<User, typeof Doubt.prototype.id>;

  public readonly problem: BelongsToAccessor<Problem, typeof Doubt.prototype.id>;

  public readonly student: BelongsToAccessor<User, typeof Doubt.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('ProblemRepository') protected problemRepositoryGetter: Getter<ProblemRepository>,
  ) {
    super(Doubt, dataSource);
    this.student = this.createBelongsToAccessorFor('student', userRepositoryGetter,);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
    this.problem = this.createBelongsToAccessorFor('problem', problemRepositoryGetter,);
    this.registerInclusionResolver('problem', this.problem.inclusionResolver);
    this.advisor = this.createBelongsToAccessorFor('advisor', userRepositoryGetter,);
    this.registerInclusionResolver('advisor', this.advisor.inclusionResolver);

  }
}
