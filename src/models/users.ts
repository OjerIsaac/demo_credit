import { Model } from "objection";

interface UsersTable {
  id: number;
  full_name: string,
  username: string;
  email: string,
  wallet?: string,
  password: string;
}

interface UsersTableModel extends UsersTable {}

class UsersTableModel extends Model {
  static get tableName() {
    return "users";
  }
}

export default UsersTableModel;