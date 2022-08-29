import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'

export enum OriginEnum {
  PLATFORM = 'platform',
  ELOAN = 'e-loan',
  EFUND = 'e-fund',
  ECASH = 'e-cash',
}

export class CredentialDto {
  @ApiProperty({ description: 'origin', type: String, example: 'platform' })
  @IsEnum(OriginEnum)
  origin : string
  
  @ApiProperty({ description: 'login', type: String, example: 'geovane' })
  @IsString()
  username: string

  @ApiProperty({ description: 'password', type: String, example: 'test' })
  @IsString()
  password: string
}