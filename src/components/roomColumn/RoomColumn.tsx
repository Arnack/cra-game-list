import React, { memo } from 'react';
import { Col } from 'react-bootstrap';
import { ScheduleSlot } from '../../model/interfaces';
import ScheduleSlotComponent from '../scheduleSlot/ScheduleSlot';
import styles from './RoomColumn.module.scss';

interface RoomColumnProps {
  roomId: string;
  roomName: string;
  slots: ScheduleSlot[];
}

const RoomColumn: React.FC<RoomColumnProps> = memo(({ roomName, slots }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const groupByDate = (slots: ScheduleSlot[]) => {
    return slots.reduce((acc, slot) => {
      const date = slot.startTime.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(slot);
      return acc;
    }, {} as { [date: string]: ScheduleSlot[] });
  };

  const groupedSlots = groupByDate(slots);

  return (
    <Col md={6} className={styles['room-column']}>
      <h3>{roomName}</h3>
      {Object.entries(groupedSlots).map(([date, slots]) => (
        <div key={date}>
          <h4 className={styles['date-header']}>{formatDate(date)}</h4>
          {slots.map((slot) => (
            <ScheduleSlotComponent key={slot.startTime} slot={slot} />
          ))}
        </div>
      ))}
    </Col>
  );
});

export default RoomColumn;
