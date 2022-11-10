import React from 'react';
import { resourcesData } from '../../Scheduler/resources';
import { dateFormater } from '../../../GlobalFunctionality/dateFormater';

const EventBar = ({event}) => {
    const {title, startDate, typeId} = event

    const convertedDate = new Date (startDate.seconds * 1000)

    const getColor = () => {
        let color
        resourcesData.map((object) => {
            if(object.id === typeId){
                color = object.color
                return color
            }
        })
        return color
    } //synchronising widget with scheduler events colors

    return (
    <div style={{backgroundColor: getColor()}} className="bar event flex-col">
        <h3>{title}</h3>
        <div className="flex-row space-between">
            <h4>{dateFormater(convertedDate.getDate())}.{dateFormater(convertedDate.getMonth())}.{convertedDate.getFullYear()}</h4>
            <h5>{dateFormater(convertedDate.getHours())}:{dateFormater(convertedDate.getMinutes())}</h5>
        </div>
    </div>
  )
}

export default EventBar