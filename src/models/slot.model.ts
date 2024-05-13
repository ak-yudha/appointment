import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Slot extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  availableSlots: number;
}

export interface Slot {
    date: Date;
    time: string;
    availableSlots: number;
  }
  
export type SlotDocument = Slot & Document;

export const SlotSchema = SchemaFactory.createForClass(Slot);