import { useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";

const CreatePasswordReminderPage = () => {
  const [web_app_name, setWeb_app_name] = useState('');
  const [reminderDate, setReminderDate] = useState('');
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

  return (
    <div className="container w-full max-w-sm mt-4">
    <form onSubmit={handleSubmit}
    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Account Name:
        <input type='text' value={web_app_name} onChange={(e) => setWeb_app_name(e.target.value)} />
      </label>
      <br />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Reminder Date:
        <input type="datetime" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Reminder</button>
    </form>
    </div>
  )
}

export default CreatePasswordReminderPage