import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtAdapter {
  decode(token: string): any {
    return jwt.decode(token, { json: true })
  }
}
