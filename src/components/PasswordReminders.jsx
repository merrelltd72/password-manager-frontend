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
      <label className="label block text-gray-600 text-lg font-bold mb-0">
        Reminder Date:
      </label>
      <DatePicker
        selected={reminderDate}
        onChange={(date) => setReminderDate(date)}
        minDate={new Date()}
        placeholderText="Select a date to set a password reminder"
        className="input shadow appearance-none border rounded-sm w-full py-1 px-3 text-gray-600 leading-tight focus:outline-hidden focus:shadow-outline"
      />
      <button
        onClick={handleSubmit}
        disabled={!reminderDate || !accountId}
        className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Create Reminder
      </button>
    </div>
  );
}
