import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSchedule } from '../context/ScheduleContext';
import RoomColumn from './RoomColumn';
import styles from './ScheduleTable.module.scss';

const ScheduleTable: React.FC = () => {
  const { rooms, schedule } = useSchedule();

  const groupByRoom = (roomId: string) => {
    return schedule.flatMap((day) => day.slots.filter((slot) => slot.roomId.toString() === roomId));
  };

  return (
    <Container className={styles['schedule-container']}>
      <h1 className={`${styles['schedule-title']} my-4`}>Schedule</h1>
      <Row>
        {rooms.map((room) => (
          <RoomColumn key={room.id} roomId={room.id} roomName={room.name} slots={groupByRoom(room.id)} />
        ))}
      </Row>
    </Container>
  );
};

export default ScheduleTable;
