import React, { useState } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { WebView } from 'react-native-webview';
import GradientHeader from '../components/gradient-header';
import TabBar from '../components/tab-bar';
import { AERO_SKY, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS } from '../theme/typography';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CONTENT_WIDTH = SCREEN_WIDTH - LAYOUT.screenPadding * 2;
const HALF_WIDTH = (CONTENT_WIDTH - 10) / 2;

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    id: 'f1',
    question: 'Xxxxxxxxxxxxxx',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'f2',
    question: 'Xxxxxxxxxxxx',
    answer: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'f3',
    question: 'Xxxxxxxxxxxxxx',
    answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'f4',
    question: 'Xxxxxxxxxxxxx',
    answer: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 'f5',
    question: 'Xxxxxxxxxxxxxx',
    answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    id: 'f6',
    question: 'Xxxxxxxxxxxxxx',
    answer: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  },
  {
    id: 'f7',
    question: 'How can I end my contract',
    answer: 'To end your contract, please contact our support team at least 30 days in advance. You can reach us through the app or by visiting any Hub location during office hours.',
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function QuestionIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} />
      <Path
        d="M9.5 9C9.5 7.619 10.619 6.5 12 6.5C13.381 6.5 14.5 7.619 14.5 9C14.5 10.381 13.381 11.5 12 11.5V13"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={16} r={0.8} fill="rgba(255,255,255,0.85)" />
    </Svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d={open ? 'M6 15 L12 9 L18 15' : 'M9 6 L15 12 L9 18'}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(prev => !prev);
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.faqCard, pressed && styles.faqCardPressed]}
      onPress={toggle}
    >
      <View style={styles.faqRow}>
        <QuestionIcon />
        <Text style={styles.faqQuestion} numberOfLines={open ? undefined : 1}>
          {question}
        </Text>
        {!open && <ChevronIcon open={false} />}
      </View>
      {open && (
        <Text style={styles.faqAnswer}>{answer}</Text>
      )}
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

type Props = {
  onTabChange: (id: string) => void;
};

export default function MoreScreen({ onTabChange }: Props) {
  return (
    <View style={styles.screen}>
      <GradientHeader title="More" variant="blue-gradient" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── FAQs ──────────────────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>FAQs</Text>

        {FAQS.map((faq) => (
          <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}

        {/* ── Media ─────────────────────────────────────────────────────── */}
        <Text style={[styles.sectionLabel, styles.mediaSectionLabel]}>Media</Text>

        {/* YouTube — embedded channel page showing latest videos */}
        <View style={styles.webCard}>
          <WebView
            source={{ uri: 'https://www.youtube.com/@STEMRacing_HQ?app=desktop' }}
            style={styles.youtubeWebView}
            scrollEnabled={false}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
          />
        </View>
        <Pressable
          style={styles.channelBtn}
          onPress={() => Linking.openURL('https://www.youtube.com/@STEMRacing_HQ')}
        >
          <Text style={styles.channelBtnText}>▶  Ver canal en YouTube</Text>
        </Pressable>
        <Text style={styles.platformLabel}>Youtube</Text>

        {/* Instagram + TikTok side by side */}
        <View style={styles.socialRow}>
          {/* Instagram */}
          <View style={styles.socialCol}>
            <View style={[styles.webCard, styles.socialWebCard]}>
              <WebView
                source={{ uri: 'https://www.instagram.com/stemracinghq/?embed=true' }}
                style={styles.socialWebView}
                scrollEnabled={false}
              />
            </View>
            <View style={styles.followBtns}>
              <Pressable
                style={styles.followBtn}
                onPress={() => Linking.openURL('https://www.instagram.com/stemracinghq/')}
              >
                <Text style={styles.followBtnText}>Seguir @stemracinghq</Text>
              </Pressable>
              <Pressable
                style={[styles.followBtn, { marginTop: 6 }]}
                onPress={() => Linking.openURL('https://www.instagram.com/stemracinggt/')}
              >
                <Text style={styles.followBtnText}>Seguir @stemracinggt</Text>
              </Pressable>
            </View>
            <Text style={styles.platformLabel}>Instagram</Text>
          </View>

          {/* TikTok */}
          <View style={styles.socialCol}>
            <View style={[styles.webCard, styles.socialWebCard]}>
              <WebView
                source={{ uri: 'https://www.tiktok.com/@stemracing_hq?embed=true' }}
                style={styles.socialWebView}
                scrollEnabled={false}
              />
            </View>
            <Pressable
              style={styles.followBtn}
              onPress={() => Linking.openURL('https://www.tiktok.com/@stemracing_hq')}
            >
              <Text style={styles.followBtnText}>Seguir @stemracing_hq</Text>
            </Pressable>
            <Text style={styles.platformLabel}>TikTok</Text>
          </View>
        </View>
      </ScrollView>

      <TabBar active="menu" onChange={onTabChange} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 28,
    paddingBottom: LAYOUT.scrollBottomWithTabs,
  },

  // Section label
  sectionLabel: {
    fontFamily: FONTS.archivoBoldItalic,
    fontStyle: 'italic',
    fontWeight: '700',
    fontSize: 22,
    color: PITLANE_PINK,
    marginBottom: 16,
  },

  // FAQ card
  faqCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  faqCardPressed: {
    opacity: 0.8,
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  faqQuestion: {
    flex: 1,
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: '#fff',
  },
  faqAnswer: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.78)',
    lineHeight: 20,
    marginTop: 12,
    paddingLeft: 32,
  },

  // ── Media
  mediaSectionLabel: {
    marginTop: 32,
  },
  webCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 10,
  },
  youtubeWebView: {
    width: CONTENT_WIDTH,
    height: 220,
  },
  channelBtn: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    marginBottom: 6,
  },
  channelBtnText: {
    fontFamily: FONTS.interBold,
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
  },
  platformLabel: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 18,
    marginTop: 4,
  },

  // Side by side
  socialRow: {
    flexDirection: 'row',
    gap: 10,
  },
  socialCol: {
    flex: 1,
  },
  socialWebCard: {
    marginBottom: 8,
  },
  socialWebView: {
    width: HALF_WIDTH,
    height: 260,
  },
  followBtns: {
    gap: 0,
  },
  followBtn: {
    backgroundColor: AERO_SKY,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 6,
  },
  followBtnText: {
    fontFamily: FONTS.interBold,
    fontWeight: '700',
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
  },
});
