import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps:true})
export class Form {
  @Prop()
  name: string;

  @Prop()
  content: string;

}

export const FormSchema = SchemaFactory.createForClass(Form);