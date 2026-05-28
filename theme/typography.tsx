export const FONTS = {
  archivoRegular: 'Archivo_400Regular',
  archivoSemiBold: 'Archivo_600SemiBold',
  archivoBold: 'Archivo_700Bold',
  archivoExtraBold: 'Archivo_800ExtraBold',
  archivoBoldItalic: 'Archivo_700Bold_Italic',
  archivoExtraBoldItalic: 'Archivo_800ExtraBold_Italic',
  archivoBlackItalic: 'Archivo_900Black_Italic',
  interRegular: 'Inter_400Regular',
  interMedium: 'Inter_500Medium',
  interSemiBold: 'Inter_600SemiBold',
  interBold: 'Inter_700Bold',
  magistralItalic: 'Magistral-MediumItalic',
  machoModular: 'MachoModular-Bold',
  verdana: 'Verdana',
  verdanaBold: 'Verdana-Bold',
  verdanaItalic: 'Verdana-Italic',
  verdanaBoldItalic: 'Verdana-BoldItalic',
};

const headingMagistral = {
  fontFamily: FONTS.magistralItalic,
  fontStyle: 'italic' as const,
  color: '#fff',
};

export const TEXT = {
  display: {
    ...headingMagistral,
    fontSize: 46,
    letterSpacing: -1,
    lineHeight: 44,
  },
  h1: headingMagistral,
  h2: headingMagistral,
  h3: headingMagistral,
  ctaLabel: {
    ...headingMagistral,
    fontSize: 19,
    letterSpacing: 0.2,
  },
  sectionTitle: {
    fontFamily: FONTS.machoModular,
    fontSize: 20,
    color: '#E6007E',
  },
  body: {
    fontFamily: FONTS.verdana,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.78)',
  },
  bodyMuted: {
    fontFamily: FONTS.verdana,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  eyebrow: {
    fontFamily: FONTS.verdanaBold,
    fontWeight: '700' as const,
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.55)',
  },
  smallCaps: {
    fontFamily: FONTS.verdanaBold,
    fontWeight: '700' as const,
    fontSize: 10,
    letterSpacing: 2.5,
    color: 'rgba(255,255,255,0.6)',
  },
  tabLabel: {
    fontFamily: FONTS.verdanaBold,
    fontWeight: '700' as const,
    fontSize: 13,
    letterSpacing: 2.5,
  },
};
