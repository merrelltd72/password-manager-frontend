import consumer from "./consumer";

export function createPasswordRemindersSubscription({
  onReminder,
  onError,
  onConnected,
  onDisconnected,
} = {}) {
  return consumer.subscriptions.create(
    { channel: "PasswordRemindersChannel" },
    {
      connected() {
        onConnected?.();
      },

      disconnected() {
        onDisconnected?.();
      },

      received(data) {
        if (data.error) {
          onError?.(data.error);
          return;
        }

        if (data.reminder) {
          onReminder?.(data.reminder);
        }
      },

      createReminder(payload) {
        this.perform("create", payload);
      },
    },
  );
}
