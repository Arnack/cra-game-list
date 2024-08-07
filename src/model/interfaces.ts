export interface Room {
    id: string;
    name: string;
  }
  
  export interface ScheduleSlot {
    startTime: string;
    endTime: string;
    name: string;
    players: { name: string }[];
    roomId: number;
  }
  
  export interface Schedule {
    date: string;
    slots: ScheduleSlot[];
  }
  