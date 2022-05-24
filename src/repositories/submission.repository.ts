import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgreeDataSource} from '../datasources';
import {Issue, Language, Submission, SubmissionRelations, User} from '../models';
import {UserRepository} from './index';
import {IssueRepository} from './issue.repository';
import {LanguageRepository} from './language.repository';

export class SubmissionRepository extends DefaultCrudRepository<
  Submission,
  typeof Submission.prototype.id,
  SubmissionRelations
> {
  protected readonly issue: BelongsToAccessor<Issue, typeof Issue.prototype.id>
  protected readonly owner: BelongsToAccessor<User, typeof User.prototype.id>
  protected readonly language: BelongsToAccessor<Language, typeof Language.prototype.id>
  constructor(
    @inject('datasources.postgreeDatasource') dataSource: PostgreeDataSource,
    @repository.getter('IssueRepository') issueRepositoryGetter: Getter<IssueRepository>,
    @repository.getter('UserRepository') ownerRepositoryGetter: Getter<UserRepository>,
    @repository.getter('LanguageRepository') languageRepositoryGetter: Getter<LanguageRepository>,
  ) {
    super(Submission, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', ownerRepositoryGetter);
    this.issue = this.createBelongsToAccessorFor('issue', issueRepositoryGetter);
    this.language = this.createBelongsToAccessorFor('language', languageRepositoryGetter);

    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.registerInclusionResolver('issue', this.issue.inclusionResolver);
    this.registerInclusionResolver('language', this.language.inclusionResolver);
  }
}
