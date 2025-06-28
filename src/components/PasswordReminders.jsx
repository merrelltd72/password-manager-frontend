import { useState, useEffect } from "react";
import cable from "../cable";

const PasswordReminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    cable.subscriptions.create('PasswordRemindersChannel', {
      received: (data) => {
        setReminders((prevReminders) => [...prevReminders, data]);
      },
    });
  }, []);

  return (
    <div>
      {reminders.map((reminder) => (
        <div key={reminder.id}>
          <p>Update password for {reminder.web_app_name}</p>
        </div>
      ))}
    </div>
  )
}

export default PasswordReminders