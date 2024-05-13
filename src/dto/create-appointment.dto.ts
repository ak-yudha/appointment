import { IsDate, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  date: Date;

  @IsString()
  time: string;

  @IsInt()
  @Min(1)
  @Max(5)
  maxSlots: number;
}