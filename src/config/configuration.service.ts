import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  private readonly slotDuration: number = 30; // in minutes
  private readonly maxSlotsPerAppointment: number = 5;
  private readonly operationalHoursStart: number = 9; // 9 AM
  private readonly operationalHoursEnd: number = 18; // 6 PM

  getSlotDuration() {
    return this.slotDuration;
  }

  getMaxSlotsPerAppointment() {
    return this.maxSlotsPerAppointment;
  }

  getOperationalHoursStart() {
    return this.operationalHoursStart;
  }

  getOperationalHoursEnd() {
    return this.operationalHoursEnd;
  }
}