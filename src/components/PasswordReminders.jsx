import { useState, useEffect, useRef } from "react";
import { createConsumer } from "@rails/actioncable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { data } from "autoprefixer";

const cableUrl = `${import.meta.env.VITE_CABLE_URL}` || "ws://localhost:3000/cable";

const consumer = createConsumer(cableUrl);

export default function PasswordReminders() {
  const [reminders, setReminders] = useState([]);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    subscriptionRef.current = consumer.subscriptions.create(
      { channel: "PasswordRemindersChannel" },
      {
        connected() {
          console.log("Connected to PasswordRemindersChannel");
        },

        disconnected() {
          console.log("Disconnected from PasswordRemindersChannel");
        },

        received(data) {
          if (data.error) {
            console.error(data.error);
            return;
          }

          if (data.reminder) {
            setReminders((current) => [data.reminder, ...current]);
          }
        },
      },
    );

    return () => {
      subscriptionRef.current?.unsubscribe();
    };
  }, []);

  const createReminder = (accountId, reminderDate) => {
    subscriptionRef.current?.perform("create", {
      account_id: accountId,
      reminder_date: reminderDate,
    });
  };

  return (
    <div>
      <button onClick={() => createReminder(data.accountId, "2026-03-30")}>
        Create Reminder
      </button>

      <ul>
        {reminders.map((reminder, index) => (
          <li key={reminder.id ?? index}>
            Account: {reminder.account_id} | Date: {reminder.reminder_date}
          </li>
        ))}
      </ul>
    </div>
  );
}
