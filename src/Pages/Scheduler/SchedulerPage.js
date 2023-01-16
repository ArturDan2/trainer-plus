import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
  DateNavigator,
  TodayButton,
  Resources,
  AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';

import { messages } from './FormMessages';
import {DateEditor} from './DateEditor';
import CustomWeekView from './CustomWeekView';
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { resourcesData } from './resources';
import {collection, getDocs, query, updateDoc, doc, setDoc, deleteDoc} from "firebase/firestore";
import { db } from '../../Firestore/firestore';
import uniqid from 'uniqid';





const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'cursive',
    ].join(','),
  }
});

export const SchedulerPage =  React.forwardRef((props, ref) => {

  const [data, setData] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [resources, setResources] = useState([{
    fieldName: 'typeId',
    title: 'Typ zajęcia',
    instances: resourcesData,
  }])
  const [schedulerHeight, setSchedulerHeight] = useState();
  const eventsCollectionRef = collection(db, "scheduler-events");
  const q = query(eventsCollectionRef);

  const getData = async (query) => {
    const fetcheddata = await getDocs(query);
    const converteddata = fetcheddata.docs.map((doc) => ({...doc.data()}));
    const data = converteddata.map((event) => {
      const startDateTimestamp = event.startDate.seconds;
      const endDateTimestamp = event.endDate.seconds;
      const convertedStartDate = new Date (startDateTimestamp * 1000).toString()
      const convertedEndDate = new Date (endDateTimestamp * 1000).toString()
      return {...event, startDate: convertedStartDate, endDate: convertedEndDate}
  })
    return data
  };

  useEffect(() => {
    getData(q).then((result) => {
      setData(result)
    })
  }, []);

  useEffect(() => {
    const navHeight = ref.current.children[0].offsetHeight;
    const appHeight = ref.current.offsetHeight;
    setSchedulerHeight(appHeight - navHeight)
  }, [window.innerHeight])

  const addData = async (added) => {
    const id = uniqid();
    try {
      const docRef = await setDoc(doc(db, "scheduler-events", id),{
        ...added, id: id,
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const changeData = async (changed) => {
    const id = Object.keys(changed)[0]
    const docReff = doc(db, "scheduler-events", id);
    await updateDoc(docReff, changed[id]);
  }

  const deleteData = async(deleted) => {
    await deleteDoc(doc(db, "scheduler-events", deleted));
  }

  const commitChanges = ({ added, changed, deleted }) => {
      if (added) {
        if(added.startDate - added.endDate > 0) return;
        const event = {...added}
        addData(event)
        setData([...data, event]);
      }
      if (changed) {
        if(changed.startDate - changed.endDate > 0) return;
        changeData(changed)
        setData(data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
      }
      if (deleted !== undefined){
        deleteData(deleted)
        setData(data.filter(appointment => appointment.id !== deleted))
      }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Scheduler
        data={data}
        height={schedulerHeight}
        locale="pl-PL"
        >
        <ViewState
          defaultCurrentDate={currentDate}
          defaultCurrentViewName="Month"
        />
        <EditingState
            onCommitChanges={commitChanges}
        />
        <IntegratedEditing />
        <WeekView
          startDayHour={9}
          endDayHour={22}
          displayName="Tydzień"
          dayScaleCellComponent={CustomWeekView}
        />
        <DayView
          startDayHour={9}
          endDayHour={22}
          displayName="Dzień"
        />
        <MonthView
          startDayHour={9}
          endDayHour={22}
          displayName="Miesiąc"
        />
        <AllDayPanel/>
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator/>
        <TodayButton messages={{today: "Dziś"}}/>
        <Appointments/>
        <AppointmentTooltip
          showOpenButton
          showDeleteButton
        />
        <AppointmentForm
        messages={messages}
        dateEditorComponent={DateEditor}
        />
         <Resources
            data={resources}
            mainResourceName="typeId"
          />
        </Scheduler>
      </Paper>
    </ThemeProvider>
  )
  })

