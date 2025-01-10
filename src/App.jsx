import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import { ThemeProvider, useTheme } from "./ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`${isDarkMode ? 'bg-stone-900' : 'bg-gray-100'} h-screen flex flex-col justify-center`}>
      <Navbar />
      <Chatbot /> 
    </div>
  );
};

export default App;