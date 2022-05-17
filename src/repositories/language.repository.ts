import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {JsonDataSource} from '../datasources';
import {Language, LanguageRelations, Submission} from '../models';
import {SubmissionRepository} from './submission.repository';

export class LanguageRepository extends DefaultCrudRepository<
  Language,
  typeof Language.prototype.id,
  LanguageRelations
> {
  protected submissions: HasManyRepositoryFactory<Submission, typeof Submission.prototype.id>;
  constructor(
    @inject('datasources.Json') dataSource: JsonDataSource,
    @repository.getter('SubmissionRepository') submissionsRepostoryGetter: Getter<SubmissionRepository>
  ) {
    super(Language, dataSource);
    this.submissions = this.createHasManyRepositoryFactoryFor('submissions', submissionsRepostoryGetter);
    this.registerInclusionResolver('submissions', this.submissions.inclusionResolver);
  }
}
