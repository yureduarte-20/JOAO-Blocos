import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Submission, User, UserRelations, Doubt} from '../models';
import {SubmissionRepository} from './submission.repository';
import {DoubtRepository} from './doubt.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  protected submissions: HasManyRepositoryFactory<Submission, typeof Submission.prototype.id>;

  public readonly doubt: HasOneRepositoryFactory<Doubt, typeof User.prototype.id>;

  public readonly doubts: HasManyRepositoryFactory<Doubt, typeof User.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
    @repository.getter('SubmissionRepository') submissionsRepostoryGetter: Getter<SubmissionRepository>, @repository.getter('DoubtRepository') protected doubtRepositoryGetter: Getter<DoubtRepository>,

  ) {
    super(User, dataSource);
    this.doubts = this.createHasManyRepositoryFactoryFor('doubts', doubtRepositoryGetter,);
    this.registerInclusionResolver('doubts', this.doubts.inclusionResolver);
    this.doubt = this.createHasOneRepositoryFactoryFor('doubt', doubtRepositoryGetter);
    this.registerInclusionResolver('doubt', this.doubt.inclusionResolver);
    this.submissions = this.createHasManyRepositoryFactoryFor('submissions', submissionsRepostoryGetter);
    this.registerInclusionResolver('submissions', this.submissions.inclusionResolver);
  }
}
