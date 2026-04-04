import { useEffect, useRef, useState } from "react";
import { createPasswordRemindersSubscription } from "../utils/passwordRemindersSubscription";

export function usePasswordReminderToasts() {
  const subscriptionRef = useRef(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    subscriptionRef.current = createPasswordRemindersSubscription({
      onReminder(reminder) {
        const toast = {
          id: `${reminder.id}-${Date.now()}`,
          type: "success",
          title: "Password reminder",
          message: `Reminder scheduled for account #${reminder.account_id} on ${reminder.reminder_date}`,
        };

        setToasts((current) => [...current, toast]);

        window.setTimeout(() => {
          setToasts((current) =>
            current.filter((item) => item.id !== toast.id),
          );
        }, 5000);
      },

      onError(message) {
        const toast = {
          id: `error-${Date.now()}`,
          type: "error",
          title: "Reminder error",
          message,
        };

        setToasts((current) => [...current, toast]);

        window.setTimeout(() => {
          setToasts((current) =>
            current.filter((item) => item.id !== toast.id),
          );
        }, 5000);
      },
    });

    return () => {
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = null;
    };
  }, []);

  const createReminder = (payload) => {
    subscriptionRef.current?.createReminder(payload);
  };

  const dismissToast = (id) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  };

  return {
    toasts,
    createReminder,
    dismissToast,
  };
}
