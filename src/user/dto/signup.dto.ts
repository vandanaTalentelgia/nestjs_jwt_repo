import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty,IsString, MinLength } from "class-validator";

//@ApiProperty() is used to show all parameters to swagger
export class signUpDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message : "please enter correct email" })
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}