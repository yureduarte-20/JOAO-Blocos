import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Problem, Submission, SubmissionRelations, User} from '../models';
import {UserRepository} from './index';

import {ProblemRepository} from './problem.repository';

export class SubmissionRepository extends DefaultCrudRepository<
  Submission,
  typeof Submission.prototype.id,
  SubmissionRelations
> {
  protected readonly problem: BelongsToAccessor<Problem, typeof Problem.prototype.id>
  protected readonly owner: BelongsToAccessor<User, typeof User.prototype.id>
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
    @repository.getter('ProblemRepository') problemRepositoryGetter: Getter<ProblemRepository>,
    @repository.getter('UserRepository') ownerRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Submission, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', ownerRepositoryGetter);
    this.problem = this.createBelongsToAccessorFor('problem', problemRepositoryGetter);

    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.registerInclusionResolver('problem', this.problem.inclusionResolver);

  }
}
