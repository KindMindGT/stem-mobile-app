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
};

// Heading typefaces: typeface + weight + italic only.
// Callers always specify fontSize/lineHeight/letterSpacing — sizes vary too much per surface.
const archivoItalicExtra = {
  fontFamily: FONTS.archivoExtraBoldItalic,
  fontStyle: 'italic' as const,
  fontWeight: '800' as const,
  color: '#fff',
};
const archivoItalicBlack = {
  fontFamily: FONTS.archivoBlackItalic,
  fontStyle: 'italic' as const,
  fontWeight: '900' as const,
  color: '#fff',
};

export const TEXT = {
  // `display` is the only heading used at one fixed size across the app.
  display: {
    ...archivoItalicBlack,
    fontSize: 46,
    letterSpacing: -1,
    lineHeight: 44,
  },
  // Heading templates — caller specifies size + tracking.
  h1: archivoItalicBlack,
  h2: archivoItalicExtra,
  h3: archivoItalicExtra,
  ctaLabel: {
    ...archivoItalicExtra,
    fontSize: 19,
    letterSpacing: 0.2,
  },
  body: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.78)',
  },
  bodyMuted: {
    fontFamily: FONTS.interRegular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  eyebrow: {
    fontFamily: FONTS.interBold,
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.55)',
  },
  smallCaps: {
    fontFamily: FONTS.interBold,
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 2.5,
    color: 'rgba(255,255,255,0.6)',
  },
  tabLabel: {
    fontFamily: FONTS.interBold,
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 2.5,
  },
};
