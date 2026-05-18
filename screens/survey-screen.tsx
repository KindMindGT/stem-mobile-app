import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Polyline } from 'react-native-svg';
import GradientHeader from '../components/gradient-header';
import { AERO_SKY, APEX_GLACIER, BURNOUT_ORANGE, IGNITE_INDIGO, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

// ─── Data ──────────────────────────────────────────────────────────────────────

type SurveyStatus = 'available' | 'completed' | 'previous';

type Survey = {
  id: string;
  title: string;
  status: SurveyStatus;
};

const SURVEYS: Survey[] = [
  { id: 'sv1', title: 'National Championship', status: 'available' },
  { id: 'sv2', title: 'World Championship',    status: 'available' },
  { id: 'sv3', title: "Audi's year bootcamp",  status: 'completed' },
  { id: 'sv4', title: "Audi's year bootcamp",  status: 'previous'  },
];

const TIER_OPTIONS    = ['Tier 1', 'Tier 2', 'Tier 3'];
const COURSE_OPTIONS  = ['PMI', 'Growth', 'Engineer + Design', 'Branding', 'Recovery'];
const LEADER_OPTIONS  = ['Académico', 'Líder de equipo', 'Instructor', 'Coordinador'];

const SECTION_META: Record<SurveyStatus, { label: string; italic?: boolean; color?: string }> = {
  available: { label: 'Available',        italic: true  },
  completed: { label: 'Completed',        italic: true  },
  previous:  { label: 'Previous Surveys', italic: true  },
};

// ─── Icons ─────────────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronRightIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.7)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d={open ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SendIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Polyline points="22 2 11 13" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22 2L15 22 11 13 2 9l20-7z" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function Dropdown({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropWrap}>
      <Pressable
        style={styles.dropHeader}
        onPress={() => setOpen(v => !v)}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded: open }}
      >
        <Text style={[styles.dropLabel, selected && styles.dropLabelSelected]}>
          {selected ?? label}
        </Text>
        <ChevronDownIcon open={open} />
      </Pressable>

      {open && (
        <View style={styles.dropList}>
          {options.map((opt, i) => (
            <Pressable
              key={opt}
              style={[styles.dropOption, i < options.length - 1 && styles.dropOptionDivider]}
              onPress={() => { onSelect(opt); setOpen(false); }}
              accessibilityRole="menuitem"
            >
              <Text style={[styles.dropOptionText, selected === opt && styles.dropOptionSelected]}>
                {opt}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Survey form view ─────────────────────────────────────────────────────────

function SurveyForm({ survey, onBack }: { survey: Survey; onBack: () => void }) {
  const insets = useSafeAreaInsets();
  const [tier, setTier]       = useState<string | null>(null);
  const [course, setCourse]   = useState<string | null>(null);
  const [leader, setLeader]   = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [sent, setSent]       = useState(false);

  const canSend = Boolean(tier && course && leader);

  const handleSend = () => {
    if (!canSend) return;
    setSent(true);
    setTimeout(onBack, 1200);
  };

  return (
    <View style={styles.screen}>
      <GradientHeader title="Survey" variant="blue-gradient" />

      <Pressable
        style={[styles.backBtn, { top: insets.top + 12 }]}
        onPress={onBack}
        hitSlop={12}
        accessibilityLabel="atrás"
      >
        <BackIcon />
      </Pressable>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.formContent, { paddingBottom: insets.bottom + 32 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.formSurveyTitle}>{survey.title}</Text>

          <Dropdown
            label="Tier"
            options={TIER_OPTIONS}
            selected={tier}
            onSelect={setTier}
          />
          <Dropdown
            label="Course / Event"
            options={COURSE_OPTIONS}
            selected={course}
            onSelect={setCourse}
          />
          <Dropdown
            label="Academic / Leader"
            options={LEADER_OPTIONS}
            selected={leader}
            onSelect={setLeader}
          />

          {/* Comment field */}
          <View style={styles.commentWrap}>
            <Text style={styles.commentLabel}>Comentario</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Escribe tu comentario aquí..."
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              accessibilityLabel="Comentario"
            />
          </View>

          {/* Send button */}
          <Pressable
            style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
            onPress={handleSend}
            accessibilityRole="button"
            accessibilityLabel="Enviar encuesta"
            disabled={sent}
          >
            <LinearGradient
              colors={[APEX_GLACIER, AERO_SKY]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[StyleSheet.absoluteFill, styles.sendBtnGrad]}
            />
            <SendIcon />
            <Text style={styles.sendBtnText}>{sent ? 'ENVIADO' : 'SEND'}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Survey list view ─────────────────────────────────────────────────────────

const STATUS_ORDER: SurveyStatus[] = ['available', 'completed', 'previous'];

function SurveyList({ onSelect, onBack }: { onSelect: (s: Survey) => void; onBack: () => void }) {
  const insets = useSafeAreaInsets();

  const grouped = STATUS_ORDER
    .map(status => ({ status, items: SURVEYS.filter(s => s.status === status) }))
    .filter(g => g.items.length > 0);

  return (
    <View style={styles.screen}>
      <GradientHeader title="Survey" variant="blue-gradient" />

      <Pressable
        style={[styles.backBtn, { top: insets.top + 12 }]}
        onPress={onBack}
        hitSlop={12}
        accessibilityLabel="atrás"
      >
        <BackIcon />
      </Pressable>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* "Survey" label in pink, as seen in the screenshot */}
        <Text style={styles.listTopLabel}>Survey</Text>

        {grouped.map(group => {
          const meta = SECTION_META[group.status];
          return (
            <View key={group.status} style={styles.group}>
              <Text style={styles.groupHeading}>{meta.label}</Text>

              <View style={styles.surveyCard}>
                {group.items.map((survey, i) => (
                  <Pressable
                    key={survey.id}
                    style={({ pressed }) => [
                      styles.surveyRow,
                      i < group.items.length - 1 && styles.surveyRowDivider,
                      pressed && styles.surveyRowPressed,
                    ]}
                    onPress={() => onSelect(survey)}
                    accessibilityRole="button"
                    accessibilityLabel={survey.title}
                  >
                    <Text style={styles.surveyTitle}>{survey.title}</Text>
                    <ChevronRightIcon />
                  </Pressable>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ─── Screen (orchestrator) ────────────────────────────────────────────────────

type Props = {
  onBack: () => void;
};

export default function SurveyScreen({ onBack }: Props) {
  const [selected, setSelected] = useState<Survey | null>(null);

  if (selected) {
    return (
      <SurveyForm
        survey={selected}
        onBack={() => setSelected(null)}   // back → list, not all the way out
      />
    );
  }

  return <SurveyList onSelect={setSelected} onBack={onBack} />;
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const CARD_BG    = 'rgba(20,28,90,0.75)';
const CARD_BORDER = 'rgba(255,255,255,0.18)';

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: STEM_BG },
  flex:   { flex: 1 },

  backBtn: {
    position: 'absolute',
    left: 18,
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── List ──────────────────────────────────────────────────────────────────
  listContent: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 20,
    gap: 6,
  },
  listTopLabel: {
    fontFamily: FONTS.archivoBoldItalic,
    fontStyle: 'italic' as const,
    fontWeight: '700' as const,
    fontSize: 20,
    color: PITLANE_PINK,
    marginBottom: 6,
  },
  group: {
    gap: 6,
    marginTop: 8,
  },
  groupHeading: {
    fontFamily: FONTS.archivoBoldItalic,
    fontStyle: 'italic' as const,
    fontWeight: '700' as const,
    fontSize: 17,
    color: '#fff',
    letterSpacing: -0.2,
    marginLeft: 2,
  },
  surveyCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    backgroundColor: CARD_BG,
    overflow: 'hidden',
  },
  surveyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  surveyRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  surveyRowPressed: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  surveyTitle: {
    flex: 1,
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600' as const,
    fontSize: 15,
    color: '#fff',
  },

  // ── Form ──────────────────────────────────────────────────────────────────
  formContent: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 28,
    gap: 12,
  },
  formSurveyTitle: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700' as const,
    fontSize: 18,
    color: '#fff',
    letterSpacing: -0.2,
    marginBottom: 8,
  },

  // Dropdown
  dropWrap: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    backgroundColor: CARD_BG,
    overflow: 'hidden',
  },
  dropHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dropLabel: {
    flex: 1,
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600' as const,
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
  },
  dropLabelSelected: {
    color: '#fff',
  },
  dropList: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.15)',
    backgroundColor: `${IGNITE_INDIGO}cc`,
  },
  dropOption: {
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  dropOptionDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  dropOptionText: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  dropOptionSelected: {
    color: AERO_SKY,
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600' as const,
  },

  // Comment
  commentWrap: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    backgroundColor: CARD_BG,
    padding: 14,
    gap: 8,
  },
  commentLabel: {
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600' as const,
    fontSize: 14,
    color: '#fff',
  },
  commentInput: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: '#fff',
    minHeight: 110,
    backgroundColor: 'rgba(200,210,255,0.12)',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },

  // Send button
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 52,
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 8,
    alignSelf: 'center',
    paddingHorizontal: 36,
  },
  sendBtnGrad: {
    borderRadius: 14,
  },
  sendBtnDisabled: {
    opacity: 0.45,
  },
  sendBtnText: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700' as const,
    fontSize: 15,
    letterSpacing: 2,
    color: '#fff',
  },
});
