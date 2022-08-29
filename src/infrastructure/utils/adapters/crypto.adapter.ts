import crypto from 'crypto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CryptoAdapter {
  encrypt(algorithm: string, password: string, ivLength: number, data: string): string {
    const iv = crypto.randomBytes(ivLength)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(password), iv)
    let encrypted = cipher.update(data)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex')
  }

  decrypt(algorithm: string, password: string, data: string): string {
    const textParts = data.split(':')
    const iv = Buffer.from(textParts.shift(), 'hex')
    const encryptedText = Buffer.from(textParts.join(':'), 'hex')
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(password), iv)
    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
  }
}
