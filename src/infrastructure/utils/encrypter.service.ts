import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CryptoAdapter } from 'src/infrastructure/utils/adapters/crypto.adapter'

const algorithm = 'aes-256-cbc'
const ivLength = 16

@Injectable()
export class EncrypterService {
  constructor(private readonly configService: ConfigService, private readonly cryptoAdapter: CryptoAdapter) {}

  encrypt(data: any): string {
    const password = this.configService.get<string>('secret.encodeSecret')
    return this.cryptoAdapter.encrypt(algorithm, password, ivLength, JSON.stringify(data))
  }

  decrypt(data: string): any {
    const password = this.configService.get<string>('secret.encodeSecret')
    return this.cryptoAdapter.decrypt(algorithm, password, data)
  }
}
