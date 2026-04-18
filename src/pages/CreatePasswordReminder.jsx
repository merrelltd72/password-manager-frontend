import PasswordReminders from "../components/PasswordReminders";
import { useLocation } from "react-router";
import { useParams } from "react-router";

const CreatePasswordReminder = () => {
  const { state } = useLocation();
  const { accountId: accountIdParam } = useParams();
  const parsedAccountId = Number(accountIdParam);
  const accountId = Number.isFinite(parsedAccountId) ? parsedAccountId : null;
  const appName = state?.app_name;

  return (
    <main
      id="create-password-reminder"
      className="container mx-auto flex min-h-screen w-full items-center justify-center px-4 py-10"
    >
      <section className="w-full max-w-xl rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend text-xl">
            Create Password Reminder
          </legend>

          <p className="text-sm text-base-content/80">
            Select a date to create a password reminder.
          </p>

          {appName ? (
            <p className="mt-2 text-sm font-medium">Account Name: {appName}</p>
          ) : null}

          {!accountId ? (
            <div className="alert alert-warning mt-4">
              <span>
                Invalid account selected. Please go back to Accounts and choose
                an account.
              </span>
            </div>
          ) : (
            <div className="mt-4">
              <PasswordReminders accountId={accountId} />
            </div>
          )}
        </fieldset>
      </section>
    </main>
  );
};

export default CreatePasswordReminder;
