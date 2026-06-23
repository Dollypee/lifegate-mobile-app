import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Lifegate Brand Colors ────────────────────────────────────────────────────
// Primary Navy:  #203668
// Primary Red:   #9D1C20
// ─────────────────────────────────────────────────────────────────────────────

interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  card: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  // Brand primaries
  primary: string;       // Navy blue  #203668  (dominant)
  primaryDark: string;   // Darker navy
  primaryLight: string;  // Lighter navy tint
  accent: string;        // Deep red   #9D1C20  (accent / CTAs)
  accentDark: string;    // Darker red
  gold: string;          // Warm gold for featured/badges
  // UI chrome
  tabBar: string;
  tabBarBorder: string;
  inputBg: string;
  overlay: string;
  heroGradientStart: string;
  heroGradientEnd: string;
}

export const lightColors: ThemeColors = {
  background: '#F7F8FC',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF1F8',
  card: '#FFFFFF',
  border: '#D8DCE8',
  text: '#0E1526',
  textSecondary: '#2E3A55',
  textMuted: '#7A84A0',
  // Brand
  primary: '#203668',
  primaryDark: '#162550',
  primaryLight: '#2D4A8A',
  accent: '#9D1C20',
  accentDark: '#7A1418',
  gold: '#C89A1A',
  // UI
  tabBar: '#FFFFFF',
  tabBarBorder: '#D8DCE8',
  inputBg: '#EEF1F8',
  overlay: 'rgba(0,0,0,0.5)',
  heroGradientStart: '#0E1E45',
  heroGradientEnd: '#203668',
};

export const darkColors: ThemeColors = {
  background: '#080C18',
  surface: '#0F1628',
  surfaceAlt: '#162035',
  card: '#131C30',
  border: '#1E2A42',
  text: '#E8EAF2',
  textSecondary: '#A8B2CC',
  textMuted: '#5A6480',
  // Brand — slightly brightened for dark bg
  primary: '#2D4A8A',
  primaryDark: '#203668',
  primaryLight: '#3D5EA8',
  accent: '#B52228',
  accentDark: '#9D1C20',
  gold: '#D4A820',
  // UI
  tabBar: '#0F1628',
  tabBarBorder: '#1E2A42',
  inputBg: '#162035',
  overlay: 'rgba(0,0,0,0.75)',
  heroGradientStart: '#050A14',
  heroGradientEnd: '#0E1E45',
};

interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('lifegate_theme').then((val) => {
      if (val === 'dark') setIsDark(true);
    });
  }, []);

  const toggleTheme = async () => {
    const newVal = !isDark;
    setIsDark(newVal);
    await AsyncStorage.setItem('lifegate_theme', newVal ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, colors: isDark ? darkColors : lightColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
