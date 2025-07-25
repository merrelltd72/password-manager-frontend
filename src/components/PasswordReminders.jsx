import { useState, useEffect } from "react";
import consumer from "../cable";
import PropTypes from "prop-types";

const PasswordReminders = ({ accountId }) => {
  const [reminder, setReminder] = useState({
    dueDate: '',
    frequency: 'monthly'
  });

  useEffect(() => {
    const subscription = consumer.subscriptions.create('RemindersChannel', {
      connected() {
        console.log('Connected to reminders channel')
      },

      disconnected() {
        console.log('Disconnected from the reminders channel')
      },

      received(data) {
        if (data.status === 'success') {
          setReminder(prev => ({
            ...prev,
            id: Date.now
          }));
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    consumer.subscriptions.subscriptions[0].send({
      action: 'update_reminder',
      account_id: accountId,
      due_date: reminder.dueDate
    })
  }

   return (
    <div className="password-reminder">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="due-date">Due Date:</label>
          <input
            type="date"
            id="due-date"
            value={reminder.dueDate}
            onChange={(e) => setReminder({...reminder, dueDate: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="frequency">Frequency:</label>
          <select
            id="frequency"
            value={reminder.frequency}
            onChange={(e) => setReminder({...reminder, frequency: e.target.value})}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <button type="submit" className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-hidden focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save Reminder</button>
      </form>
    </div>
  );
}

PasswordReminders.prototype = {
  accountId: PropTypes.string.isRequired
}

PasswordReminders.defaultProps = {
  accountId: null
}

export default PasswordReminders