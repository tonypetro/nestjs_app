import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'

@Injectable()
export class UserService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  async findOne(whereCondition): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: whereCondition })
  }
}
