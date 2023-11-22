import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Doubt, Submission, User, UserRelations, Draft} from '../models';
import {DoubtRepository} from './doubt.repository';
import {SubmissionRepository} from './submission.repository';
import {DraftRepository} from './draft.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  protected submissions: HasManyRepositoryFactory<Submission, typeof Submission.prototype.id>;

  public readonly doubts: HasManyRepositoryFactory<Doubt, typeof User.prototype.id>;

  public readonly studentDoubts: HasManyRepositoryFactory<Doubt, typeof User.prototype.id>;

  public readonly drafts: HasManyRepositoryFactory<Draft, typeof User.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
    @repository.getter('SubmissionRepository') submissionsRepostoryGetter: Getter<SubmissionRepository>, @repository.getter('DoubtRepository') protected doubtRepositoryGetter: Getter<DoubtRepository>, @repository.getter('DraftRepository') protected draftRepositoryGetter: Getter<DraftRepository>,

  ) {
    super(User, dataSource);
    this.drafts = this.createHasManyRepositoryFactoryFor('drafts', draftRepositoryGetter,);
    this.registerInclusionResolver('drafts', this.drafts.inclusionResolver);
    this.studentDoubts = this.createHasManyRepositoryFactoryFor('studentDoubts', doubtRepositoryGetter,);
    this.registerInclusionResolver('studentDoubts', this.studentDoubts.inclusionResolver);
    this.doubts = this.createHasManyRepositoryFactoryFor('doubts', doubtRepositoryGetter,);
    this.registerInclusionResolver('doubts', this.doubts.inclusionResolver);
    this.submissions = this.createHasManyRepositoryFactoryFor('submissions', submissionsRepostoryGetter);
    this.registerInclusionResolver('submissions', this.submissions.inclusionResolver);
  }
}
