import React from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useLanguage } from '../contexts/LanguageContext';
import GradientHeader from '../components/gradient-header';
import IconButton from '../components/icon-button';
import TabBar from '../components/tab-bar';
import { STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

const videoSource = require('../assets/videos/stem-racing.mp4');

type Props = {
  onBack: () => void;
  onTabChange: (id: string) => void;
};

export default function MediaScreen({ onBack, onTabChange }: Props) {
  const { t } = useLanguage();
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
  });
  const menuT = t.menu;

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <GradientHeader title={menuT.title} variant="blue-gradient" />
        <IconButton icon="back" onPress={onBack} style={styles.backBtn} accessibilityLabel={t.common.back} />
      </View>

      <Text style={styles.pageTitle}>{menuT.media}</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.videoCard}>
          <VideoView
            style={styles.video}
            player={player}
            nativeControls
            contentFit="contain"
          />
        </View>

        <Pressable
          style={styles.channelBtn}
          onPress={() => Linking.openURL('https://www.youtube.com/@STEMRacing_HQ')}
        >
          <Text style={styles.channelBtnText}>{menuT.followYouTube}</Text>
        </Pressable>

        <View style={styles.socialRow}>
          <View style={styles.socialCard}>
            <Image
              source={require('../assets/social/instagram.jpg')}
              style={styles.profilePic}
            />
            <Pressable
              style={[styles.socialBtn, { backgroundColor: '#E4405F' }]}
              onPress={() => Linking.openURL('https://www.instagram.com/stemracinggt/')}
            >
              <Text style={styles.socialBtnText}>{menuT.followInstagram}</Text>
            </Pressable>
          </View>

          <View style={styles.socialCard}>
            <Image
              source={require('../assets/social/tiktok.jpg')}
              style={styles.profilePic}
            />
            <Pressable
              style={[styles.socialBtn, { backgroundColor: '#000' }]}
              onPress={() => Linking.openURL('https://www.tiktok.com/@stemracing_hq')}
            >
              <Text style={styles.socialBtnText}>{menuT.followTikTok}</Text>
            </Pressable>
          </View>
        </View>
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
  videoCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 10,
    aspectRatio: 16 / 9,
    width: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  channelBtn: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  channelBtnText: {
    fontFamily: FONTS.verdanaBold,
    fontSize: 12,
    color: '#fff',
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'space-between',
  },
  socialCard: {
    width: '48%',
    alignItems: 'center',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  socialBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: '100%',
  },
  socialBtnText: {
    fontFamily: FONTS.verdanaBold,
    fontSize: 13,
    color: '#fff',
  },
});
