import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { SAMPLE_NOTIFICATIONS } from '../../data/sampleData';
import { NotificationItem } from '../../types';

const TYPE_ICONS: Record<string, { name: string; color: string }> = {
  sermon: { name: 'mic', color: '#4F7FFF' },
  event: { name: 'calendar', color: '#F59E0B' },
  announcement: { name: 'megaphone', color: '#10B981' },
  devotional: { name: 'book', color: '#8B5CF6' },
};

interface Props { navigation: any; }

export const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState<NotificationItem[]>(SAMPLE_NOTIFICATIONS);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
        rightAction={unreadCount > 0 ? { icon: 'checkmark-done', onPress: markAllRead } : undefined}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 10 }}>
        {notifications.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No notifications yet</Text>
          </View>
        )}
        {notifications.map(item => {
          const icon = TYPE_ICONS[item.type] || TYPE_ICONS.announcement;
          return (
            <TouchableOpacity key={item.id} onPress={() => markRead(item.id)} activeOpacity={0.8}>
              <Card elevated style={!item.isRead ? { borderLeftWidth: 3, borderLeftColor: colors.primary } : {}}>
                <View style={styles.row}>
                  <View style={[styles.iconWrap, { backgroundColor: icon.color + '20' }]}>
                    <Ionicons name={icon.name as any} size={22} color={icon.color} />
                  </View>
                  <View style={styles.content}>
                    <View style={styles.topRow}>
                      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
                      {!item.isRead && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
                    </View>
                    <Text style={[styles.body, { color: colors.textSecondary }]} numberOfLines={2}>{item.body}</Text>
                    <View style={styles.bottom}>
                      <Badge label={item.type} type={item.type} small />
                      <Text style={[styles.date, { color: colors.textMuted }]}>
                        {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  iconWrap: { width: 46, height: 46, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, gap: 4 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { flex: 1, fontSize: 14, fontWeight: '700' },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },
  body: { fontSize: 13, lineHeight: 18 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  date: { fontSize: 11 },
  empty: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontSize: 15 },
});
