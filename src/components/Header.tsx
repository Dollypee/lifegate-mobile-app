import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const LOGO = require('../../assets/icon.png');

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: { icon: string; onPress: () => void };
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, showBack, onBack, rightAction }) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {
      backgroundColor: colors.surface,
      paddingTop: insets.top,
      borderBottomColor: colors.border,
    }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.surface}
      />
      {/* Brand accent line at very top */}
      <View style={[styles.accentLine, { backgroundColor: colors.accent }]} />

      <View style={styles.row}>
        {showBack ? (
          <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoWrap}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          </View>
        )}

        <View style={styles.titleArea}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{title}</Text>
          {subtitle
            ? <Text style={[styles.subtitle, { color: colors.textMuted }]} numberOfLines={1}>{subtitle}</Text>
            : null
          }
        </View>

        {rightAction ? (
          <TouchableOpacity onPress={rightAction.onPress} style={styles.iconBtn}>
            <Ionicons name={rightAction.icon as any} size={24} color={colors.accent} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderBottomWidth: 1, paddingBottom: 12 },
  accentLine: { height: 3 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10 },
  logoWrap: { width: 40, alignItems: 'center' },
  logo: { width: 34, height: 34, borderRadius: 8 },
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  titleArea: { flex: 1, marginHorizontal: 8 },
  title: { fontSize: 18, fontWeight: '700', letterSpacing: -0.3 },
  subtitle: { fontSize: 12, marginTop: 1 },
});
