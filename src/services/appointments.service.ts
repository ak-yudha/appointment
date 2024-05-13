
import { Appointment } from '../models/appointment.model';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from '../models/appointment.model';
import { Slot, SlotDocument } from '../models/slot.model';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Slot.name)
    private readonly slotModel: Model<SlotDocument>,
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const { date, time, maxSlots } = createAppointmentDto;

    // Check if slot is available
    const slot = await this.slotModel.findOne({ date, time });
    if (!slot || slot.availableSlots === 0) {
      throw new NotFoundException('Slot not available');
    }

    // Check if requested number of slots is available
    if (slot.availableSlots < maxSlots) {
      throw new ConflictException('Not enough slots available');
    }

    // Create appointment
    const appointment = new this.appointmentModel({
      date,
      time,
      slotsTaken: maxSlots,
      maxSlots,
    });
    await appointment.save();

    // Update slot availability
    slot.availableSlots -= maxSlots;
    await slot.save();

    return appointment;
  }

  async getAvailableSlots(date: string) {
    const slots = await this.slotModel.find({ date, availableSlots: { $gt: 0 } });
    return slots.map(slot => ({
      date: slot.date,
      time: slot.time,
      available_slots: slot.availableSlots,
    }));
  }
}