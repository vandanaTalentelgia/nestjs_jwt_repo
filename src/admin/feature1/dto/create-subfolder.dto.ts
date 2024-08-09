import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty,IsString, MinLength } from "class-validator";

//@ApiProperty() is used to show all parameters to swagger
export class createSubFolderDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly parent_id:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly file:string;
}