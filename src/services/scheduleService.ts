import axios from 'axios';
import { Room, Schedule, ScheduleSlot } from '../model/interfaces';
import { mockRooms, mockSchedule } from '../mockData';

const API_ROOMS_URL = 'https://app.plai.win/api/job-test/rooms';
const API_SCHEDULE_URL = 'https://app.plai.win/api/job-test/schedule';

const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await axios.get(API_ROOMS_URL);
    return response.data.map((room: any) => ({
      id: room.roomId.toString(),
      name: room.title,
    }));
  } catch (error) {
    console.error('Error fetching rooms, using mock data', error);
    return mockRooms.map(room => ({
      id: room.roomId.toString(),
      name: room.title,
    }));
  }
};

const fetchSchedule = async (): Promise<Schedule[]> => {
  try {
    const response = await axios.get(API_SCHEDULE_URL);
    return transformScheduleData(response.data);
  } catch (error) {
    console.error('Error fetching schedule, using mock data', error);
    return transformScheduleData(mockSchedule);
  }
};

const transformScheduleData = (data: any): Schedule[] => {
  return Object.entries(data).flatMap(([roomId, slots]) => {
    const groupedByDate = (slots as ScheduleSlot[]).reduce((acc, slot) => {
      const date = slot.startTime.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({ ...slot, roomId: parseInt(roomId) });
      return acc;
    }, {} as { [date: string]: ScheduleSlot[] });

    return Object.entries(groupedByDate).map(([date, slots]) => ({
      date,
      slots,
    }));
  });
};

export { fetchRooms, fetchSchedule };
