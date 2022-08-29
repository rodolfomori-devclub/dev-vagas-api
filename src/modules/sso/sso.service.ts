import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CredentialDto } from './credential.dto';

@Injectable()
export class SsoService {
  constructor(private readonly authService: AuthService) {}
  async login(credentialDto: CredentialDto): Promise<any> {
    const user = await this.authService.validateUser(credentialDto.username, credentialDto.password)
    if(!user){
      throw new UnauthorizedException('Invalid Credentials')
    }
    console.log(user)
    return await this.authService.login(user);
  }
}


/*

Name
Client-ID
Client-Secret
Scope: [eloan, efound, ecash]
Redirect-URI
Callback-URI

*/