import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// ── Existing screens ──────────────────────────────────────────────────────────
import { HomeScreen } from '../screens/Home/HomeScreen';
import { SermonsScreen } from '../screens/Sermons/SermonsScreen';
import { BibleScreen } from '../screens/Bible/BibleScreen';
import { MusicScreen } from '../screens/Music/MusicScreen';
import { EventsScreen } from '../screens/Events/EventsScreen';
import { MembersScreen } from '../screens/Members/MembersScreen';
import { NotificationsScreen } from '../screens/Notifications/NotificationsScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { AudioBibleScreen } from '../screens/AudioBible/AudioBibleScreen';
import { MoreHubScreen } from '@/screens/MoreHub/MoreHubScreen';
import { LifeNewsScreen } from '@/screens/LifeNews/LifeNewsScreen';
import { AnnouncementsScreen } from '@/screens/LifeAnnouncements/LifeAnnouncements';
import { PrayerRequestsScreen } from '@/screens/PrayerRequests/PrayerRequestsScreen';
import { LifeClipScreen } from '@/screens/LifeClip/LifeClipScreen';
import { LifeSingersScreen } from '@/screens/LifeSingers/LifeSingersScreen';
import { LifePodcastsScreen } from '@/screens/LifePodcasts/LifePodcastsScreen';
import { LifeNewsArticleScreen } from '@/screens/LifeNews/LifenewsArticleScreen';

// ── New screens ───────────────────────────────────────────────────────────────


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ── Stacks ────────────────────────────────────────────────────────────────────
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Sermons" component={SermonsScreen} />
      <Stack.Screen name="Music" component={MusicScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="Bible" component={BibleScreen} />
      <Stack.Screen name="AudioBible" component={AudioBibleScreen} />
      <Stack.Screen name="Members" component={MembersScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

function BibleStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BibleMain" component={BibleScreen} />
      <Stack.Screen name="AudioBible" component={AudioBibleScreen} />
    </Stack.Navigator>
  );
}

function MoreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Hub — replaces SettingsMain as the More tab entry */}
      <Stack.Screen name="MoreHub" component={MoreHubScreen} />

      {/* Settings (reached from hub's gear icon) */}
      <Stack.Screen name="Settings" component={SettingsScreen} />

      {/* LifeNews */}
      <Stack.Screen name="LifeNews" component={LifeNewsScreen} />
      <Stack.Screen name="LifeNewsArticle" component={LifeNewsArticleScreen} />

      {/* Announcements */}
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />

      {/* Prayer Requests */}
      <Stack.Screen name="PrayerRequests" component={PrayerRequestsScreen} />

      {/* LifeClip */}
      <Stack.Screen name="LifeClip" component={LifeClipScreen} />

      {/* LifeSingers */}
      <Stack.Screen name="LifeSingers" component={LifeSingersScreen} />

      {/* LifePodcasts */}
      <Stack.Screen name="LifePodcasts" component={LifePodcastsScreen} />

      {/* Shared screens reachable from hub */}
      <Stack.Screen name="Members" component={MembersScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

// ── Tab icon ──────────────────────────────────────────────────────────────────
function TabIcon({ name, focused, color, size }: {
  name: any; focused: boolean; color: string; size: number;
}) {
  return (
    <View style={styles.tabIconWrap}>
      <Ionicons name={name} size={size} color={color} />
      {focused && <View style={[styles.activeDot, { backgroundColor: '#9D1C20' }]} />}
    </View>
  );
}

// ── Root navigator ────────────────────────────────────────────────────────────
export const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.tabBar,
            borderTopColor: colors.tabBarBorder,
            borderTopWidth: 1,
            height: 120,
            paddingBottom: 20,
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} color={color} size={size} />,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="BibleTab"
          component={BibleStack}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              <TabIcon name={focused ? 'book' : 'book-outline'} focused={focused} color={color} size={size} />,
            tabBarLabel: 'Bible',
          }}
        />
        <Tab.Screen
          name="SermonsTab"
          component={SermonsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              <TabIcon name={focused ? 'mic' : 'mic-outline'} focused={focused} color={color} size={size} />,
            tabBarLabel: 'Sermons',
          }}
        />
        <Tab.Screen
          name="EventsTab"
          component={EventsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              <TabIcon name={focused ? 'calendar' : 'calendar-outline'} focused={focused} color={color} size={size} />,
            tabBarLabel: 'Events',
          }}
        />
        <Tab.Screen
          name="MoreTab"
          component={MoreStack}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              <TabIcon name={focused ? 'grid' : 'grid-outline'} focused={focused} color={color} size={size} />,
            //  <TabIcon name={focused ? 'menu' : 'menu-outline'} focused={focused} color={color} size={size} />
            tabBarLabel: 'More',
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              const state = navigation.getState();
              const moreTab = state.routes.find(r => r.name === 'MoreTab');
              const moreStackState = moreTab?.state;

              // Only intercept if we're deeper than the root screen
              if (moreStackState && moreStackState.index! > 0) {
                e.preventDefault(); // stop default tab behaviour
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'MoreTab' }],
                });
              }
              // If already at root (index 0), let default behaviour run (no-op)
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconWrap: { alignItems: 'center', justifyContent: 'center' },
  activeDot: { width: 4, height: 4, borderRadius: 2, marginTop: 3 },
});