import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Room, Schedule } from '../interfaces';
import { fetchRooms, fetchSchedule } from '../services/scheduleService';

interface ScheduleContextProps {
  rooms: Room[];
  schedule: Schedule[];
}

interface ScheduleProviderProps {
  children: ReactNode;
}

const ScheduleContext = createContext<ScheduleContextProps | undefined>(undefined);

export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const roomsData = await fetchRooms();
      const scheduleData = await fetchSchedule();
      setRooms(roomsData);
      setSchedule(scheduleData);
    };

    fetchData();
  }, []);

  return (
    <ScheduleContext.Provider value={{ rooms, schedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = (): ScheduleContextProps => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};
