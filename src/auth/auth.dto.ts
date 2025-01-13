import { IsString } from "class-validator";

export class UserSignupDto{
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    password: string;
}

export class UserLoginDto{
    @IsString()
    email: string

    @IsString()
    password: string
}