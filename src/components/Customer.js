import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Customer = ({customer, onDelete, updateCustomerDate }) => {

    const {_id, name, email, treatment, date, added, completed} = customer;
    const [updatedDate, setNewDate] = useState(new Date())
    const [edit, setEditMode] = useState(false);


    const formateDateTime = () => {
        const datePart = date.slice(0,10);
        const utcHouer = parseInt(date.slice(11,13))+2;
        const min = date.slice(13,16);
        const formatedDateTime = `${datePart} ${utcHouer.toString()}${min}`
        return formatedDateTime;
    }

    const changeDate = () => setEditMode(true);

    const updateDate = (date) => setNewDate(date);

    const saveNewDate =  (id, newDate) => {
        updateCustomerDate(newDate ,id)

        setTimeout(() => setEditMode(false) ,1000)


    }

    return (
        <div key={_id} className="customer__card">

            <p>Name: {name}</p>
            <p>email: {email}</p>
            <p>Treatment: {treatment}</p>
            {edit ?
<>
            <DatePicker
                        selected={updatedDate}
                        onChange={updateDate}
                        showTimeSelect
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeFormat="HH:mm"
                        minTime={new Date(new Date().setHours(7, 0))}
                        maxTime={new Date(new Date().setHours(21, 0))}
                        />
                <button className="btn bg--blue" onClick={() => saveNewDate(_id, updatedDate)}>Save</button></>
            :<p>{formateDateTime()}</p>}

            <p className="customer-added__date">Created: {added.slice(0,10)}</p>
            {edit ? '': <article className="btn-container"> <button className="btn bg--blue" onClick={changeDate}>Change Date</button>
            <button className="btn bg--red" onClick={()=>onDelete(_id)}>Remove</button> </article>}

        </div>
    )
}

export default Customer