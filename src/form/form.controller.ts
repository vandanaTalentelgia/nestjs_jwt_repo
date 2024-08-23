import { Body, Controller, Res, HttpException, HttpStatus, Post} from '@nestjs/common';
import { FormService } from './form.service';
import { formDto } from './dto/form.dto';
import { Response } from 'express';

@Controller('forms')
//to add category in the swagger
export class FormController {
    constructor(private formService :FormService ) {}
    
    @Post("")
    async create(
        @Body()
        form:formDto,
        @Res() res: Response
        ): Promise<void> {
        const create= await this.formService.create(form);
        if(create){
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! Form has been created.",
                 data : create,
             });
        } else {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
