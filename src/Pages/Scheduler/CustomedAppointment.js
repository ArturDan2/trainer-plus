import React from 'react';
import {
    Appointments,
  } from '@devexpress/dx-react-scheduler-material-ui';

  const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: "#41ab6b",
      }}
    >
      {children}
    </Appointments.Appointment>
  );
export default Appointment