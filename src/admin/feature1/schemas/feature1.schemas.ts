import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps:true})
export class Module {

  @Prop()
  parent_id:string;

  @Prop()
  name: string;

  @Prop()
  file: string;

}

export const ModuleSchema = SchemaFactory.createForClass(Module);