import { AuthProvider } from "../context/AuthContext";
import { UIProvider } from "../context/UIContext";
import { PaginationProvider } from "../context/PaginationContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UIProvider>
        <PaginationProvider>{children}</PaginationProvider>
      </UIProvider>
    </AuthProvider>
  );
}
