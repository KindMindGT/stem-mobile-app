import React, { useState } from 'react';
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

export default function FaqsScreen({ onBack, onTabChange }: Props) {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const faqs = t.menu.faqs;

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <GradientHeader title={t.menu.title} variant="blue-gradient" />
        <IconButton icon="back" onPress={onBack} style={styles.backBtn} accessibilityLabel={t.common.back} />
      </View>

      <Text style={styles.pageTitle}>{t.menu.faqsTitle}</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {faqs.map((faq, i) => {
          const isOpen = expandedIndex === i;
          return (
            <Pressable
              key={i}
              style={styles.faqItem}
              onPress={() => setExpandedIndex(isOpen ? null : i)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.q}</Text>
                <Text style={styles.faqChevron}>{isOpen ? '▲' : '▼'}</Text>
              </View>
              {isOpen && <Text style={styles.faqAnswer}>{faq.a}</Text>}
            </Pressable>
          );
        })}
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
  faqItem: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontFamily: FONTS.verdanaBold,
    fontSize: 14,
    color: '#fff',
  },
  faqChevron: {
    fontSize: 10,
    color: '#fff',
  },
  faqAnswer: {
    fontFamily: FONTS.verdana,
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.7)',
    paddingTop: 8,
  },
});
