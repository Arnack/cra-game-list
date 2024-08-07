import React from 'react';
import { render, waitFor, screen} from '@testing-library/react';
import { ScheduleProvider, useSchedule } from './ScheduleContext';
import { mockRooms, mockSchedule } from '../mockData';

jest.mock('../services/scheduleService', () => ({
  fetchRooms: jest.fn(() => Promise.resolve(mockRooms.map(room => ({ id: room.roomId.toString(), name: room.title })))),
  fetchSchedule: jest.fn(() => Promise.resolve(Object.entries(mockSchedule).flatMap(([roomId, slots]) => {
    const groupedByDate = slots.reduce((acc, slot) => {
      const date = slot.startTime.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({ ...slot, roomId: parseInt(roomId) });
      return acc;
    }, {} as { [date: string]: any[] });

    return Object.entries(groupedByDate).map(([date, slots]) => ({
      date,
      slots,
    }));
  }))),
}));

const TestComponent: React.FC = () => {
  const { rooms, schedule } = useSchedule();

  return (
    <div>
      <div data-testid="rooms">{rooms.length}</div>
      <div data-testid="schedule">{schedule.length}</div>
    </div>
  );
};

test('provides rooms and schedule', async () => {
  const { getByTestId } = render(
    <ScheduleProvider>
      <TestComponent />
    </ScheduleProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('rooms').textContent).toBe('2');
  });
});
