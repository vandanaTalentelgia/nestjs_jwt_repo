import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty,IsOptional,IsString, MinLength } from "class-validator";

//@ApiProperty() is used to show all parameters to swagger
export class createUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message : "please enter correct email" })
    readonly email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password:string;
}


export class updateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message : "please enter correct email" })
    @IsOptional()
    readonly email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @IsOptional()
    readonly password:string;
}