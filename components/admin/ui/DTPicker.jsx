import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker'


import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import styled from '@emotion/styled';
import { useState } from 'react';

export const DTPicker = ({ value, onChangePublishedAt, label = "Fecha y hora" }) => {

    const [openCalendar, setOpenCalendar] = useState(false)

    const onChangeDateTime = (value) => {
        onChangePublishedAt(value)
        setOpenCalendar(false)

    }

    return (
        <>
            <p className="font-medium">{ label }</p>
            <DateTimePickerContainer className='flex justify-between items-center rounded-md border py-5 px-4 w-full'>

                <DateTimePicker 
                    onChange={onChangeDateTime} 
                    value={value || new Date()} 
                    locale="es-ES"
                    format="dd MMM yyyy ⌚ hh:mm a"
                    disableClock={true}
                    disableCalendar={!openCalendar}
                    isCalendarOpen={openCalendar}
                    className="absolute w-full"
                />
                <div className='flex items-center mt-1'>
                    <button className='text-5xl mr-2' onClick={()=>onChangePublishedAt(null)} >
                        <i className='bx bx-x' ></i>
                    </button>
                    <button className='text-4xl' onClick={()=>setOpenCalendar(!openCalendar)} >
                        <i className='bx bx-calendar'></i>
                    </button>
                </div>
                
            </DateTimePickerContainer>
        </>
    )
}


const DateTimePickerContainer = styled.div`

    .react-datetime-picker__wrapper {
        border:none;
        font-size: 1.4rem;
        button {
            display: none;
        }
    }

    .react-datetime-picker__calendar {
        max-width: 30rem;
    }

    @media screen and (min-width: 960px) {
        .react-datetime-picker__wrapper {
        border:none;
        font-size: 1.5rem;
            button {
                display: none;
            }
        }

        .react-datetime-picker__calendar {
            max-width: 35rem;
        }
    }
`