import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Room, Schedule } from '../model/interfaces';
import { fetchRooms, fetchSchedule } from '../services/scheduleService';

interface ScheduleContextProps {
  rooms: Room[];
  schedule: Schedule[];
  loading: boolean;
}

interface ScheduleProviderProps {
  children: ReactNode;
}

const ScheduleContext = createContext<ScheduleContextProps | undefined>(undefined);

export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const roomsData = await fetchRooms();
      const scheduleData = await fetchSchedule();
      setRooms(roomsData);
      setSchedule(scheduleData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <ScheduleContext.Provider value={{ rooms, schedule, loading }}>
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
