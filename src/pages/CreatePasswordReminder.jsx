import PasswordReminders from "../components/PasswordReminders";
import heroBg from "../assets/images/smoke-blue-background.jpg";
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
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-blue-900/55 to-slate-900/75" />

      <section className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-24 sm:px-6">
        <div className="w-full max-w-xl rounded-2xl border border-white/30 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md sm:p-8">
          <p className="mb-3 inline-block rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-blue-100">
            Security Workflow
          </p>

          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
            Create Password Reminder
          </h1>

          <p className="mt-3 text-sm text-blue-100 sm:text-base">
            Schedule a reminder date so you can rotate credentials on time.
          </p>

          {appName ? (
            <p className="mt-2 text-xs font-medium text-blue-100/90">
              Account: {appName}
            </p>
          ) : null}

          {!accountId ? (
            <p className="mt-3 rounded-lg border border-amber-200/40 bg-amber-100/15 px-3 py-2 text-sm text-amber-100">
              Invalid account selected. Go back to Accounts and choose an
              account before creating a reminder.
            </p>
          ) : null}

          <div className="mt-6 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-white/35 [&_input]:bg-white/95 [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-sm [&_input]:text-slate-800 [&_input]:outline-none [&_input]:ring-blue-500/30 [&_input]:transition [&_input]:focus:ring-2 [&_button]:mt-3 [&_button]:inline-flex [&_button]:items-center [&_button]:justify-center [&_button]:rounded-lg [&_button]:border [&_button]:border-blue-500 [&_button]:bg-blue-500 [&_button]:px-4 [&_button]:py-2 [&_button]:text-sm [&_button]:font-semibold [&_button]:text-white [&_button]:transition [&_button]:hover:bg-blue-600 [&_button]:disabled:cursor-not-allowed [&_button]:disabled:opacity-50">
            <PasswordReminders accountId={accountId} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreatePasswordReminder;
