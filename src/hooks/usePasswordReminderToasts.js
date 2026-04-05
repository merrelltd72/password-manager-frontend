import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { createPasswordRemindersSubscription } from "../utils/passwordRemindersSubscription";

export function usePasswordReminderToasts(accountId) {
  const [reminders, setReminders] = useState([]);
  const subscriptionRef = useRef(null);

  const fetchReminders = useCallback(() => {
    if (!accountId) return;
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/accounts/${accountId}/password_reimders.json`,
      )
      .then((res) => setReminders(res.data));
  }, [accountId]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  useEffect(() => {
    subscriptionRef.current = createPasswordRemindersSubscription({
      onReminder(reminder) {
        setReminders((current) => [...current, reminder]);
        toast.success(
          `Reminder scheduled for account #${reminder.account_id} on ${reminder.reminder_date}`,
        );
      },
      onError(message) {
        toast.error(`Error: ${message}`);
      },
    });

    return () => {
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = null;
    };
  }, [fetchReminders]);

  const createReminder = (payload) => {
    subscriptionRef.current?.createReminder(payload);
  };

  return {
    reminders,
    createReminder,
  };
}
