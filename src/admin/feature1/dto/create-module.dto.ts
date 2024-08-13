import { ApiProperty,ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty,IsString, ValidateIf, IsOptional} from "class-validator";

//@ApiProperty() is used to show all parameters to swagger
export class createModuleDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly parent_id:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' }) // Optional binary file input
    @ValidateIf((o) => o.parent_id)  // File is required only if parent_id (id) is present
    @IsOptional()  // Allows file to be optional based on the ValidateIf condition
    file?: string;
}