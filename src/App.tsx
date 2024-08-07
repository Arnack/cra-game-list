import React from 'react';
import { Container } from 'react-bootstrap';
import ScheduleTable from './components/ScheduleTable/ScheduleTable';
import { ScheduleProvider } from './context/ScheduleContext';
import './App.css';

const App: React.FC = () => {
  return (
    <ScheduleProvider>
      <Container>
        <ScheduleTable />
      </Container>
    </ScheduleProvider>
  );
};

export default App;
