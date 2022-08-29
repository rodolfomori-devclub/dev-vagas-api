import { EncrypterService } from './encrypter.service'
import { ConfigService } from '@nestjs/config'
import { CryptoAdapter } from './adapters/crypto.adapter'

const makeSut = () => {
  const configServiceStub: ConfigService = jest.genMockFromModule('@nestjs/config')
  configServiceStub.get = (key: string): string => 'any_value'

  const cryptoAdapterStub: CryptoAdapter = jest.genMockFromModule('../adapters/crypto.adapter')
  cryptoAdapterStub.encrypt = (): string => 'any_encrypted'
  cryptoAdapterStub.decrypt = (): string => 'any_decrypted'

  return {
    configServiceStub,
    cryptoAdapterStub,
    sut: new EncrypterService(configServiceStub, cryptoAdapterStub),
  }
}

describe('Encrypter Service', () => {
  it('should encrypt data', () => {
    const { sut } = makeSut()
    const ecnrypt = sut.encrypt('any_data')
    expect(ecnrypt).toBeDefined()
  })

  it('should call CryptoAdapter.encrypt with valid data', () => {
    const { sut, cryptoAdapterStub } = makeSut()
    const encryptSpy = jest.spyOn(cryptoAdapterStub, 'encrypt')
    sut.encrypt('any_data')
    expect(encryptSpy).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      JSON.stringify('any_data'),
    )
  })

  it('should throw when ConfigService throws', () => {
    const { sut, configServiceStub } = makeSut()
    configServiceStub.get = (key: string): any => {
      throw new Error()
    }
    expect(() => {
      sut.encrypt('any_data')
    }).toThrow()
  })

  it('should throw when CryptoAdapter.encrypt throws', () => {
    const { sut, cryptoAdapterStub } = makeSut()
    cryptoAdapterStub.encrypt = (): string => {
      throw new Error()
    }
    expect(() => {
      sut.encrypt('any_data')
    }).toThrow()
  })

  it('should decrypt data', () => {
    const { sut } = makeSut()
    const decrypt = sut.decrypt('any_data')
    expect(decrypt).toBeDefined()
  })

  it('should call CryptoAdapter.decrypt with valid data', () => {
    const { sut, cryptoAdapterStub } = makeSut()
    const decryptSpy = jest.spyOn(cryptoAdapterStub, 'decrypt')
    sut.decrypt('any_data')
    expect(decryptSpy).toBeCalledWith(expect.anything(), expect.anything(), 'any_data')
  })

  it('should throw when CryptoAdapter.decrypt throws', () => {
    const { sut, cryptoAdapterStub } = makeSut()
    cryptoAdapterStub.decrypt = (): string => {
      throw new Error()
    }
    expect(() => {
      sut.decrypt('any_data')
    }).toThrow()
  })
})
