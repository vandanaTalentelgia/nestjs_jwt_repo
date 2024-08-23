import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsString, MinLength } from "class-validator";

//@ApiProperty() is used to show all parameters to swagger
export class formDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly content : string;
}