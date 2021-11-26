declare module 'express-session' {
  interface SessionData {
    isLogIn: boolean;
    email: string;
  }
}
