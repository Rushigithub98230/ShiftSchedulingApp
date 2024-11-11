import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private schedules: Schedule[] = [
    { shiftId: 1, startTime: '08:00', endTime: '16:00', employeeName: 'Alice Johnson', weekday: 'Monday' },
    { shiftId: 2, startTime: '20:00', endTime: '04:00', employeeName: 'Bob Smith', weekday: 'Monday' },
    { shiftId: 1, startTime: '08:00', endTime: '16:00', employeeName: 'Charlie Brown', weekday: 'Tuesday' },
    { shiftId: 2, startTime: '20:00', endTime: '04:00', employeeName: 'Diana Prince', weekday: 'Tuesday' },
  ];

  private shifts = [
    { id: 1, name: 'Day Shift' },
    { id: 2, name: 'Night Shift' },
  ];

  constructor() {}

  getSchedules() {
    return this.schedules;
  }

  getShifts(){
    return this.shifts;
  }

  addSchedule(schedule: Schedule) {
    this.schedules.push(schedule);
  }
}
