import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Linking, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';

const LOGO = require('../../../assets/icon.png');

interface Props { navigation: any; }

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, isDark, toggleTheme } = useTheme();

  // const SettingRow = ({ icon, color, label, value, onPress, isSwitch, switchValue, onToggle }: any) => (
  //   <TouchableOpacity onPress={onPress} style={styles.row} activeOpacity={isSwitch ? 1 : 0.7}>
  //     <View style={[styles.icon, { backgroundColor: color + '20' }]}>
  //       <Ionicons name={icon} size={20} color={color} />
  //     </View>
  //     <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
  //     <View style={styles.right}>
  //       {value && <Text style={[styles.value, { color: colors.textMuted }]}>{value}</Text>}
  //       {isSwitch
  //         ? <Switch value={switchValue} onValueChange={onToggle} trackColor={{ true: colors.primary, false: colors.border }} thumbColor="#fff" />
  //         : <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
  //       }
  //     </View>
  //   </TouchableOpacity>
  // );

  const SettingRow = ({ icon, color, label, sub, value, onPress, isSwitch, switchValue, onToggle }: any) => (
    <TouchableOpacity onPress={onPress} style={styles.row} activeOpacity={isSwitch ? 1 : 0.7}>
      <View style={[styles.icon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', gap: 2 }}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {sub && <Text style={[styles.rowSub, { color: colors.textMuted }]}>{sub}</Text>}
      </View>
      <View style={styles.right}>
        {value && <Text style={[styles.value, { color: colors.textMuted }]}>{value}</Text>}
        {isSwitch
          ? <Switch value={switchValue} onValueChange={onToggle} trackColor={{ true: colors.primary, false: colors.border }} thumbColor="#fff" />
          : <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        }
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Settings" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 16 }}>

        {/* Profile */}
        <Card elevated style={{ alignItems: 'center', paddingVertical: 24 }}>
          <View style={styles.avatar}>
            <Image source={LOGO} style={styles.avatar} resizeMode="contain" />
          </View>
          <Text style={[styles.churchName, { color: colors.text }]}>Lifegate Outreach Center</Text>
          <Text style={[styles.churchSub, { color: colors.textMuted }]}>Short Acre Street, Walsall, WS2 8HW, United Kingdom</Text>
        </Card>

        {/* Appearance */}
        <View>
          <Text style={[styles.section, { color: colors.textMuted }]}>APPEARANCE</Text>
          <Card elevated style={{ gap: 0, padding: 0 }}>
            <SettingRow
              icon="moon" color="#8B5CF6" label="Dark Mode"
              isSwitch switchValue={isDark} onToggle={toggleTheme}
            />
          </Card>
        </View>

        {/* Bible */}
        <View>
          <Text style={[styles.section, { color: colors.textMuted }]}>BIBLE</Text>
          <Card elevated style={{ gap: 0, padding: 0 }}>
            <SettingRow icon="book" color="#4F7FFF" label="Default Version" value="KJV" onPress={() => { }} />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow icon="text" color="#10B981" label="Font Size" value="Medium" onPress={() => { }} />
          </Card>
        </View>

        {/* Notifications */}
        <View>
          <Text style={[styles.section, { color: colors.textMuted }]}>NOTIFICATIONS</Text>
          <Card elevated style={{ gap: 0, padding: 0 }}>
            <SettingRow icon="notifications" color="#F59E0B" label="Push Notifications" isSwitch switchValue={true} onToggle={() => { }} />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow icon="mic" color="#4F7FFF" label="New Sermons" isSwitch switchValue={true} onToggle={() => { }} />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow icon="calendar" color="#EC4899" label="Upcoming Events" isSwitch switchValue={true} onToggle={() => { }} />
          </Card>
        </View>

        {/* Giving */}
        <View>
          <Text style={[styles.section, { color: colors.textMuted }]}>GIVING</Text>
          <Card elevated style={{ gap: 0, padding: 0 }}>
            <SettingRow
              icon="heart"
              color="#EF4444"
              label="Give Online"
              sub="Support the work of Lifegate"
              onPress={() => Linking.openURL('https://www.lifegatecentre.org/giving/')}
            />
          </Card>
        </View>

        {/* Follow Us */}
        <View>
          <Text style={[styles.section, { color: colors.textMuted }]}>FOLLOW US</Text>
          <Card elevated style={{ gap: 0, padding: 0 }}>
            <SettingRow
              icon="logo-youtube"
              color="#FF0000"
              label="YouTube"
              sub="Watch our messages"
              onPress={() => Linking.openURL('https://youtube.com')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="logo-facebook"
              color="#1877F2"
              label="Facebook"
              sub="Stay connected"
              onPress={() => Linking.openURL('https://facebook.com')}
            />
          </Card>
        </View>

        {/* About */}
        {/* <View>
          <Text style={[styles.section, { color: colors.textMuted }]}>ABOUT</Text>
          <Card elevated style={{ gap: 0, padding: 0 }}>
            <SettingRow icon="information-circle" color="#6B7280" label="App Version" value="1.0.0" onPress={() => {}} />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow icon="globe" color="#4F7FFF" label="Website" onPress={() => Linking.openURL('https://lifegatecentre.org/')} />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow icon="mail" color="#10B981" label="Contact Us" onPress={() => Linking.openURL('mailto:info@lifegatecentre.org')} />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow icon="shield-checkmark" color="#8B5CF6" label="Privacy Policy" onPress={() => Linking.openURL('https://www.lifegatecentre.org/privacy-policy/')} />
          </Card>
        </View> */}

        {/* About */}
        <View>
          <Text style={[styles.section, { color: colors.textMuted }]}>ABOUT</Text>
          <Card elevated style={{ gap: 0, padding: 0 }}>
            <SettingRow
              icon="people"
              color="#8B5CF6"
              label="Leadership"
              sub="Our pastoral team"
              onPress={() => Linking.openURL('https://www.lifegatecentre.org/about-us/leadership-profiles/')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="time"
              color="#F59E0B"
              label="Service Times"
              sub="Sunday 10:00am · Wednesday 7:00pm"
              onPress={() => Linking.openURL('https://www.lifegatecentre.org/news-and-events/service-times/')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="location"
              color="#EC4899"
              label="Find Us"
              sub="Get directions to Lifegate"
              onPress={() => Linking.openURL('https://maps.google.com/?q=Lifegate+Outreach+Centre+Walsall')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="globe"
              color="#4F7FFF"
              label="Website"
              sub="lifegatecentre.org"
              onPress={() => Linking.openURL('https://lifegatecentre.org/')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="mail"
              color="#10B981"
              label="Contact Us"
              onPress={() => Linking.openURL('mailto:info@lifegatecentre.org')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="shield-checkmark"
              color="#8B5CF6"
              label="Privacy Policy"
              onPress={() => Linking.openURL('https://www.lifegatecentre.org/privacy-policy/')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="information-circle"
              color="#6B7280"
              label="App Version"
              value="1.0.0"
              onPress={() => { }}
            />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 8, paddingHorizontal: 4 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  icon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 15, fontWeight: '500' },
  right: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  value: { fontSize: 14 },
  divider: { height: 1, marginHorizontal: 16 },
  avatar: { width: 72, height: 72, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  // logo: { width: 34, height: 34, borderRadius: 8 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: '900' },
  churchName: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  churchSub: { fontSize: 13, marginTop: 2 },
  churchInfo: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  infoTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  infoText: { fontSize: 13, lineHeight: 20 },
  rowSub: { fontSize: 12 },
});
