import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import frLocale from "moment/locale/fr";
import esLocale from "moment/locale/es";

import 'react-big-calendar/lib/css/react-big-calendar.css';

const CalendarPage = (props) => {
    moment.locale("es");
    const localizer = momentLocalizer(moment);

    return (
        <div style={{background: '#fbd997', opacity: 0.7}}>
            <Calendar
                localizer={localizer}
                // events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                onSelectSlot={(slotInfo) => {

                    console.log(slotInfo)
                }}
                selectable={true}

            />
        </div>
    );
};


export default CalendarPage;