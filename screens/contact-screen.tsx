import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

export default function ContactScreen({ onBack, onTabChange }: Props) {
  const { t } = useLanguage();

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <GradientHeader title={t.menu.title} variant="blue-gradient" />
        <IconButton icon="back" onPress={onBack} style={styles.backBtn} accessibilityLabel={t.common.back} />
      </View>

      <Text style={styles.pageTitle}>{t.contact.title}</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#009FE3', '#95C11F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.contactBox}
        >
          <Text style={styles.contactLine}>{t.contact.address}</Text>
          <Text style={styles.contactLine}>{t.contact.addressLine2}</Text>
          <Text style={styles.contactLine}>{t.contact.hours}</Text>
          <Pressable onPress={() => Linking.openURL('mailto:hola@stemracing.gt')}>
            <Text style={[styles.contactLine, styles.contactLink]}>{t.contact.email}</Text>
          </Pressable>
        </LinearGradient>
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
  contactBox: {
    borderRadius: 12,
    padding: 20,
    gap: 8,
  },
  contactLine: {
    fontFamily: FONTS.verdana,
    fontSize: 15,
    lineHeight: 22,
    color: '#fff',
  },
  contactLink: {
    textDecorationLine: 'underline',
  },
});
