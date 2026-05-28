import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import GradientHeader from '../components/gradient-header';
import IconButton from '../components/icon-button';
import TabBar from '../components/tab-bar';
import { STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

type Props = {
  onBack: () => void;
  onTabChange: (id: string) => void;
};

export default function LanguageScreen({ onBack, onTabChange }: Props) {
  const { t, language, setLanguage } = useLanguage();

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <GradientHeader title={t.menu.title} variant="blue-gradient" />
        <IconButton icon="back" onPress={onBack} style={styles.backBtn} accessibilityLabel={t.common.back} />
      </View>

      <Text style={styles.pageTitle}>{t.menu.language}</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={[styles.langCard, language === 'es' && styles.langCardActive]}
          onPress={() => setLanguage('es')}
        >
          <Text style={[styles.langLabel, language === 'es' && styles.langLabelActive]}>
            {t.menu.spanish}
          </Text>
          {language === 'es' && <Text style={styles.check}>✓</Text>}
        </Pressable>

        <Pressable
          style={[styles.langCard, language === 'en' && styles.langCardActive]}
          onPress={() => setLanguage('en')}
        >
          <Text style={[styles.langLabel, language === 'en' && styles.langLabelActive]}>
            {t.menu.english}
          </Text>
          {language === 'en' && <Text style={styles.check}>✓</Text>}
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
  headerWrap: {
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    bottom: 0,
    left: 4,
  },
  pageTitle: {
    ...TEXT.sectionTitle,
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 20,
    paddingBottom: 4,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 16,
    paddingBottom: LAYOUT.scrollBottomWithTabs,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 10,
  },
  langCardActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: '#fff',
  },
  langLabel: {
    fontFamily: FONTS.verdana,
    fontSize: 16,
    color: '#fff',
  },
  langLabelActive: {
    color: '#fff',
  },
  check: {
    fontSize: 18,
    color: '#fff',
  },
});
