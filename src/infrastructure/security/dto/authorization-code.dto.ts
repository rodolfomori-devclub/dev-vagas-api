import { UserInfoDto } from './user-info.dto';

export class AuthorizationCodeDto {
  userInfo: UserInfoDto;
  homebrokerAuthorization: string;
}
