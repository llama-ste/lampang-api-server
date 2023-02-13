import { IUserAttributes } from "../../models/user";

declare global {
  namespace Express {
    interface User extends IUserAttributes {}
  }
}
