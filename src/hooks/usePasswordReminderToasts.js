import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { createPasswordRemindersSubscription } from "../utils/passwordRemindersSubscription";

export function usePasswordReminderToasts(accountId) {
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!accountId) return;

    subscriptionRef.current = createPasswordRemindersSubscription({
      onReminder(reminder) {
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
  }, [accountId]);

  const createReminder = (payload) => {
    console.log("Creating reminder with payload:", payload);
    subscriptionRef.current?.createReminder(payload);
  };

  return { createReminder };
}
