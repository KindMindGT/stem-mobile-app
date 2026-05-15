import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import GradientHeader from '../components/gradient-header';
import TabBar from '../components/tab-bar';
import { BURNOUT_ORANGE, CHICANE_VIOLET, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS } from '../theme/typography';

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconSettings({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
      <Path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconNotification({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function IconHelp({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
      <Path
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        stroke={color} strokeWidth={2} strokeLinecap="round"
      />
      <Circle cx="12" cy="17" r="0.5" fill={color} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

function IconTerms({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function IconPrivacy({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconAbout({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
      <Path d="M12 16v-4M12 8h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function IconLogout({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
        stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M16 17l5-5-5-5M21 12H9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconChevron({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

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
