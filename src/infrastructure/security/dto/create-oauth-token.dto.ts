import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf, IsEnum } from 'class-validator';

export enum GrantType {
  AUTHORIZATION_CODE = 'authorization_code',
  PASSWORD = 'password',
}

export class CreateOAuthTokenDto {
  @ApiProperty({ description: 'grant_type', type: String })
  @IsEnum(GrantType)
  grant_type?: GrantType;

  @ApiProperty({ description: 'code', type: String })
  @ValidateIf((o) => o.grant_type === GrantType.AUTHORIZATION_CODE)
  @IsString()
  code?: string;

  @ApiProperty({ description: 'username', type: String })
  @ValidateIf((o) => o.grant_type === GrantType.PASSWORD)
  @IsString()
  username?: string;

  @ApiProperty({ description: 'password', type: String })
  @ValidateIf((o) => o.grant_type === GrantType.PASSWORD)
  @IsString()
  password?: string;
}
