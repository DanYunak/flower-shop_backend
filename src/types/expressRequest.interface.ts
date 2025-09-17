import { Request } from "express";
import { UserEntity } from '../user/user.entity';

export interface ExpressRequestInterface extends Request {
    user?: UserEntity;
    headers: {
      authorization?: string;
      [key: string]: string | undefined;
    };
  }