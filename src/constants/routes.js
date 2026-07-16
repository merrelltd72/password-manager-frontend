export const ROUTES = {
  home: "/",
  signup: "/signup",
  login: "/login",
  dashboard: "/dashboard",
  create: "/create",
  accounts: "/accounts",
  accountUpload: "/accountupload",
  generatePassword: "/generatepassword",
  profile: "/profile",
  createPasswordReminder: function (accountId) {
    return "/createpasswordreminder/" + accountId;
  },
};

export const AUTHENTICATED_NAV_ITEMS = [
  { to: ROUTES.dashboard, label: "Dashboard" },
  { to: ROUTES.accounts, label: "Accounts" },
  { to: ROUTES.create, label: "Create Account" },
  { to: ROUTES.generatePassword, label: "Generate Password" },
  { to: ROUTES.accountUpload, label: "Upload File" },
  { to: ROUTES.profile, label: "Profile" },
];

export const GUEST_NAV_ITEMS = [
  { to: ROUTES.signup, label: "Sign Up" },
  { to: ROUTES.login, label: "Login" },
];
