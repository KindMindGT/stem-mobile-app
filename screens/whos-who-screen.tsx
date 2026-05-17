import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import GradientHeader from '../components/gradient-header';
import PhotoCircle from '../components/photo-circle';
import { BURNOUT_ORANGE, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

// ─── Data ──────────────────────────────────────────────────────────────────────

type Person = {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  email?: string;
  country?: string;
};

type CategoryKey = 'team' | 'students' | 'judges' | 'mentors';

const PEOPLE: Record<CategoryKey, Person[]> = {
  team: [
    {
      id: 't1', initials: 'RO',
      name: 'Reneé Ordonez', role: 'ICC GT',
      bio: 'Directora del programa STEM Racing en Guatemala. Coordina operaciones y relaciones institucionales.',
      email: 'renee@stemracing.gt', country: 'Guatemala',
    },
    {
      id: 't2', initials: 'IO',
      name: 'Inés Ordonez', role: 'Lead Academic',
      bio: 'Responsable del currículo académico y formación de instructores del programa.',
      email: 'ines@stemracing.gt', country: 'Guatemala',
    },
    {
      id: 't3', initials: 'GR',
      name: 'Gabriel Rodriguez', role: 'Lead E&D',
      bio: 'Lidera el área de Ingeniería y Diseño. Supervisa proyectos técnicos de los equipos.',
      email: 'gabriel@stemracing.gt', country: 'Guatemala',
    },
    {
      id: 't4', initials: 'PM',
      name: 'Pablo Melendez', role: 'PMI Academic',
      bio: 'Especialista en gestión de proyectos. Conduce sesiones PMI con los estudiantes.',
      email: 'pablo@stemracing.gt', country: 'Guatemala',
    },
    {
      id: 't5', initials: 'AK',
      name: 'Anakin Skywalker', role: 'Mascot',
      bio: 'Mascota oficial del equipo. Experto en hacer feliz a todo el hub.',
      country: 'Guatemala',
    },
    {
      id: 't6', initials: 'CO',
      name: 'Cecilia Osoy', role: 'Lawyer',
      bio: 'Asesora legal del programa. Gestiona contratos y cumplimiento normativo.',
      email: 'cecilia@stemracing.gt', country: 'Guatemala',
    },
  ],
  students: [
    {
      id: 's1', initials: 'MR',
      name: 'Mateo Ramírez', role: 'Nivel 2 · Hub Zona 10',
      bio: 'Estudiante entusiasta de aerodinámica. Ha completado 24 clases con 92% de asistencia.',
      country: 'Guatemala',
    },
    {
      id: 's2', initials: 'FC',
      name: 'Facundo Casse', role: 'Nivel 3 · Hub Zona 10',
      bio: 'Especializado en telemetría y análisis de datos de carrera.',
      country: 'Guatemala',
    },
    {
      id: 's3', initials: 'JP',
      name: 'Juan P. Rodas', role: 'Nivel 2 · Hub Zona 10',
      bio: 'Apasionado del diseño de chasis. Ganó el premio de mejor diseño 2024.',
      country: 'Guatemala',
    },
    {
      id: 's4', initials: 'FB',
      name: 'Fredy Bressani', role: 'Nivel 1 · Hub Zona 14',
      bio: 'Primer año en el programa. Destaca en matemáticas aplicadas.',
      country: 'Guatemala',
    },
    {
      id: 's5', initials: 'DC',
      name: 'Daniel Castaneda', role: 'Nivel 2 · Hub Zona 14',
      bio: 'Interesado en motores eléctricos y sostenibilidad en el automovilismo.',
      country: 'Guatemala',
    },
  ],
  judges: [
    {
      id: 'j1', initials: 'HT',
      name: 'Hasso Tangelmann', role: 'Juez Principal',
      bio: 'Ingeniero automotriz con 20 años de experiencia en la Fórmula E. Evalúa diseño técnico.',
      country: 'Alemania',
    },
    {
      id: 'j2', initials: 'LM',
      name: 'Laura Martínez', role: 'Juez de Innovación',
      bio: 'Directora de I+D en Shell Motorsport. Especialista en combustibles sostenibles.',
      country: 'España',
    },
    {
      id: 'j3', initials: 'KS',
      name: 'Kenji Suzuki', role: 'Juez de Estrategia',
      bio: 'Ex estratega de equipo en la Super Formula japonesa. Evalúa planificación de carrera.',
      country: 'Japón',
    },
  ],
  mentors: [
    {
      id: 'm1', initials: 'AS',
      name: 'Andrea Solís', role: 'Ingeniera de Pista',
      bio: 'Diseña suspensiones de karts profesionales desde 2018. Estudió Ingeniería Mecánica en la USAC.',
      email: 'andrea@stemracing.gt', country: 'Guatemala',
    },
    {
      id: 'm2', initials: 'CR',
      name: 'Carlos Reyes', role: 'Mentor de Electrónica',
      bio: 'Ingeniero electrónico especializado en sensores y sistemas embebidos para motorsport.',
      country: 'Guatemala',
    },
    {
      id: 'm3', initials: 'VM',
      name: 'Valeria Morales', role: 'Mentora de Liderazgo',
      bio: 'Coach certificada en liderazgo juvenil. Trabaja con los capitanes de equipo.',
      country: 'Guatemala',
    },
  ],
};

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'team',     label: 'Team'     },
  { key: 'students', label: 'Students' },
  { key: 'judges',   label: 'Judges'   },
  { key: 'mentors',  label: 'Mentors'  },
];

// ─── Icons ─────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke="rgba(255,255,255,0.5)" strokeWidth={1.8} />
      <Path d="M16.5 16.5 L21 21" stroke="rgba(255,255,255,0.5)" strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d={expanded ? 'M6 15 L12 9 L18 15' : 'M9 18 L15 12 L9 6'}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BackIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── PersonRow ─────────────────────────────────────────────────────────────────

function PersonRow({ person }: { person: Person }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.personCard}>
      <Pressable
        style={({ pressed }) => [styles.personRow, pressed && styles.personRowPressed]}
        onPress={() => setExpanded(v => !v)}
        accessibilityRole="button"
        accessibilityLabel={person.name}
        accessibilityState={{ expanded }}
      >
        <PhotoCircle size={46} initials={person.initials} ring={false} />
        <Text style={styles.personLabel} numberOfLines={1}>
          {person.name}
          <Text style={styles.personRole}>{' / '}{person.role}</Text>
        </Text>
        <ChevronIcon expanded={expanded} />
      </Pressable>

      {expanded && (
        <View style={styles.expandedBlock}>
          <Text style={styles.bioText}>{person.bio}</Text>
          <View style={styles.metaRow}>
            {person.country && (
              <View style={styles.metaChip}>
                <Text style={styles.metaText}>📍 {person.country}</Text>
              </View>
            )}
            {person.email && (
              <View style={styles.metaChip}>
                <Text style={styles.metaText}>✉️ {person.email}</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

// ─── Screen ────────────────────────────────────────────────────────────────────

type Props = {
  onBack: () => void;
};

export default function WhosWhoScreen({ onBack }: Props) {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('team');
  const [query, setQuery] = useState('');

  const people = PEOPLE[activeCategory];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return people;
    return people.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q),
    );
  }, [people, query]);

  return (
    <View style={styles.screen}>
      <GradientHeader title="Who's Who" variant="blue-gradient" />

      {/* Back button overlaid on header */}
      <Pressable
        style={[styles.backBtn, { top: insets.top + 12 }]}
        onPress={onBack}
        hitSlop={12}
        accessibilityLabel="atrás"
      >
        <BackIcon />
      </Pressable>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="rgba(255,255,255,0.45)"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Category tabs */}
      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => {
          const isActive = cat.key === activeCategory;
          return (
            <Pressable
              key={cat.key}
              onPress={() => { setActiveCategory(cat.key); setQuery(''); }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                {cat.label}
              </Text>
              {isActive && (
                <LinearGradient
                  colors={[PITLANE_PINK, BURNOUT_ORANGE]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.categoryUnderline}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      {/* List */}
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {filtered.length === 0 ? (
          <Text style={styles.emptyText}>Sin resultados para "{query}"</Text>
        ) : (
          filtered.map(person => (
            <PersonRow key={person.id} person={person} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
  },
  flex: { flex: 1 },

  backBtn: {
    position: 'absolute',
    left: 18,
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search
  searchWrap: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 16,
    paddingBottom: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.interRegular,
    fontSize: 15,
    color: '#fff',
    padding: 0,
  },

  // Category tabs
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 14,
    paddingBottom: 0,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 8,
  },
  categoryLabel: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700' as const,
    fontSize: 16,
    color: 'rgba(255,255,255,0.45)',
    paddingBottom: 10,
  },
  categoryLabelActive: {
    color: '#fff',
  },
  categoryUnderline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 3,
    borderRadius: 99,
  },

  // List
  listContent: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 8,
    gap: 8,
  },

  // Person card
  personCard: {
    backgroundColor: 'rgba(10,30,90,0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  personRowPressed: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  personLabel: {
    flex: 1,
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600' as const,
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.1,
  },
  personRole: {
    fontFamily: FONTS.interRegular,
    fontWeight: '400' as const,
    fontSize: 15,
    color: 'rgba(255,255,255,0.65)',
  },

  // Expanded block
  expandedBlock: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    gap: 10,
  },
  bioText: {
    ...TEXT.body,
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 10,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  metaText: {
    fontFamily: FONTS.interRegular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
  },

  // Empty
  emptyText: {
    ...TEXT.bodyMuted,
    textAlign: 'center',
    marginTop: 32,
  },
});
