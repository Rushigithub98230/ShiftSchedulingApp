export interface Schedule {
    shiftId: number;
    startTime: string; // HH:mm
    endTime: string;   //  HH:mm
    employeeName: string;
    weekday: string; 
}

export interface Shift {
    id: number;
    name: string;
}