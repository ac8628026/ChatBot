import { useTheme } from '../ThemeContext';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <nav className={`${isDarkMode ? 'bg-stone-800' : 'bg-white'} p-4  shadow-md`}>
            <div className="container mx-auto flex  justify-between items-center">
                <a href="/" className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>
                    Chatbot
                </a>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => window.location.reload()}
                        className={`py-2 px-4 ${isDarkMode ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'}`}>
                        New chat
                    </button>
                    <button
                        onClick={toggleTheme}
                        className={`py-2 px-4 ${isDarkMode ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'}`}>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;