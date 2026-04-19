import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePasswordReminderToasts } from "../hooks/usePasswordReminderToasts";

export default function PasswordReminders({ accountId }) {
  const [reminderDate, setReminderDate] = useState(null);
  const { createReminder } = usePasswordReminderToasts(accountId);

  const handleSubmit = () => {
    if (!reminderDate || !accountId) return;
    createReminder({ account_id: accountId, reminder_date: reminderDate });
    setReminderDate(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="app-label mb-0">Reminder Date:</label>
      <DatePicker
        selected={reminderDate}
        onChange={(date) => setReminderDate(date)}
        minDate={new Date()}
        placeholderText="Select a date to set a password reminder"
        className="app-input"
      />
      <button
        onClick={handleSubmit}
        disabled={!reminderDate || !accountId}
        className="app-btn-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        Create Reminder
      </button>
    </div>
  );
}
