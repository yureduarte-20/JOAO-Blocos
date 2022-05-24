
import {AuthorizationContext, AuthorizationDecision, AuthorizationMetadata, Authorizer} from '@loopback/authorization';
import {Provider} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UserRepository} from '../repositories';
export class MyAuthorizationProvider implements Provider<Authorizer> {
  constructor(
    @repository('UserRepository')
    private userRepository: UserRepository
  ) { }

  /**
   * @returns authenticateFn
   */
  value(): Authorizer {
    return this.authorize.bind(this);
  }

  async authorize(
    authorizationCtx: AuthorizationContext,
    //@inject(AuthorizationBindings.METADATA)
    metadata: AuthorizationMetadata,
  ) {
    const client = authorizationCtx.principals[0];
    const clientRole = await this.userRepository.findById(client.id)
    if (!clientRole) return AuthorizationDecision.DENY
    const allowedRoles = metadata.allowedRoles || [];
    return allowedRoles.includes(clientRole?.role)
      ? AuthorizationDecision.ALLOW
      : AuthorizationDecision.DENY;
  }
}
