import React from 'react';
import ScheduleTable from './components/ScheduleTable';
import { Container } from 'react-bootstrap';
import './App.css';

const App: React.FC = () => {
  return (
    <Container>
      <h1 className="my-4 text-center">Schedule</h1>
      <ScheduleTable />
    </Container>
  );
};

export default App;
