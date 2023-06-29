import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Draft, DraftRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class DraftRepository extends DefaultCrudRepository<
  Draft,
  typeof Draft.prototype.id,
  DraftRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Draft.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Draft, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
