import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';

type FormField = 'firstName' | 'lastName' | 'email' | 'phone' | 'address' | 'department';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  isFirstTimer: boolean;
}

type FormErrors = Partial<Record<FormField, string>>;

const DEPARTMENTS = ['Choir', 'Ushering', 'Media', 'Children Ministry', 'Youth', 'Prayer', 'Welfare', 'None'];

interface Props { navigation: any; }

export const MembersScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', department: 'None', isFirstTimer: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
  };

  const updateField = (field: FormField, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const InputField = ({ label, field, placeholder, keyboardType = 'default', multiline = false }: {
    label: string; field: FormField; placeholder: string; keyboardType?: any; multiline?: boolean;
  }) => (
    <View style={styles.fieldWrap}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMulti,
          { backgroundColor: colors.inputBg, borderColor: errors[field] ? '#EF4444' : colors.border, color: colors.text }
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={form[field]}
        onChangeText={(v) => updateField(field, v)}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {errors[field] ? <Text style={styles.errorText}>{errors[field]}</Text> : null}
    </View>
  );

  if (submitted) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header title="Registration" />
        <View style={styles.successContainer}>
          <View style={[styles.successIcon, { backgroundColor: '#10B98122' }]}>
            <Ionicons name="checkmark-circle" size={80} color="#10B981" />
          </View>
          <Text style={[styles.successTitle, { color: colors.text }]}>Welcome to Lifegate! 🎉</Text>
          <Text style={[styles.successSub, { color: colors.textSecondary }]}>
            {form.isFirstTimer
              ? "We're so glad you joined us for the first time. Our team will reach out to you soon!"
              : "Your registration has been received. God bless you!"}
          </Text>
          <TouchableOpacity
            style={[styles.doneBtn, { backgroundColor: colors.primary }]}
            onPress={() => {
              setSubmitted(false);
              setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', department: 'None', isFirstTimer: false });
            }}
          >
            <Text style={styles.doneBtnText}>Register Another</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Join Lifegate" subtitle="New member registration" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 120, gap: 16 }}>

          <Card style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
            <View style={styles.welcomeRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.welcomeTitle}>Welcome to Our Family!</Text>
                <Text style={styles.welcomeSub}>Fill in your details and we'll get you connected.</Text>
              </View>
              <Ionicons name="people" size={36} color="rgba(255,255,255,0.5)" />
            </View>
          </Card>

          <Card elevated>
            <TouchableOpacity
              style={styles.toggleRow}
              onPress={() => setForm(prev => ({ ...prev, isFirstTimer: !prev.isFirstTimer }))}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.toggleLabel, { color: colors.text }]}>I'm a First-Time Visitor</Text>
                <Text style={[styles.toggleSub, { color: colors.textMuted }]}>Check if it's your first time at Lifegate</Text>
              </View>
              <View style={[styles.toggle, { backgroundColor: form.isFirstTimer ? colors.primary : colors.border }]}>
                <View style={[styles.toggleThumb, { left: form.isFirstTimer ? 22 : 2 }]} />
              </View>
            </TouchableOpacity>
            {form.isFirstTimer && (
              <View style={[styles.firstTimerBadge, { backgroundColor: '#10B98118', borderColor: '#10B98144' }]}>
                <Ionicons name="star" size={14} color="#10B981" />
                <Text style={{ color: '#10B981', fontSize: 13, fontWeight: '600' }}>Our team will welcome you personally!</Text>
              </View>
            )}
          </Card>

          <Card elevated>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
            <InputField label="First Name *" field="firstName" placeholder="e.g. John" />
            <InputField label="Last Name *" field="lastName" placeholder="e.g. Okafor" />
            <InputField label="Email Address *" field="email" placeholder="e.g. john@email.com" keyboardType="email-address" />
            <InputField label="Phone Number *" field="phone" placeholder="e.g. 08012345678" keyboardType="phone-pad" />
            <InputField label="Home Address" field="address" placeholder="Your residential address (optional)" multiline />
          </Card>

          <Card elevated>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Department Interest</Text>
            <Text style={[styles.label, { color: colors.textSecondary, marginBottom: 10 }]}>Which department would you like to serve in?</Text>
            <View style={styles.deptGrid}>
              {DEPARTMENTS.map(d => (
                <TouchableOpacity
                  key={d}
                  onPress={() => setForm(prev => ({ ...prev, department: d }))}
                  style={[
                    styles.deptChip,
                    {
                      backgroundColor: form.department === d ? colors.primary : colors.inputBg,
                      borderColor: form.department === d ? colors.primary : colors.border,
                    }
                  ]}
                >
                  <Text style={[styles.deptText, { color: form.department === d ? '#fff' : colors.textSecondary }]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.submitText}>Complete Registration</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 4 },
  welcomeSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggleLabel: { fontSize: 15, fontWeight: '700' },
  toggleSub: { fontSize: 12, marginTop: 2 },
  toggle: { width: 46, height: 26, borderRadius: 13, position: 'relative' },
  toggleThumb: { position: 'absolute', top: 3, width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },
  firstTimerBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, padding: 10, borderRadius: 8, borderWidth: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  fieldWrap: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  inputMulti: { height: 80, paddingTop: 12 },
  errorText: { color: '#EF4444', fontSize: 12, marginTop: 4 },
  deptGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  deptChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  deptText: { fontSize: 13, fontWeight: '600' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16, borderRadius: 14 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 16 },
  successIcon: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  successTitle: { fontSize: 26, fontWeight: '800', textAlign: 'center', letterSpacing: -0.5 },
  successSub: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  doneBtn: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 14, marginTop: 8 },
  doneBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
