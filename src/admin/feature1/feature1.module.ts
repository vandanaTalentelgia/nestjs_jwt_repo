import { Module } from '@nestjs/common';



@Module({
  imports:[],
  controllers: [],
  providers: []
})
export class Feature1Module {
  constructor(){
    console.log('feature 1 sub module of admin');
  }
}
