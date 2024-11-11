import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { CalendarEvent } from 'angular-calendar';
import { Schedule } from '../../models/schedule.model';
import { addMonths, endOfMonth, format, startOfMonth } from 'date-fns';
@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.css']
})
export class SchedularComponent implements OnInit {

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  schedules: Schedule[] = [];
  shifts!: { id: number, name: string }[];
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  currentMonthIndex!: number;
  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.schedules = this.scheduleService.getSchedules();
    this.shifts = this.scheduleService.getShifts();
    this.loadSchedules();

    this.currentMonthIndex= new Date().getMonth();

  }

  loadSchedules() {
    // const startOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    // const endOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    const startOfMonthDate = startOfMonth(this.viewDate);
    const endOfMonthDate = endOfMonth(this.viewDate);
    this.events = [];

    this.schedules.forEach(schedule => {
      const weekday = schedule.weekday;
      const startTime = schedule.startTime;
      const endTime = schedule.endTime;
      const shiftName = this.getShiftName(schedule.shiftId);


      for (let date = new Date(startOfMonthDate); date <= endOfMonthDate; date.setDate(date.getDate() + 1)) {
        if (date.getDay() === this.getDayIndex(weekday)) {
          const startDate = this.setTimeForDate(new Date(date), startTime);
          const endDate = this.getEndDate(startDate, endTime);

          this.events.push({
            start: startDate,
            end: endDate,
            title: `${schedule.employeeName} (${shiftName}) (${format(new Date(startDate), 'hh:mm a') + "-" + format(new Date(endDate), 'hh:mm a')})`,
            allDay: false,
          });
        }
      }
    });
  }


  getDayIndex(weekday: string): number {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames.indexOf(weekday);
  }


  setTimeForDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  getEndDate(start: Date, endTime: string): Date {
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const endDate = new Date(start);
    endDate.setHours(endHours, endMinutes, 0, 0);


    if (endDate < start) {
      endDate.setDate(endDate.getDate() + 1);
    }
    return endDate;
  }

  getShiftName(shiftId: number): string {
    const shift = this.shifts.find(s => s.id === shiftId);
    return shift ? shift.name : 'Unknown Shift';
  }

  onScheduleCreated(employeeName: string, startTime: string, endTime: string, shiftId1: string, weekday: string) {
    const shiftId = parseInt(shiftId1);
    const newSchedule: Schedule = { shiftId, startTime, endTime, employeeName, weekday };
    this.scheduleService.addSchedule(newSchedule);
    this.loadSchedules();
  }

  previousMonth() {
    this.viewDate = addMonths(this.viewDate, -1);
    this.loadSchedules();
  }

 
  nextMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
    this.loadSchedules();
  }


  onMonthChange(event: any) {

    this.selectedMonth = event.target.value;
    this.viewDate = new Date(this.selectedYear, this.selectedMonth, 1);
    this.loadSchedules();
  }


}
