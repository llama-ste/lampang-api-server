import { IUserAttributes } from "../../app/models/user";

declare global {
  namespace Express {
    interface User extends IUserAttributes {}
  }
}
