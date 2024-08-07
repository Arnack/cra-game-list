import React, { memo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { ScheduleSlot } from '../../model/interfaces';
import styles from './ScheduleSlot.module.scss';

interface ScheduleSlotProps {
  slot: ScheduleSlot;
}

const ScheduleSlotComponent: React.FC<ScheduleSlotProps> = memo(({ slot }) => {
  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className={styles['schedule-slot']}>
      <Card.Body>
        <Row>
          <Col sm={3} className={styles['font-weight-bold']}>
            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
          </Col>
          <Col sm={9}>{slot.players.map((player) => player.name).join(' vs ') || slot.name}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
});

export default ScheduleSlotComponent;
