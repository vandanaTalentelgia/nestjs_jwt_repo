import * as  mongoose from 'mongoose';
import {Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Form } from './schemas/form.schemas';
import { JwtService } from '@nestjs/jwt';
import { formDto } from './dto/form.dto';
@Injectable()
export class FormService {

  constructor(@InjectModel(Form.name)
  private formModel: mongoose.Model<Form>,
    private jwtService: JwtService

  ) { }

  async create(formDto: formDto): Promise<Form> {
    try {
      const { name, content } = formDto
      const jsonData = content; // Convert JSON to string
      const formData = await this.formModel.create({
        name,
        content:jsonData
      });
      return formData ;
      
    } catch (error) {
      return error;
    }
  }

}
