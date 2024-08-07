import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Room, Schedule, ScheduleSlot } from '../interfaces';
import { fetchRooms, fetchSchedule } from '../services/scheduleService';

const ScheduleTable: React.FC = () => {
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

  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  const renderSchedule = (roomId: string) => {
    const slots = schedule.flatMap(day => day.slots.filter(slot => slot.roomId.toString() === roomId));
    const groupedSlots = groupByDate(slots);

    return Object.entries(groupedSlots).map(([date, slots]) => (
      <div key={date}>
        <h4 className="bg-secondary text-white p-2">{new Date(date).toLocaleDateString()}</h4>
        {slots.map((slot, index) => (
          <Card key={index} className="mb-2">
            <Card.Body>
              <Row>
                <Col sm={3} className="font-weight-bold">{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</Col>
                <Col sm={9}>{slot.players.map(player => player.name).join(' vs ') || slot.name}</Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
    ));
  };

  return (
    <Container>
      <h1 className="my-4">Schedule</h1>
      <Row>
        {rooms.map(room => (
          <Col key={room.id} md={6}>
            <h2 className="text-center">{room.name}</h2>
            {renderSchedule(room.id)}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ScheduleTable;
