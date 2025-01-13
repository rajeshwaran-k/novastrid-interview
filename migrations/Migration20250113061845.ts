import { Migration } from '@mikro-orm/migrations';

export class Migration20250113061845 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("email" varchar(255) not null, "name" varchar(255) not null, "password" varchar(255) not null, constraint "user_pkey" primary key ("email"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
