import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Problem, ProblemRelations, Submission, Doubt} from '../models';
import {SubmissionRepository} from './submission.repository';
import {DoubtRepository} from './doubt.repository';

export class ProblemRepository extends DefaultCrudRepository<
  Problem,
  typeof Problem.prototype.id,
  ProblemRelations
> {
  public submissions: HasManyRepositoryFactory<Submission, typeof Submission.prototype.id>;

  public readonly doubts: HasManyRepositoryFactory<Doubt, typeof Problem.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
    @repository.getter('SubmissionRepository') submissionsRepostoryGetter: Getter<SubmissionRepository>, @repository.getter('DoubtRepository') protected doubtRepositoryGetter: Getter<DoubtRepository>,
  ) {
    super(Problem, dataSource);
    this.doubts = this.createHasManyRepositoryFactoryFor('doubts', doubtRepositoryGetter,);
    this.registerInclusionResolver('doubts', this.doubts.inclusionResolver);
    this.submissions = this.createHasManyRepositoryFactoryFor('submissions', submissionsRepostoryGetter);
    this.registerInclusionResolver('submissions', this.submissions.inclusionResolver);
  }
}
