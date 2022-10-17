import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PasswordHasherBindings, Roles} from '../keys';
import {UserRepository} from '../repositories';
import {PasswordHasher} from '../services/hash.password';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class UserSeedObserver implements LifeCycleObserver {
  @inject(PasswordHasherBindings.PASSWORD_HASHER)
  private hasher: PasswordHasher
  @repository('UserRepository')
  private userRepository: UserRepository
  /*
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {}
  */

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    const email = process.env.ADMIN_EMAIL ?? ''
    const password = process.env.ADMIN_PASSWORD ?? ''
    if (email == '' || password == '') return console.warn('Não há admin configurados nas variáveis de ambiente!')
    const u = await this.userRepository.findOne({where: {email}});
    if (u) return
    const encrypted = await this.hasher.hashPassword(password);
    await this.userRepository.create({
      name: 'Usuário Admin Padrão',
      password: encrypted,
      email,
      role: Roles.ADMIN
    })

  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
