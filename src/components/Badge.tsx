import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const categoryColors: Record<string, string> = {
  service: '#4F7FFF',
  fellowship: '#10B981',
  outreach: '#F59E0B',
  youth: '#8B5CF6',
  prayer: '#EF4444',
  special: '#EC4899',
  sermon: '#4F7FFF',
  event: '#F59E0B',
  announcement: '#10B981',
  devotional: '#8B5CF6',
};

interface BadgeProps {
  label: string;
  type?: string;
  small?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ label, type, small }) => {
  const color = type ? (categoryColors[type] || '#6B7280') : '#6B7280';
  return (
    <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color + '44' }]}>
      <Text style={[styles.text, { color, fontSize: small ? 10 : 12 }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: { fontWeight: '600', textTransform: 'capitalize' },
});
