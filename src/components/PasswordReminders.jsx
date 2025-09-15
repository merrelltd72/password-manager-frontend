import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import consumer from "../cable";
import PropTypes from "prop-types";

const PasswordReminders = ({ accountId }) => {
  const [reminder, setReminder] = useState({
    dueDate: new Date(),
    frequency: 'monthly'
  });
  const subscriptionRef = useRef(null);

  useEffect(() => {
     subscriptionRef.current = consumer.subscriptions.create('PasswordRemindersChannel', {
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
      subscriptionRef.current?.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*Wait for subscription to be established*/
    while (!subscriptionRef.current?.subscriptions[0]) {
      console.log('Waiting for subscription...');
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    subscriptionRef.current.subscriptions[0].send({
      action: 'update_reminder',
      account_id: accountId,
      due_date: reminder.dueDate.toISOString().split('T')[0]
    })
  }

   return (
    <div className="password-reminder">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="due-date">Due Date:</label>
          <DatePicker id="due-date" selected={reminder.dueDate} 
          onChange={(date) => setReminder({...reminder, dueDate: date})}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          showDisabledMonthNavigation
          isClearable
          placeholderText="Select due date"
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
        <button type="submit" className="btn">Save Reminder</button>
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