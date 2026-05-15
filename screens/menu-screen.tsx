import { IconAbout } from '@/components/ui/icon-about';
import { IconChevron } from '@/components/ui/icon-chevron';
import { IconHelp } from '@/components/ui/icon-help';
import { IconLogout } from '@/components/ui/icon-logout';
import { IconNotification } from '@/components/ui/icon-notifications';
import { IconPrivacy } from '@/components/ui/icon-privacy';
import { IconSettings } from '@/components/ui/icon-settings';
import { IconTerms } from '@/components/ui/icon-terms';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientHeader from '../components/gradient-header';
import TabBar from '../components/tab-bar';
import { BURNOUT_ORANGE, CHICANE_VIOLET, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS } from '../theme/typography';

// ─── Data ─────────────────────────────────────────────────────────────────────

type MenuItem = {
  id: string;
  label: string;
  sublabel?: string;
  icon: (color: string) => React.ReactNode;
  destructive?: boolean;
  onPress?: () => void;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const MENU_SECTIONS: MenuSection[] = [
  {
    title: 'CUENTA',
    items: [
      {
        id: 'notifications',
        label: 'Notificaciones',
        sublabel: 'Alertas de carreras y resultados',
        icon: (c) => <IconNotification color={c} />,
      },
      {
        id: 'settings',
        label: 'Configuración',
        sublabel: 'Preferencias de la app',
        icon: (c) => <IconSettings color={c} />,
      },
    ],
  },
  {
    title: 'LEGAL',
    items: [
      {
        id: 'terms',
        label: 'Términos y condiciones',
        icon: (c) => <IconTerms color={c} />,
      },
      {
        id: 'privacy',
        label: 'Política de privacidad',
        icon: (c) => <IconPrivacy color={c} />,
      },
    ],
  },
  {
    title: 'SOPORTE',
    items: [
      {
        id: 'help',
        label: 'Ayuda y soporte técnico',
        sublabel: 'Preguntas frecuentes y contacto',
        icon: (c) => <IconHelp color={c} />,
      },
      {
        id: 'about',
        label: 'Acerca de la app',
        sublabel: 'Versión 1.0.0',
        icon: (c) => <IconAbout color={c} />,
      },
    ],
  },
  {
    title: '',
    items: [
      {
        id: 'logout',
        label: 'Cerrar sesión',
        icon: (c) => <IconLogout color={c} />,
        destructive: true,
      },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MenuRow({ item, isLast }: { item: MenuItem; isLast: boolean }) {
  const iconColor = item.destructive ? PITLANE_PINK : 'rgba(255,255,255,0.7)';
  const labelColor = item.destructive ? PITLANE_PINK : '#fff';

  return (
    <Pressable
      style={({ pressed }) => [styles.row, !isLast && styles.rowDivider, pressed && styles.rowPressed]}
      onPress={item.onPress}
      accessibilityRole="button"
      accessibilityLabel={item.label}
    >
      <View style={[styles.iconWrap, item.destructive && styles.iconWrapDestructive]}>
        {item.icon(iconColor)}
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: labelColor }]}>{item.label}</Text>
        {item.sublabel ? (
          <Text style={styles.rowSublabel}>{item.sublabel}</Text>
        ) : null}
      </View>
      {!item.destructive && (
        <IconChevron color="rgba(255,255,255,0.25)" />
      )}
    </Pressable>
  );
}

function MenuSection({ section }: { section: MenuSection }) {
  return (
    <View style={styles.section}>
      {section.title ? (
        <Text style={styles.sectionTitle}>{section.title}</Text>
      ) : null}
      <View style={styles.card}>
        {section.items.map((item, i) => (
          <MenuRow key={item.id} item={item} isLast={i === section.items.length - 1} />
        ))}
      </View>
    </View>
  );
}

// ─── Avatar / profile strip ───────────────────────────────────────────────────

function ProfileStrip() {
  return (
    <View style={styles.profileStrip}>
      <View style={styles.avatarWrap}>
        <LinearGradient
          colors={[CHICANE_VIOLET, PITLANE_PINK, BURNOUT_ORANGE]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.avatarInitials}>MR</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Mateo Ramírez</Text>
        <Text style={styles.profileEmail}>mateo.ramirez@apex.gt</Text>
      </View>
      <IconChevron color="rgba(255,255,255,0.35)" />
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

type Props = {
  onTabChange: (id: string) => void;
};

export default function MenuScreen({ onTabChange }: Props) {
  const insets = useSafeAreaInsets();
  const scrollBottom = insets.bottom + LAYOUT.tabBarBottom + LAYOUT.tabBarHeight + 16;

  return (
    <View style={styles.screen}>
      <GradientHeader title="Menú" variant="blue-gradient" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: scrollBottom }]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileStrip />
        {MENU_SECTIONS.map((section) => (
          <MenuSection key={section.title || 'logout'} section={section} />
        ))}
      </ScrollView>

      <TabBar active="menu" onChange={onTabChange} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const ICON_SIZE = 42;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 20,
    gap: 8,
  },

  // Profile strip
  profileStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13,71,161,0.6)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    padding: 16,
    marginBottom: 10,
    gap: 14,
  },
  avatarWrap: {
    width: ICON_SIZE + 10,
    height: ICON_SIZE + 10,
    borderRadius: 99,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic' as const,
    fontWeight: '800' as const,
    fontSize: 18,
    color: '#fff',
    letterSpacing: 0.5,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700' as const,
    fontSize: 16,
    color: '#fff',
    letterSpacing: -0.2,
  },
  profileEmail: {
    fontFamily: FONTS.interRegular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },

  // Sections
  section: {
    gap: 6,
  },
  sectionTitle: {
    fontFamily: FONTS.interBold,
    fontWeight: '700' as const,
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: 'rgba(13,71,161,0.6)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },

  // Rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  rowPressed: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  iconWrap: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDestructive: {
    backgroundColor: 'rgba(230,0,126,0.12)',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600' as const,
    fontSize: 15,
  },
  rowSublabel: {
    fontFamily: FONTS.interRegular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
});
