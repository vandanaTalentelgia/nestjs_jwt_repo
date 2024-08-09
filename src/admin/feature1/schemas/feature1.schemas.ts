import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps:true})
export class Parent {
  @Prop()
  name: string;

  // @Prop()
  // file: string;

}

export const ParentSchema = SchemaFactory.createForClass(Parent);