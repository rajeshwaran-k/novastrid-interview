import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
    @PrimaryKey()
    email: string

    @Property()
    name: string

    @Property()
    password: string

constructor({email, name, password}:{email: string, name: string, password: string}){
this.email = email;
this.name = name;
this.password = password
    }
}