import { AuthProvider } from "../context/AuthContext";
import { UIProvider } from "../context/UIContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UIProvider>{children}</UIProvider>
    </AuthProvider>
  );
}
