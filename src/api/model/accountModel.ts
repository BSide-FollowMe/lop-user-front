export interface GetAccountInfoModel {
  email: string;
  name: string;
  introduction: string;
  phone: string;
  address: string;
}

export interface LoginParamModel {
  id: string;
  password: string;
}

export interface LoginRespModel {
  jwt: string;
}
