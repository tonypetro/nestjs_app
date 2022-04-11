import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private jwtService: JwtService

  @Inject(UserService)
  private userService: UserService

  async validateCredentials(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email })
    return user && (await bcrypt.compare(password, user.password)) ? user : null
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateCredentials(loginDto.email, loginDto.password)

    if (!user) {
      throw new ForbiddenException('Wrong Credentials!')
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email })

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        isFirstTimeLogin: !user.lastLogin,
        role: user.role,
      },
    }
  }
}
