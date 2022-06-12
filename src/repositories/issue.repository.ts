import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Issue, IssueRelations, Submission} from '../models';
import {SubmissionRepository} from './submission.repository';

export class IssueRepository extends DefaultCrudRepository<
  Issue,
  typeof Issue.prototype.id,
  IssueRelations
> {
  protected submissions: HasManyRepositoryFactory<Submission, typeof Submission.prototype.id>;
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
    @repository.getter('SubmissionRepository') submissionsRepostoryGetter: Getter<SubmissionRepository>
  ) {
    super(Issue, dataSource);
    this.submissions = this.createHasManyRepositoryFactoryFor('submissions', submissionsRepostoryGetter);
    this.registerInclusionResolver('submissions', this.submissions.inclusionResolver);
  }
}
