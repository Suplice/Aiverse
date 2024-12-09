import AppRouter from "./Components/AppRouter/AppRouter";
import { AuthProvider } from "./Utils/Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
