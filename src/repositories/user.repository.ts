import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {JsonDataSource} from '../datasources';
import {Submission, User, UserRelations} from '../models';
import {SubmissionRepository} from './submission.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  protected submissions: HasManyRepositoryFactory<Submission, typeof Submission.prototype.id>;
  constructor(
    @inject('datasources.Json') dataSource: JsonDataSource,
    @repository.getter('SubmissionRepository') submissionsRepostoryGetter: Getter<SubmissionRepository>

  ) {
    super(User, dataSource);
    this.submissions = this.createHasManyRepositoryFactoryFor('submissions', submissionsRepostoryGetter);
    this.registerInclusionResolver('submissions', this.submissions.inclusionResolver);
  }
}
