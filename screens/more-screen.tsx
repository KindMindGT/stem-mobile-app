import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Asset } from 'expo-asset';
import { useVideoPlayer, VideoView } from 'expo-video';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View
} from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { WebView } from 'react-native-webview';
import GradientHeader from '../components/gradient-header';
import TabBar from '../components/tab-bar';
import { AERO_SKY, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

const PDF_FILES = [
  {
    title: 'STEM Racing Competition Guidebook 2025 - 2026 PRIMARY',
    file: require('../assets/PDFs/1. STEM Racing Competition Guidebook 2025-2026 PRIMARY.pdf'),
  },
  {
    title: 'STEM Racing Development Technical Regulations 2025 - 2026',
    file: require('../assets/PDFs/2. STEM Racing Development Technical Regulations 2025-2026.pdf'),
  },
  {
    title: 'STEM Racing Entry Competition Guidebook 2025 - 2026',
    file: require('../assets/PDFs/3. STEM Racing Entry Competition Guidebook 2025 - 2026.pdf'),
  },
  {
    title: 'STEM Racing Professional Class Tech Regs 2025 - 2026',
    file: require('../assets/PDFs/4. STEM Racing Professional Class Tech Regs 202526.pdf'),
  },
  {
    title: 'STEM Racing Development and Professional Competition Rules',
    file: require('../assets/PDFs/5. Stem Racing Development and Professional Competition Rules.pdf'),
  },
];

async function openPdf(module: number) {
  try {
    const [asset] = await Asset.loadAsync(module);
    if (asset.localUri) await Linking.openURL(asset.localUri);
  } catch {
    // fallback
  }
}

const videoSource = require('../assets/videos/stem-racing.mp4');

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
    question: '¿Cuándo inicia el programa?',
    answer: 'El calendario oficial del próximo ciclo será anunciado por STEM Racing Guatemala en su página web y/o redes sociales oficiales. También si te suscribes al boletín mensual nuestro equipo te estará compartiendo: fechas de inicio, sesiones informativas, etapas del programa y próximos pasos.',
  },
  {
    id: 'f2',
    question: '¿Cuál es el costo de participación?',
    answer: 'El costo dependerá del tier en el que te encuentres, si cuentas con beca y modalidad de inscripción. Para recibir información específica, completa el formulario de contacto y nuestro equipo te compartirá los detalles disponibles.',
  },
  {
    id: 'f3',
    question: '¿Qué incluye la inscripción?',
    answer: 'La inscripción puede incluir acceso al programa académico, acompañamiento, materiales de trabajo, herramientas, sesiones formativas, actividades prácticas y participación en eventos o competencias según la categoría y ser parte de esta comunidad exclusiva. Los detalles finales se confirmarán según el nivel del estudiante, la modalidad del ciclo y los lineamientos oficiales del programa.',
  },
  {
    id: 'f4',
    question: '¿Cómo me registro?',
    answer: 'El primer paso es llenar el formulario de registro o contacto en la web. Después, el equipo de STEM Racing Guatemala se pondrá en contacto para orientarte según tu caso: estudiante, padre de familia, colegio, empresa, voluntario, mentor o aliado.',
  },
  {
    id: 'f5',
    question: '¿Quiénes pueden participar?',
    answer: 'Pueden participar niños y jóvenes de 6 a 19 años. El programa está dividido en tiers por edad y nivel de aprendizaje: Discovery, Primary, Entry, Development y Professional. Cada etapa adapta los retos, herramientas y contenidos al momento de desarrollo del estudiante.',
  },
  {
    id: 'f6',
    question: '¿Puedo participar si mi colegio no tiene el programa?',
    answer: 'Sí. Un estudiante puede mostrar interés de forma individual o en grupos (mínimo 4 - máximo 5) y llenar el formulario de contacto. El equipo de STEM Racing Guatemala le indicará las opciones disponibles para integrarse a un equipo, formar uno nuevo o participar en la modalidad correspondiente.',
  },
  {
    id: 'f7',
    question: '¿Cuántos estudiantes integran un equipo?',
    answer: 'Tomando como referencia los lineamientos internacionales y nacionales de STEM Racing, los equipos suelen estar conformados por 4 a 5 estudiantes.',
  },
  {
    id: 'f8',
    question: '¿Dónde se realizarán las clases o sesiones?',
    answer: 'Las sedes y formatos se confirmarán según el ciclo, las alianzas educativas y la disponibilidad del programa. Las actividades pueden requerir sesiones presenciales.',
  },
  {
    id: 'f9',
    question: '¿Todos los estudiantes compiten?',
    answer: 'La participación en competencias depende de la categoría, el avance del equipo y los lineamientos del programa. Algunas categorías tienen una experiencia más introductoria, mientras otras pueden avanzar hacia competencias nacionales, centroamericanas y mundiales.',
  },
  {
    id: 'f10',
    question: '¿Puede un equipo de Guatemala llegar a las World Finals?',
    answer: 'Sí. Un equipo de Guatemala puede aspirar a llegar a las World Finals si participa en el proceso competitivo correspondiente, cumple con los lineamientos oficiales y clasifica según su categoría. Según la estructura actual de STEM Racing Guatemala, la categoría Professional es la que puede aspirar a la Final Mundial.',
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

function InstagramIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Rect x={2} y={2} width={20} height={20} rx={5} stroke="#fff" strokeWidth={1.6} />
      <Circle cx={12} cy={12} r={5} stroke="#fff" strokeWidth={1.6} />
      <Circle cx={17.5} cy={6.5} r={1.2} fill="#fff" />
    </Svg>
  );
}

function TikTokIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.59 6.69A4.83 4.83 0 0 1 16.73 4.1V3.8h-2.83v9.38a3.12 3.12 0 0 1-1.95 2.9 3.12 3.12 0 0 1-3.44-.67 3.17 3.17 0 0 1-.02-4.48 3.12 3.12 0 0 1 3.43-.7V7.37a6.07 6.07 0 0 0-1.5-.2A5.96 5.96 0 0 0 8.3 16.28a5.96 5.96 0 0 0 10.3-4.23l.01-5.13a4.83 4.83 0 0 0 1.02-.23h-.04Z"
        fill="#fff"
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
  const player = useVideoPlayer(videoSource);

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

        {/* YouTube — local video */}
        <VideoView
          player={player}
          style={styles.localVideo}
          nativeControls
          contentFit="contain"
        />
        <Pressable
          style={styles.channelBtn}
          onPress={() => Linking.openURL('https://www.youtube.com/@STEMRacing_HQ')}
        >
          <Text style={styles.channelBtnText}>▶  Ver canal en YouTube</Text>
        </Pressable>

        {/* Instagram + TikTok side by side */}
        <View style={styles.socialRow}>
          {/* Instagram */}
          <View style={styles.socialCol}>
            <Image source={require('../assets/social/instagram.jpg')} style={styles.socialProfilePic} />
            <Pressable
              style={styles.socialBtn}
              onPress={() => Linking.openURL('https://www.instagram.com/stemracinggt/')}
            >
              <InstagramIcon />
              <Text style={styles.socialBtnText}>Seguir @stemracinggt</Text>
            </Pressable>
          </View>

          {/* TikTok */}
          <View style={styles.socialCol}>
            <Image source={require('../assets/social/tiktok.jpg')} style={styles.socialProfilePic} />
            <Pressable
              style={styles.socialBtn}
              onPress={() => Linking.openURL('https://www.tiktok.com/@stemracing_hq')}
            >
              <TikTokIcon />
              <Text style={styles.socialBtnText}>Seguir @stemracing_hq</Text>
            </Pressable>
          </View>
        </View>

<<<<<<< Updated upstream
        {/* ── Partners ──────────────────────────────────────────────────── */}
=======
        {/* ── Podcast ───────────────────────────────────────────────────── */}
        <Text style={[styles.sectionLabel, styles.mediaSectionLabel]}>Podcast</Text>

<<<<<<< Updated upstream
        {/* Player with playlist — listType=playlist shows the full playlist */}
        <View style={styles.webCard}>
          <WebView
            source={{ uri: 'https://www.youtube.com/embed/c_kSkzmQ4Os?list=PLBGlZc-MbXc3ANJgCGv05F_ezK8HeVFCU&listType=playlist&rel=0&modestbranding=1' }}
            style={styles.podcastWebView}
            scrollEnabled={false}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            allowsFullscreenVideo
          />
        </View>
        <Pressable
          style={styles.channelBtn}
          onPress={() => Linking.openURL('https://www.youtube.com/playlist?list=PLBGlZc-MbXc3ANJgCGv05F_ezK8HeVFCU')}
        >
          <Text style={styles.channelBtnText}>▶  Ver playlist completa</Text>
        </Pressable>
        <Text style={[styles.platformLabel, { marginBottom: 32 }]}>STEM Racing Podcast</Text>

        {/* ── Partners carrusel ─────────────────────────────────────────── */}
>>>>>>> Stashed changes
        <Text style={styles.partnersHeading}>Thank you partners</Text>

        {/* Powered by */}
        <Text style={styles.partnersCategoryLabel}>Powered by</Text>
        <View style={[styles.partnerCard, styles.partnerCardWhite]}>
<<<<<<< Updated upstream
          <Image
            source={require('../assets/images/shell.jpg')}
            style={styles.partnerLogoImage}
            resizeMode="contain"
          />
=======
          <Text style={styles.partnerLogoText}>🐚 Shell</Text>
=======
        {FAQS.map((faq) => (
          <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}

        {/* ── Partners ──────────────────────────────────────────────────── */}
        <Text style={styles.partnersHeading}>Thank you partners</Text>

        {/* Powered by */}
        <Text style={styles.partnersCategoryLabel}>Powered by</Text>
        <Pressable
          onPress={() => Linking.openURL('https://www.texacocontechron.com/gt/programas/puntos-texaco/?https://www.texacocontechron.com/gt/programas/puntos-texaco/?utm_source=google&utm_medium=paid&utm_campaign=puntostexaco&gad_source=1&gad_campaignid=23869454855&gbraid=0AAAABDYc-Brmk6UdhgBmGBsEzle4vGVmB&gclid=Cj0KCQjwlqTRBhCBARIsANrkrxi_-9huTl1_m5jGRsPc_6vE_t71dWZMrA6Q_CsS2ZhxP7NObfKQCt0aAgjyEALw_wcB')}
          accessibilityRole="link"
          accessibilityLabel="Texaco con Techron - Puntos Texaco"
          style={({ pressed }) => [styles.partnerCard, styles.partnerCardWhite, pressed && { opacity: 0.75 }]}
        >
          <Image
            source={require('../assets/images/texaco.jpeg')}
            style={styles.partnerLogoImage}
            resizeMode="contain"
          />
        </Pressable>

        {/* Allies */}
        <Text style={styles.partnersCategoryLabel}>allies</Text>
        <View style={styles.partnersGrid2}>
          <Pressable
            onPress={() => Linking.openURL('https://www.instagram.com/valvolinegt/')}
            accessibilityRole="link"
            accessibilityLabel="Valvoline GT - Instagram"
            style={({ pressed }) => [styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite, pressed && { opacity: 0.75 }]}
          >
            <Image
              source={require('../assets/images/valvoline.jpeg')}
              style={styles.partnerLogoImageLarge}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL('https://www.instagram.com/gulfoilguatemala/')}
            accessibilityRole="link"
            accessibilityLabel="Gulf Oil Guatemala - Instagram"
            style={({ pressed }) => [styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite, pressed && { opacity: 0.75 }]}
          >
            <Image
              source={require('../assets/images/gulf.jpeg')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </Pressable>
>>>>>>> Stashed changes
        </View>

        <Text style={styles.partnersCategoryLabel}>supported by</Text>
        <View style={styles.partnersGrid2}>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Text style={styles.partnerLogoText}>Honda</Text>
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Text style={styles.partnerLogoText}>Puma</Text>
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, { backgroundColor: '#1A1F71' }]}>
            <Text style={[styles.partnerLogoText, { color: '#fff', fontSize: 24 }]}>VISA</Text>
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Text style={styles.partnerLogoText}>Red Bull</Text>
          </View>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
        </View>

        {/* Allies */}
        <Text style={styles.partnersCategoryLabel}>allies</Text>
        <View style={styles.partnersGrid2}>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/paleta.webp')}
              style={styles.partnerLogoImageLarge}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/bi.png')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Supported by */}
        <Text style={styles.partnersCategoryLabel}>supported by</Text>
        <View style={styles.partnersGrid2}>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/honda-1596081_1280.webp')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/puma.jpg')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/visa.jpg')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/redbull.jpg')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
=======
          <Pressable
            onPress={() => Linking.openURL('https://www.instagram.com/kitkatcentroamerica/')}
            accessibilityRole="link"
            accessibilityLabel="KitKat Centroamérica - Instagram"
            style={({ pressed }) => [styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite, pressed && { opacity: 0.75 }]}
          >
            <Image
              source={require('../assets/images/kitkat.jpeg')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </Pressable>
>>>>>>> Stashed changes
        </View>

        {/* ── Terms & Conditions ───────────────────────────────────────── */}
        <Text style={[styles.sectionLabel, styles.mediaSectionLabel]}>Terms & Conditions</Text>

        <View style={styles.pdfList}>
          {PDF_FILES.map((pdf, i) => (
            <Pressable
              key={i}
              style={({ pressed }) => [styles.pdfItem, pressed && styles.pdfItemPressed]}
              onPress={() => openPdf(pdf.file)}
            >
              <Text style={styles.pdfItemText}>{pdf.title}</Text>
            </Pressable>
          ))}
        </View>

        {/* ── Contact Us ────────────────────────────────────────────────── */}
        <Text style={[styles.sectionLabel, styles.mediaSectionLabel]}>Contact Us</Text>

        <LinearGradient
          colors={['#009FE3', '#95C11F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.contactCard}
        >
          <Text style={styles.contactText}>HQ zona 14</Text>
          <Text style={styles.contactText}>10 avenida 11-83</Text>
          <Text style={styles.contactText}>horario 8am - 5pm</Text>

          <Pressable onPress={() => Linking.openURL('mailto:hola@stemracing.gt')}>
            <Text style={[styles.contactText, styles.contactLink, { marginTop: 16 }]}>hola@stemracing.gt</Text>
          </Pressable>

          <Pressable onPress={() => Linking.openURL('https://www.stemracing.gt')}>
            <Text style={[styles.contactText, styles.contactLink, { marginTop: 12 }]}>www.stemracing.gt</Text>
          </Pressable>

          <Pressable onPress={() => Linking.openURL('tel:+50223691199')}>
            <Text style={[styles.contactText, styles.contactLink, { marginTop: 12 }]}>+502 2369 - 1199</Text>
          </Pressable>
        </LinearGradient>
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
  localVideo: {
    width: CONTENT_WIDTH,
    height: 220,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: '#000',
  },
  channelBtn: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    marginBottom: 24,
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
    marginBottom: 32,
  },
  socialCol: {
    flex: 1,
  },
  socialProfilePic: {
    width: HALF_WIDTH / 2,
    height: HALF_WIDTH / 2,
    borderRadius: 12,
    backgroundColor: '#000',
    marginBottom: 8,
    alignSelf: 'center',
  },
  socialBtn: {
    backgroundColor: AERO_SKY,
    borderRadius: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 6,
  },
  socialBtnText: {
    fontFamily: FONTS.interBold,
    fontSize: 11,
    color: '#fff',
  },
  // ── Partners
  partnersHeading: {
    ...TEXT.h2,
    fontSize: 20,
    lineHeight: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  partnersCategoryLabel: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 10,
    marginTop: 4,
  },
  partnerCard: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  partnerCard2: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 0,
  },
  partnerCardWhite: { backgroundColor: '#fff' },
  partnersGrid2: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  partnerLogoImage: {
    width: '100%',
    height: 90,
  },
  partnerLogoImageLarge: {
    width: '100%',
    height: 110,
  },

  // ── Terms & Conditions
  pdfList: {
    gap: 8,
    marginBottom: 10,
  },
  pdfItem: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  pdfItemPressed: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  pdfItemText: {
    fontFamily: FONTS.interSemiBold,
    fontSize: 13,
    color: '#fff',
    lineHeight: 18,
  },

  // ── Contact Us
  contactCard: {
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 28,
    marginBottom: 32,
  },
  contactText: {
    fontFamily: FONTS.interRegular,
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  contactLink: {
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(255,255,255,0.6)',
  },
});
