import { Request } from "express";
import { TokenPayload } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
