import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './models/appointment.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/appointment-scheduler', {
      connectionName: 'default', // Optional: Add a connection name
      uri: 'mongodb://localhost/appointment-scheduler', // MongoDB connection URI
  
    }),
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
