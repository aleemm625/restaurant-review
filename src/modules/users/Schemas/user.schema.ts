import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type } from 'os';
import { Enums } from 'src/utils';

export type UserDocument = User & Document;

@Schema({
  timestamps: true
})
export class User {
  @Prop({
    required: true
  })
  first_name: string;

  @Prop({
    required: true
  })
  last_name: string;

  @Prop({
    required: true
  })
  email: string;

  @Prop({
    required: true
  })
  password: string;

  @Prop({
    enum: ['ADMIN', 'USER'],
    type: String,
    required: true,
  })
  role: string;

  @Prop()
  picture: string;

  @Prop({
    required: true
  })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

