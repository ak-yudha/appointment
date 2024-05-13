import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Module } from '@nestjs/common';
import { AppointmentsController } from '../controllers/appointments.controller';
import { AppointmentsService } from '../services/appointments.service';

@Schema()
export class Appointment extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  slotsTaken: number;

  @Prop({ required: true })
  maxSlots: number;
}

export interface Appointment {
    date: Date;
    time: string;
    slotsTaken: number;
    maxSlots: number;
}

Module({
    controllers: [AppointmentsController],
    providers: [AppointmentsService],
})
  
export type AppointmentDocument = Appointment & Document; 
export class AppointmentsModule {}
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);