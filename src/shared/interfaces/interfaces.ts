export interface IArticleData {
  title: string,
  desc: string,
  textBody: string,
  tags: Array<{value: string}>
}

export interface IUserLoginData {
    email: string,
    password: string
}

export interface IUserSignUpData {
    userName: string,
    email: string,
    password: string,
    repeatPassword: string
}

export interface IUserResponse {
    user: {
    bio: string|null,
    email: string,
    image: string | null,
    token: string,
    username: string
}
}

export interface IUserUpdate {
        userName: string;
        email: string;
        password: string;
        avatar: string;
}