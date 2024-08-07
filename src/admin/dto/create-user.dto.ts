import { IsEmail, IsNotEmpty,IsOptional,IsString, MinLength } from "class-validator";

export class createUserDto{
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    @IsNotEmpty()
    @IsEmail({}, { message : "please enter correct email" })
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password:string;
}


export class updateUserDto{
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly name:string;

    @IsNotEmpty()
    @IsEmail({}, { message : "please enter correct email" })
    @IsOptional()
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @IsOptional()
    readonly password:string;
}