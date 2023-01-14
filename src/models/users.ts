import * as Objection from 'objection';

export class User extends Objection.Model {
    static get tableName() {
      return 'users';
    }
}