
export const getData = async (q, setState, getDocs) => {
    const data = await getDocs(q);
    const converteddata = data.docs.map((doc) => ({...doc.data()}) )
    setState && setState(converteddata.map((event) => {
        const startDateTimestamp = event.startDate.seconds;
        const endDateTimestamp = event.endDate.seconds;
        const convertedStartDate = new Date (startDateTimestamp * 1000).toString()
        const convertedEndDate = new Date (endDateTimestamp * 1000).toString()
        return {...event, startDate: convertedStartDate, endDate: convertedEndDate}
    }));
   };