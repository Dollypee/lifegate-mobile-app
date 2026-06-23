
// import React from 'react';
// import {
//   View, Text, ScrollView, TouchableOpacity, Dimensions
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { useTheme } from '../../context/ThemeContext';
// import { Card } from '../../components/Card';
// import { Badge } from '../../components/Badge';
// import { SAMPLE_SERMONS, SAMPLE_EVENTS } from '../../data/sampleData';
// import { DAILY_VERSE } from '../../data/bibleVerses';

// const { width } = Dimensions.get('window');
// const quickItemSize = (width - 56) / 3;

// interface Props { navigation: any; }

// export const HomeScreen: React.FC<Props> = ({ navigation }) => {
//   const { colors, isDark, toggleTheme } = useTheme();
//   const insets = useSafeAreaInsets();
//   const featured = SAMPLE_SERMONS.find(s => s.isFeatured) || SAMPLE_SERMONS[0];
//   const upcoming = SAMPLE_EVENTS.slice(0, 2);

//   return (
//     <View className="flex-1" style={{ backgroundColor: colors.background }}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       >
//         {/* Header */}
//         <LinearGradient
//           colors={isDark ? ['#1A0800', '#0F0D0B'] : ['#7B1A00', '#C8400A']}
//           start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
//           // className="px-5 pb-7"
//           style={{ paddingTop: insets.top + 16 }}
//         >
//           <View className="flex-row justify-between items-center mb-5 px-5">
//             <View className="flex-row items-center gap-2.5">
//               <View className="w-10 h-10 rounded-[10px] bg-white/20 justify-center items-center">
//                 <Text className="text-white font-black text-sm">LG</Text>
//               </View>
//               <View>
//                 <Text className="text-white font-black text-base tracking-[2px]">LIFEGATE</Text>
//                 <Text className="text-white/70 text-[11px] tracking-wide">Outreach Center</Text>
//               </View>
//             </View>
//             <TouchableOpacity onPress={toggleTheme} className="w-10 h-10 rounded-full bg-white/15 justify-center items-center">
//               <Ionicons name={isDark ? 'sunny' : 'moon'} size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <View className="px-5 pb-7">
//             <Text className="text-white/80 text-sm">Good {getGreeting()},</Text>
//             <Text className="text-white text-[26px] font-extrabold tracking-tight">Welcome back 🙏</Text>
//             <Text className="text-white/65 text-[13px] mt-1">
//               {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
//             </Text>
//           </View>
//         </LinearGradient>

//         {/* Daily Verse */}
//         <View className="px-4 mt-5">
//           <Card elevated style={{ backgroundColor: colors.primary + '11', borderColor: colors.primary + '33' }}>
//             <View className="flex-row items-center gap-1.5 mb-2.5">
//               <Ionicons name="book" size={18} color={colors.primary} />
//               <Text className="font-bold text-sm" style={{ color: colors.primary }}>Verse of the Day</Text>
//             </View>
//             <Text className="text-[15px] leading-6 italic mb-2" style={{ color: colors.text }}>
//               "{DAILY_VERSE.text}"
//             </Text>
//             <Text className="text-[13px] font-medium" style={{ color: colors.textMuted }}>
//               — {DAILY_VERSE.reference} ({DAILY_VERSE.version})
//             </Text>
//           </Card>
//         </View>

//         {/* Quick Access */}
//         <View className="px-4 mt-5">
//           <Text className="text-lg font-bold tracking-tight mb-3" style={{ color: colors.text }}>
//             Quick Access
//           </Text>
//           <View className="flex-row flex-wrap gap-3">
//             {[
//               { icon: 'mic', label: 'Sermons', color: '#4F7FFF', screen: 'Sermons', action: () => navigation.getParent()?.navigate('SermonsTab') },
//               // { icon: 'musical-notes', label: 'Music', color: '#10B981', screen: 'Music', action: () => navigation.navigate('Music') },
//               { icon: 'calendar', label: 'Events', color: '#F59E0B', screen: 'Events', action: () => navigation.getParent()?.navigate('EventsTab') },
//               { icon: 'book-outline', label: 'Bible', color: '#8B5CF6', screen: 'Bible', action: () => navigation.getParent()?.navigate('BibleTab') },
//               { icon: 'headset', label: 'Audio Bible', color: '#EF4444', screen: 'AudioBible', action: () => navigation.navigate('AudioBible') },
//               { icon: 'person-add', label: 'Join Us', color: '#EC4899', screen: 'Members',  action: () => navigation.navigate('Members') },
//             ].map((item) => (
//               <TouchableOpacity
//                 key={item.label}
//                 className="rounded-2xl border flex-col items-center justify-center gap-1.5"
//                 style={{
//                   width: quickItemSize,
//                   aspectRatio: 1,
//                   backgroundColor: colors.card,
//                   borderColor: colors.border,
//                   minHeight: 100,
//                 }}
//                 onPress={item.action}
//                 activeOpacity={0.75}
//               >
//                 <View
//                   className="w-12 h-12 rounded-[14px] justify-center items-center"
//                   style={{ backgroundColor: item.color + '22' }}
//                 >
//                   <Ionicons name={item.icon as any} size={24} color={item.color} />
//                 </View>
//                 <Text className="text-xs font-semibold" style={{ color: colors.textSecondary }}>
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Featured Sermon */}
//         <View className="px-4 mt-5">
//           <View className="flex-row justify-between items-center mb-3">
//             <Text className="text-lg font-bold tracking-tight" style={{ color: colors.text }}>
//               Latest Sermon
//             </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Sermons')}>
//               <Text className="text-sm font-semibold" style={{ color: colors.primary }}>See all</Text>
//             </TouchableOpacity>
//           </View>
//           <Card onPress={() => navigation.navigate('Sermons')} elevated style={{ padding: 0, overflow: 'hidden' }}>
//             <View className="flex-row">
//               <View
//                 className="w-[100px] h-[100px] justify-center items-center"
//                 style={{ backgroundColor: colors.primary + '22' }}
//               >
//                 <Ionicons name="play-circle" size={48} color={colors.primary} />
//               </View>
//               <View className="flex-1 p-3.5 gap-1">
//                 <Badge label={featured.series || 'Message'} type="sermon" small />
//                 <Text
//                   className="text-[15px] font-bold leading-5"
//                   style={{ color: colors.text }}
//                   numberOfLines={2}
//                 >
//                   {featured.title}
//                 </Text>
//                 <Text className="text-xs" style={{ color: colors.textMuted }}>
//                   {featured.preacher}
//                 </Text>
//                 <View className="flex-row items-center gap-1">
//                   <Ionicons name="time-outline" size={12} color={colors.textMuted} />
//                   <Text className="text-xs" style={{ color: colors.textMuted }}>
//                     {featured.duration}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </Card>
//         </View>

//         {/* Upcoming Events */}
//         <View className="px-4 mt-5">
//           <View className="flex-row justify-between items-center mb-3">
//             <Text className="text-lg font-bold tracking-tight" style={{ color: colors.text }}>
//               Upcoming Events
//             </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Events')}>
//               <Text className="text-sm font-semibold" style={{ color: colors.primary }}>See all</Text>
//             </TouchableOpacity>
//           </View>
//           {upcoming.map(event => (
//             <Card key={event.id} onPress={() => navigation.navigate('Events')} elevated style={{ marginBottom: 10 }}>
//               <View className="flex-row items-center gap-3.5">
//                 <View
//                   className="w-[52px] h-[52px] rounded-xl justify-center items-center"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   <Text className="text-white text-xl font-extrabold leading-[22px]">
//                     {new Date(event.date).getDate()}
//                   </Text>
//                   <Text className="text-white/80 text-[10px] font-semibold">
//                     {new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
//                   </Text>
//                 </View>
//                 <View className="flex-1 gap-1">
//                   <Text
//                     className="text-[15px] font-bold"
//                     style={{ color: colors.text }}
//                     numberOfLines={1}
//                   >
//                     {event.title}
//                   </Text>
//                   <View className="flex-row items-center gap-[3px]">
//                     <Ionicons name="time-outline" size={12} color={colors.textMuted} />
//                     <Text className="text-[11px] flex-1" style={{ color: colors.textMuted }}>
//                       {event.time}
//                     </Text>
//                     <Ionicons name="location-outline" size={12} color={colors.textMuted} style={{ marginLeft: 8 }} />
//                     <Text
//                       className="text-[11px] flex-1"
//                       style={{ color: colors.textMuted }}
//                       numberOfLines={1}
//                     >
//                       {event.location}
//                     </Text>
//                   </View>
//                   <Badge label={event.category} type={event.category} small />
//                 </View>
//               </View>
//             </Card>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// function getGreeting() {
//   const h = new Date().getHours();
//   if (h < 12) return 'morning';
//   if (h < 17) return 'afternoon';
//   return 'evening';
// }

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image, Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { SAMPLE_SERMONS, SAMPLE_EVENTS } from '../../data/sampleData';
import { DAILY_VERSE } from '../../data/bibleVerses';

const { width } = Dimensions.get('window');
const quickItemSize = (width - 56) / 3;
const LOGO = require('../../../assets/icon.png');

interface Props { navigation: any; }

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const featured = SAMPLE_SERMONS.find(s => s.isFeatured) || SAMPLE_SERMONS[0];
  const upcoming = SAMPLE_EVENTS.slice(0, 2);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ── Hero Header ────────────────────────────────────── */}
        <LinearGradient
          colors={[colors.heroGradientStart, colors.heroGradientEnd]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          className="relative"
          style={{ paddingTop: insets.top + 16 }}
        >
          {/* Red accent strip at top */}
          <View className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: colors.accent }} />

          <View className="flex-row justify-between items-center mb-[22px] px-5">
            {/* Logo + Church name */}
            <View className="flex-row items-center gap-2.5">
              <Image source={LOGO} className="w-[42px] h-[42px] rounded-[10px]" resizeMode="contain" />
              <View>
                <Text className="text-white font-black text-[17px] tracking-[2.5px]">LIFEGATE</Text>
                <Text className="text-white/65 text-[11px] tracking-wide">Outreach Center</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={toggleTheme}
              className="w-10 h-10 rounded-full justify-center items-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
            >
              <Ionicons name={isDark ? 'sunny' : 'moon'} size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <View className="px-5 pb-7">
            <Text className="text-white/75 text-sm">Good {getGreeting()},</Text>
            <Text className="text-white text-[27px] font-extrabold tracking-tight">Welcome back 🙏</Text>
            <Text className="text-white/60 text-[13px] mt-1">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </Text>
          </View>

          {/* Red bottom accent line */}
          <View className="h-0.5 rounded-sm mt-4 mx-5" style={{ backgroundColor: colors.accent }} />
        </LinearGradient>

        {/* ── Daily Verse ──────────────────────────────────── */}
        <View className="px-4 mt-5">
          <Card elevated style={{ backgroundColor: colors.primary + '12', borderColor: colors.primary + '30' }}>
            <View className="flex-row items-center gap-2 mb-2.5">
              <View className="w-6 h-6 rounded-[6px] justify-center items-center" style={{ backgroundColor: colors.accent }}>
                <Ionicons name="book" size={14} color="#fff" />
              </View>
              <Text className="font-bold text-[13px] tracking-wide" style={{ color: colors.primary }}>
                Verse of the Day
              </Text>
            </View>
            <Text className="text-[15px] leading-6 italic mb-2" style={{ color: colors.text }}>
              "{DAILY_VERSE.text}"
            </Text>
            <Text className="text-[13px] font-bold" style={{ color: colors.accent }}>
              — {DAILY_VERSE.reference} ({DAILY_VERSE.version})
            </Text>
          </Card>
        </View>

        {/* ── Quick Access ─────────────────────────────────── */}
        <View className="px-4 mt-5">
          <Text className="text-lg font-bold tracking-tight mb-3" style={{ color: colors.text }}>
            Quick Access
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {[
              { icon: 'mic', label: 'Sermons', color: '#4F7FFF', screen: 'Sermons', action: () => navigation.getParent()?.navigate('SermonsTab') },
              // { icon: 'musical-notes', label: 'Music', color: '#10B981', screen: 'Music', action: () => navigation.navigate('Music') },
              { icon: 'calendar', label: 'Events', color: '#F59E0B', screen: 'Events', action: () => navigation.getParent()?.navigate('EventsTab') },
              { icon: 'book-outline', label: 'Bible', color: '#8B5CF6', screen: 'Bible', action: () => navigation.getParent()?.navigate('BibleTab') },
              { icon: 'headset', label: 'Audio Bible', color: '#EF4444', screen: 'AudioBible', action: () => navigation.navigate('AudioBible') },
              { icon: 'person-add', label: 'Join Us', color: '#EC4899', screen: 'Members',  action: () => navigation.navigate('Members') },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                className="rounded-2xl border items-center justify-center gap-1.5"
                style={{
                  width: quickItemSize,
                  aspectRatio: 1,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  minHeight: 100,
                }}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.75}
              >
                <View
                  className="w-12 h-12 rounded-[14px] justify-center items-center"
                  style={{ backgroundColor: item.color + '1E' }}
                >
                  <Ionicons name={item.icon as any} size={24} color={item.color} />
                </View>
                <Text className="text-xs font-semibold" style={{ color: colors.textSecondary }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Featured Sermon ──────────────────────────────── */}
        <View className="px-4 mt-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold tracking-tight" style={{ color: colors.text }}>
              Latest Sermon
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sermons')}>
              <Text className="text-sm font-semibold" style={{ color: colors.accent }}>See all</Text>
            </TouchableOpacity>
          </View>
          <Card onPress={() => navigation.navigate('Sermons')} elevated style={{ padding: 0, overflow: 'hidden' }}>
            {/* Navy top bar */}
            <View className="px-3.5 py-[5px]" style={{ backgroundColor: colors.primary }}>
              <Text className="text-[10px] font-extrabold tracking-[1.5px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
                LATEST MESSAGE
              </Text>
            </View>
            <View className="flex-row">
              <View
                className="w-[100px] h-[100px] justify-center items-center"
                style={{ backgroundColor: colors.accent + '18' }}
              >
                <Ionicons name="play-circle" size={48} color={colors.accent} />
              </View>
              <View className="flex-1 p-3.5 gap-1">
                <Badge label={featured.series || 'Message'} type="sermon" small />
                <Text
                  className="text-[15px] font-bold leading-5"
                  style={{ color: colors.text }}
                  numberOfLines={2}
                >
                  {featured.title}
                </Text>
                <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
                  {featured.preacher}
                </Text>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                  <Text className="text-xs" style={{ color: colors.textMuted }}>
                    {featured.duration}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* ── Upcoming Events ──────────────────────────────── */}
        <View className="px-4 mt-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold tracking-tight" style={{ color: colors.text }}>
              Upcoming Events
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text className="text-sm font-semibold" style={{ color: colors.accent }}>See all</Text>
            </TouchableOpacity>
          </View>
          {upcoming.map(event => (
            <Card key={event.id} onPress={() => navigation.navigate('Events')} elevated style={{ marginBottom: 10 }}>
              <View className="flex-row items-center gap-3.5">
                <View
                  className="w-[52px] h-[52px] rounded-xl justify-center items-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-white text-xl font-extrabold leading-[22px]">
                    {new Date(event.date).getDate()}
                  </Text>
                  <Text className="text-white/80 text-[10px] font-semibold">
                    {new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                  </Text>
                </View>
                <View className="flex-1 gap-1">
                  <Text
                    className="text-[15px] font-bold"
                    style={{ color: colors.text }}
                    numberOfLines={1}
                  >
                    {event.title}
                  </Text>
                  <View className="flex-row items-center gap-[3px]">
                    <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                    <Text className="text-[11px] flex-1" style={{ color: colors.textMuted }}>
                      {event.time}
                    </Text>
                    <Ionicons name="location-outline" size={12} color={colors.textMuted} style={{ marginLeft: 8 }} />
                    <Text
                      className="text-[11px] flex-1"
                      style={{ color: colors.textMuted }}
                      numberOfLines={1}
                    >
                      {event.location}
                    </Text>
                  </View>
                  <Badge label={event.category} type={event.category} small />
                </View>
                {/* Red accent dot */}
                <View className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
              </View>
            </Card>
          ))}
        </View>

        {/* ── Bottom Banner ────────────────────────────────── */}
        <View className="px-4 mt-2">
          <LinearGradient
            colors={[colors.accent, colors.accentDark]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            // className="rounded-2xl p-[18px] flex-row items-center justify-between"
            style={{ padding: 18, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <View>
              <Text className="text-white text-[17px] font-extrabold">New Member?</Text>
              <Text className="text-white/80 text-[13px] mt-0.5">Join our church family today</Text>
            </View>
            <TouchableOpacity
              className="px-[18px] py-2.5 rounded-full"
              style={{ backgroundColor: '#fff' }}
              onPress={() => navigation.navigate('Members')}
            >
              <Text className="font-extrabold text-sm" style={{ color: colors.accent }}>
                Register
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

      </ScrollView>
    </View>
  );
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}