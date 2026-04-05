import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePasswordReminderToasts } from "../hooks/usePasswordReminderToasts";

export default function PasswordReminders({ accountId }) {
  const [reminderDate, setReminderDate] = useState(null);
  const { reminders, createReminder } = usePasswordReminderToasts(accountId);

  const handleSubmit = () => {
    if (!reminderDate) return;
    createReminder({ account_id: accountId, reminder_date: reminderDate });
    setReminderDate(null);
  };

  return (
    <div>
      <DatePicker
        selected={reminderDate}
        onChange={(date) => setReminderDate(date)}
        minDate={new Date()}
        placeholderText="Select a date to set a password reminder"
      />
      <button onClick={handleSubmit} disabled={!reminderDate}>
        Create Reminder
      </button>
    </div>
  );
}
