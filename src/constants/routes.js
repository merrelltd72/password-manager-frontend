export const ROUTES = {
  home: "/",
  signup: "/signup",
  login: "/login",
  create: "/create",
  accounts: "/accounts",
  accountUpload: "/accountupload",
  generatePassword: "/generatepassword",
  createPasswordReminder: function (accountId) {
    return "/createpasswordreminder/" + accountId;
  },
};

export const AUTHENTICATED_NAV_ITEMS = [
  { to: ROUTES.accounts, label: "Accounts" },
  { to: ROUTES.create, label: "Create Account" },
  { to: ROUTES.generatePassword, label: "Generate Password" },
  { to: ROUTES.accountUpload, label: "Upload File" },
];

export const GUEST_NAV_ITEMS = [
  { to: ROUTES.signup, label: "Sign Up" },
  { to: ROUTES.login, label: "Login" },
];
