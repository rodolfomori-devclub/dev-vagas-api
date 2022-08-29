import { Module } from '@nestjs/common'
import { CryptoAdapter } from './adapters/crypto.adapter'
import { JwtAdapter } from './adapters/jwt.adapter'
import { EncrypterService } from './encrypter.service'

@Module({
  providers: [EncrypterService, CryptoAdapter, JwtAdapter],
  exports: [EncrypterService, CryptoAdapter, JwtAdapter],
})
export class UtilsModule {}
