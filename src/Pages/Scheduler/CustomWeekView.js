import React from 'react';
import {
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';

const CustomWeekView = ({ children, style, data, ...restProps }) => {
  return (
    <WeekView.DayScaleCell {...restProps}
    style={{
      ...style,
    }}>
        {children}
    </WeekView.DayScaleCell>
  )
}

export default CustomWeekView