import { CryptoAdapter } from './crypto.adapter'
import crypto from 'crypto'

jest.mock('crypto', () => ({
  randomBytes: (iv: number): Buffer => Buffer.from('1234567890123456'),
  createCipheriv: (algorithm: string, password: string, data: Buffer): any => ({
    update: (): Buffer => Buffer.from('valid_encrypt'),
    final: (): Buffer => Buffer.from('valid_encrypt'),
  }),
  createDecipheriv: (algorithm: string, password: Buffer, iv: Buffer): any => ({
    update: (): Buffer => Buffer.from('valid_encrypt'),
    final: (): Buffer => Buffer.from('valid_encrypt'),
  }),
}))

describe('CryptoAdapter', () => {
  let sut: CryptoAdapter

  beforeEach(() => {
    sut = new CryptoAdapter()
  })

  it('should encrypt data', () => {
    const randomBytesSpy = jest.spyOn(crypto, 'randomBytes')
    const createCipherivSpy = jest.spyOn(crypto, 'createCipheriv')
    const encrypted = sut.encrypt('valid_algorithm', 'any_password', 16, 'any_data')

    expect(encrypted).toBeDefined()

    expect(randomBytesSpy).toBeCalledWith(16)
    expect(createCipherivSpy).toBeCalledWith(
      'valid_algorithm',
      Buffer.from('any_password'),
      Buffer.from('1234567890123456'),
    )
  })

  it('should throw on randomBytes', () => {
    jest.mock('crypto', () => ({
      randomBytes: (iv: number): Buffer => {
        throw new Error()
      },
    }))

    sut.encrypt('valid_algorithm', 'any_password', 16, 'any_data')

    expect(sut.encrypt).toThrow()
  })

  it('should throw on createCipheriv', () => {
    jest.mock('crypto', () => ({
      randomBytes: (iv: number): Buffer => Buffer.from('1234567890123456'),
      createCipheriv: (iv: number): Buffer => {
        throw new Error()
      },
    }))

    sut.encrypt('valid_algorithm', 'any_password', 16, 'any_data')

    expect(sut.encrypt).toThrow()
  })

  it('should throw on createCipheriv.update', () => {
    jest.mock('crypto', () => ({
      randomBytes: (iv: number): Buffer => Buffer.from('1234567890123456'),
      createCipheriv: (algorithm: string, password: string, data: Buffer): any => ({
        update: (): Buffer => {
          throw new Error()
        },
      }),
    }))

    sut.encrypt('valid_algorithm', 'any_password', 16, 'any_data')

    expect(sut.encrypt).toThrow()
  })

  it('should throw on createCipheriv.final', () => {
    jest.mock('crypto', () => ({
      randomBytes: (iv: number): Buffer => Buffer.from('1234567890123456'),
      createCipheriv: (algorithm: string, password: string, data: Buffer): any => ({
        update: (): Buffer => Buffer.from('valid_encrypt'),
        final: (): Buffer => {
          throw new Error()
        },
      }),
    }))

    sut.encrypt('valid_algorithm', 'any_password', 16, 'any_data')

    expect(sut.encrypt).toThrow()
  })

  it('should decrypt data', () => {
    const createDecipherivSpy = jest.spyOn(crypto, 'createDecipheriv')
    const decrypted = sut.decrypt('valid_algorithm', 'any_password', 'any_data')

    expect(decrypted).toBeDefined()

    expect(createDecipherivSpy).toBeCalledWith('valid_algorithm', Buffer.from('any_password'), expect.any(Buffer))
  })

  it('should throw on createDecipheriv.update', () => {
    jest.mock('crypto', () => ({
      createDecipheriv: (algorithm: string, password: string, data: Buffer): any => ({
        update: (): Buffer => {
          throw new Error()
        },
      }),
    }))

    sut.decrypt('valid_algorithm', 'any_password', 'any_data')

    expect(sut.decrypt).toThrow()
  })

  it('should throw on createDecipheriv.final', () => {
    jest.mock('crypto', () => ({
      createDecipheriv: (algorithm: string, password: string, data: Buffer): any => ({
        update: (): Buffer => Buffer.from('valid_encrypt'),
        final: (): Buffer => {
          throw new Error()
        },
      }),
    }))

    sut.decrypt('valid_algorithm', 'any_password', 'any_data')

    expect(sut.decrypt).toThrow()
  })
})
