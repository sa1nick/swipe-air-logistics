import {useState, useEffect} from 'react';
import {Appearance} from 'react-native';

/**
 * Custom hook to track and update the theme (light/dark mode).
 * @returns {string} The current theme ('light' or 'dark').
 */
const useCustomTheme = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme()); // Initial theme

  useEffect(() => {
    // Listener to detect theme changes
    const themeListener = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme); // Update the theme state
    });

    return () => themeListener.remove(); // Cleanup the listener on unmount
  }, []);

  return theme;
};

export default useCustomTheme;
