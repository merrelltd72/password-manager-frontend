import { useState } from 'react'
import { toast } from "react-toastify";
import axios from 'axios';

const PasswordUpdateReminderForm = () => {
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    /* Sending request to create a new reminder */
    try {
      const response = await axios.post('http://localhost:3000/reminders', {
        reminder_date: reminderDate,
        reminder_time: reminderTime,
       });
       if (response.data.message === 'Reminder set successfully'){
        toast.success('Reminder set successfully!')
       } else {
        toast.error('Failed to schedule reminder. Please try again.')
       }
    } catch (error) {
      if (error.response) {
        toast.error('Failed to schedule reminder. Please try again.')
      } else {
        toast.error('An error occurred. Please try again. If you continue to receive this message, please contact the system administrator.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Reminder Date:
          <input type='date' value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} />
        </label>
        <br />
        <label>
          Reminder Time:
          <input type='time' value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} />
        </label>
        <br />

        <button type="submit" disabled={isLoading}>Set Reminder</button>
      </div>
    </form>
  )
  
}

export default PasswordUpdateReminderForm