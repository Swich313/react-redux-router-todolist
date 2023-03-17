import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import './Calendar.sass';

const localizer = momentLocalizer(moment)

const CalendarPage = (props) => {
    return (
        <div style='height: 100%'>
            <Calendar
                localizer={localizer}
                // events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};


export default CalendarPage;