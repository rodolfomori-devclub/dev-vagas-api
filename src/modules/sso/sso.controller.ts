
import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiServiceUnavailableResponse, ApiTags } from '@nestjs/swagger';
import { SsoService } from './sso.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CredentialDto } from './credential.dto';

@ApiTags('SSO')
@Controller('sso')
export class SsoController {
  constructor(private readonly ssoService: SsoService) { }

  @ApiOperation({
    summary: 'get jwt token from SSO',
    description: 'Do login',
  })
  @ApiBadRequestResponse({ description: 'Payload with Error' })
  @ApiServiceUnavailableResponse({ description: 'Service Unvaliable' })
  @Post('auth')
  async login(@Body() credentialDto: CredentialDto): Promise<any> {
    return this.ssoService.login(credentialDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async verifyToken(@Request() req): Promise<any> {
    return req.user;
  }

  @Put('refresh-token')
  async refreshToken(): Promise<any> {
    return 'Refresh Token!';
  }
}
