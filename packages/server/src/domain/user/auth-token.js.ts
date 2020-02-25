import { Enum, Property } from '@tsed/common';


export enum AuthProviderEnum {
  FACEBOOK = 'facebook'
}

export class AuthToken {

  @Property()
  accessToken: string;

  @Enum(AuthProviderEnum)
  provider: AuthProviderEnum;
}
