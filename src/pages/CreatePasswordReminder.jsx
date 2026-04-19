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
    <main id="create-password-reminder" className="app-page-center">
      <section className="app-card max-w-xl">
        <fieldset className="app-fieldset">
          <legend className="app-fieldset-legend">
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
