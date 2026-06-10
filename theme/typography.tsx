// ─── Font system ───────────────────────────────────────────────────────────────
//
// Brand fonts (loaded as local .otf assets in app/_layout.tsx):
//   MagistralExtraBoldItalic  → all titles and subtitles (H1–H2)
//   MachoModularMedium        → all subheadings (H3–H5), body, labels
//
// All legacy Archivo / Inter FONTS tokens are remapped to the brand fonts so
// that every file using FONTS.archivoBold, FONTS.interRegular, etc. picks up
// the new typefaces automatically without file-by-file changes.

// PostScript names read directly from the .otf files:
//   Magistral Extra Bold Italic  →  'Magistral-ExtraBoldItalic'
//   MachoModular Medium          →  'MachoModular-Medium'
// React Native (iOS/Android) resolves fontFamily by PostScript name,
// so these strings must match exactly.

export const FONTS = {
  // ── Brand fonts ────────────────────────────────────────────────────────────
  magistralExtraBoldItalic: 'Magistral-ExtraBoldItalic',
  machoModularMedium:       'MachoModular-Medium',

  // ── Archivo tokens → Magistral (heading / title roles) ────────────────────
  archivoRegular:           'Magistral-ExtraBoldItalic',
  archivoSemiBold:          'Magistral-ExtraBoldItalic',
  archivoBold:              'Magistral-ExtraBoldItalic',
  archivoExtraBold:         'Magistral-ExtraBoldItalic',
  archivoBoldItalic:        'Magistral-ExtraBoldItalic',
  archivoExtraBoldItalic:   'Magistral-ExtraBoldItalic',
  archivoBlackItalic:       'Magistral-ExtraBoldItalic',

  // ── Inter tokens → MachoModular (body / label roles) ──────────────────────
  interRegular:             'MachoModular-Medium',
  interMedium:              'MachoModular-Medium',
  interSemiBold:            'MachoModular-Medium',
  interBold:                'MachoModular-Medium',
};

// ─── Base style objects ────────────────────────────────────────────────────────

const magistral = {
  fontFamily: FONTS.magistralExtraBoldItalic,
  color: '#fff',
};

const macho = {
  fontFamily: FONTS.machoModularMedium,
  color: '#fff',
};

// ─── TEXT scale ────────────────────────────────────────────────────────────────

export const TEXT = {
  // Display — largest one-off heading (fixed size)
  display: {
    ...magistral,
    fontSize: 46,
    letterSpacing: -1,
    lineHeight: 44,
  },

  // H1 & H2 → Magistral Extra Bold Italic
  h1: magistral,
  h2: magistral,

  // H3, H4, H5 → MachoModular Medium
  h3: macho,
  h4: macho,
  h5: macho,

  // Body → MachoModular Medium
  body: {
    ...macho,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.78)',
  },
  bodyMuted: {
    ...macho,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },

  // UI chrome (tabs, eyebrows, CTAs, smallCaps) → MachoModular Medium
  ctaLabel: {
    ...magistral,
    fontSize: 19,
    letterSpacing: 0.2,
  },
  eyebrow: {
    ...macho,
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.55)',
  },
  smallCaps: {
    ...macho,
    fontSize: 10,
    letterSpacing: 2.5,
    color: 'rgba(255,255,255,0.6)',
  },
  tabLabel: {
    ...macho,
    fontSize: 13,
    letterSpacing: 2.5,
  },
};
