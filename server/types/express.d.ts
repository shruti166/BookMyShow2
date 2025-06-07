declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      email: string;
      role: 'admin' | 'user' | 'partner';
    }
  }
} 