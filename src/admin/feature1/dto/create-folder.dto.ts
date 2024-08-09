import { ApiProperty } from "@nestjs/swagger";
import { File } from "buffer";
import { IsNotEmpty,IsString, MinLength } from "class-validator";

//@ApiProperty() is used to show all parameters to swagger
export class createFolderDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    // @ApiProperty()
    // @IsNotEmpty()
    // readonly file:string;
}