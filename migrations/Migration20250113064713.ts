import { Migration } from '@mikro-orm/migrations';

export class Migration20250113064713 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "chat_history" ("id" serial primary key, "created_by_email" varchar(255) not null, "chat_id" varchar(255) not null, "message" text not null, "timestamp" timestamptz not null, "sender_email" varchar(255) not null, "receiver_email" varchar(255) not null, "message_type" varchar(255) not null, "is_read" boolean not null default false);`);

    this.addSql(`alter table "chat_history" add constraint "chat_history_created_by_email_foreign" foreign key ("created_by_email") references "user" ("email") on update cascade;`);
    this.addSql(`alter table "chat_history" add constraint "chat_history_sender_email_foreign" foreign key ("sender_email") references "user" ("email") on update cascade;`);
    this.addSql(`alter table "chat_history" add constraint "chat_history_receiver_email_foreign" foreign key ("receiver_email") references "user" ("email") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "chat_history" cascade;`);
  }

}
