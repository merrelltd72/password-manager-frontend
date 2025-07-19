import { useState } from 'react'
import { useLocation } from 'react-router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { toast } from "react-toastify";

const CreatePasswordReminder = () => {
  const location = useLocation()
  const { app_name } = location.state
  const [web_app_name, setWeb_app_name] = useState(app_name);
  const [reminderDate, setReminderDate] = useState(new Date());
  const [error, setError] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const reminder = { web_app_name, reminderDate };
    axios.post('/reminders', reminder)
    .then((response) => {
      console.log(response.data)
      toast.success(`Pasword reminder for ${web_app_name} created successfuly!`);
    })
    .catch((err) => {
      setError(err.message)
      toast.error(error)
    })
  }

  const beforeToday = (reminderDate) => new Date() < reminderDate

  return (
    <div className="container w-full h-full max-w-sm mt-4 mb-4">
    <form onSubmit={handleSubmit}
    className="bg-white shadow-md rounded-sm px-8 pt-6 pb-8 mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Account Name:
        <input type='text' value={web_app_name} onChange={(e) => setWeb_app_name(e.target.value)} />
      </label>
      <br />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Reminder Date:
        <DatePicker selected={reminderDate} inline filterDate={beforeToday} onChange={(date) => setReminderDate(date)} />
      </label>
      <br />
      <button type="submit" className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4">Create Reminder</button>
    </form>
    </div>
  )
}

export default CreatePasswordReminder