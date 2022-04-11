import { Controller, Post, Body, ValidationPipe, UsePipes, Res, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { LoginResponseDto } from './dto/login-response.dto'
import { Response } from 'express'

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Token',
    type: LoginResponseDto,
  })
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const data = await this.authService.login(loginDto)

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Success',
      data,
    })
  }

  // @Post('/signup')
  // @ApiResponse({
  //   status: 200,
  //   description: 'User',
  //   type: UserDto,
  // })
  // register(@Body() data: SignupDto) {
  //   return this.service.signup(data)
  // }

  // @Get('/confirm')
  // @ApiResponse({
  //   status: 200,
  //   description: 'Token',
  //   type: LoginResponse,
  // })
  // async confirm(@Query('token') verificationToken: string, @Query('mode') mode: 'signup' | 'forgot-password') {
  //   return this.service.confirmToken(verificationToken, mode)
  // }

  // @Get('/check-token')
  // @ApiBearerAuth()
  // @ApiResponse({ status: 200, description: 'Return current user', type: UserDto })
  // async checkToken(@Headers('Authorization') authorization: string) {
  //   const [_, token] = authorization.split(' ')
  //   return this.service.checkToken(token)
  // }
}
