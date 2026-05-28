import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import GradientHeader from '../components/gradient-header';
import TabBar from '../components/tab-bar';
import { FONTS } from '../theme/typography';
import { STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';

type Props = {
  onTabChange: (id: string) => void;
  onLogout: () => void;
  onNavigate: (screen: 'faqs' | 'menu-media' | 'contact' | 'language') => void;
};

export default function MenuScreen({ onTabChange, onLogout, onNavigate }: Props) {
  const { t, language } = useLanguage();
  const menuT = t.menu;

  return (
    <View style={styles.screen}>
      <GradientHeader title={menuT.title} variant="blue-gradient" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.navCard} onPress={() => onNavigate('faqs')}>
          <View style={styles.navCardContent}>
            <Text style={styles.navCardTitle}>{menuT.faqsTitle}</Text>
            <Text style={styles.navCardArrow}>→</Text>
          </View>
        </Pressable>

        <Pressable style={styles.navCard} onPress={() => onNavigate('menu-media')}>
          <View style={styles.navCardContent}>
            <Text style={styles.navCardTitle}>{menuT.media}</Text>
            <Text style={styles.navCardArrow}>→</Text>
          </View>
        </Pressable>

        <Pressable style={styles.navCard} onPress={() => onNavigate('language')}>
          <View style={styles.navCardContent}>
            <Text style={styles.navCardTitle}>{menuT.language}</Text>
            <View style={styles.navCardRight}>
              <Text style={styles.langBadge}>{language === 'es' ? 'ES' : 'EN'}</Text>
              <Text style={styles.navCardArrow}>→</Text>
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.navCard} onPress={() => onNavigate('contact')}>
          <View style={styles.navCardContent}>
            <Text style={styles.navCardTitle}>{t.contact.title}</Text>
            <Text style={styles.navCardArrow}>→</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.navCard}
          onPress={() => Linking.openURL('https://www.nukunem.org/code-of-conduct/')}
        >
          <View style={styles.navCardContent}>
            <Text style={styles.navCardTitle}>{t.terms}</Text>
            <Text style={styles.externalIcon}>↗</Text>
          </View>
        </Pressable>

        <Pressable style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutBtnText}>{t.profile.logout}</Text>
        </Pressable>
      </ScrollView>

      <TabBar active="menu" onChange={onTabChange} />
    </View>
  );
}

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
  navCard: {
    backgroundColor: '#312783',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  navCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navCardTitle: {
    fontFamily: FONTS.verdanaBold,
    fontSize: 16,
    color: '#fff',
  },
  navCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langBadge: {
    fontFamily: FONTS.verdana,
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
  },
  navCardArrow: {
    fontSize: 16,
    color: '#fff',
  },
  externalIcon: {
    fontSize: 16,
    color: '#fff',
  },
  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutBtnText: {
    fontFamily: FONTS.verdanaBold,
    fontSize: 14,
    color: '#FF4444',
  },
});
