import { JwtAdapter } from './jwt.adapter'

jest.mock('jsonwebtoken', () => ({
  decode: (): any => 'any_decoded',
}))

const makeSut = () => {
  const sut = new JwtAdapter()

  return {
    sut,
  }
}

describe('JwtAdapter', () => {
  it('should decode jwt token', () => {
    const { sut } = makeSut()

    const decoded = sut.decode('any_token')

    expect(decoded).toEqual('any_decoded')
  })
})
