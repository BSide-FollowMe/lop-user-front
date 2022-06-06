export type GetAccountInfo = {
  email: string;
  name: string;
  introduction: string;
  phone: string;
  address: string;
};

export type LoginParam = {
  id: string;
  password: string;
};

export type LoginResponse = {
  jwt: string;
};
