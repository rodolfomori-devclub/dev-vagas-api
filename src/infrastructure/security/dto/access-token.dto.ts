export class AccessTokenDto {
  authorization: {
    accessToken: string;
    expiresIn: number;
    homebrokerToken?: string;
  };
}
