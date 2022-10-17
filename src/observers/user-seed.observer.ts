import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PasswordHasherBindings} from '../keys';
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
    if (email == '' || password == '') return console.warn('Não há admins configurados nas variáveis de ambiente!')
    this.userRepository.findOne({where: {email}}).then((user => {
      if (user) return
      this.hasher.hashPassword(password).then(encrypted => {
        this.userRepository.create({
          email, password: encrypted, name: 'Usuário admin padrão'
        }).then(s => {
          console.log('Criado com sucesso!');
        }).catch(reason => {
          console.error('Não foi possível criar o usuário padrão', reason);
        })
      })
    }))

  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
