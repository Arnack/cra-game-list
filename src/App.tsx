import React from 'react';
import { Container } from 'react-bootstrap';
import ScheduleTable from './components/ScheduleTable';
import { ScheduleProvider } from './context/ScheduleContext';
import './App.css';

const App: React.FC = () => {
  return (
    <ScheduleProvider>
      <Container>
        <h1 className="my-4 text-center">Schedule</h1>
        <ScheduleTable />
      </Container>
    </ScheduleProvider>
  );
};

export default App;
