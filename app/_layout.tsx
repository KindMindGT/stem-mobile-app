import {
  Archivo_400Regular,
  Archivo_600SemiBold,
  Archivo_700Bold,
  Archivo_700Bold_Italic,
  Archivo_800ExtraBold,
  Archivo_800ExtraBold_Italic,
  Archivo_900Black_Italic,
} from '@expo-google-fonts/archivo';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from '@/components/splash-screen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import CartScreen from '@/screens/cart-screen';
import EventsScreen from '@/screens/events-screen';
import HomeScreen from '@/screens/home-screen';
import HubScreen from '@/screens/hub-screen';
import LessonDetailScreen from '@/screens/lesson-details-screen';
import LoginScreen from '@/screens/login-screen';
import MarketplaceScreen, { PRODUCTS } from '@/screens/marketplace-screen';
import MoreScreen from '@/screens/more-screen';
import ProductDetailScreen from '@/screens/product-details-screen';
import ProfileScreen from '@/screens/profile-screen';
import ScheduleScreen from '@/screens/schedule-screen';
import TeacherScreen from '@/screens/teacher-screen';

ExpoSplashScreen.preventAutoHideAsync();

type AppStage = 'splash' | 'login' | 'app';
type TabId = 'home' | 'cal' | 'market' | 'user' | 'menu';

// All possible detail routes across every tab
type TabRoute =
  // edu tab routes
  | { screen: 'lesson';   classId: string }
  | { screen: 'teacher';  classId: string }
  // market tab routes
  | { screen: 'product';  productId: string }
  | { screen: 'cart';     fromProductId: string | null }
  // home tab routes
  | { screen: 'events' }
  | { screen: 'hub' };

type TabStacks = Record<TabId, TabRoute | null>;

const INITIAL_TAB_STACKS: TabStacks = {
  home: null, cal: null, market: null, user: null, menu: null,
};

export default function RootLayout() {
  const colorScheme  = useColorScheme();
  const [stage, setStage]         = useState<AppStage>('splash');
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [tabStacks, setTabStacks] = useState<TabStacks>(INITIAL_TAB_STACKS);

  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Archivo_700Bold_Italic,
    Archivo_800ExtraBold,
    Archivo_800ExtraBold_Italic,
    Archivo_900Black_Italic,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) ExpoSplashScreen.hideAsync();
  }, [fontsLoaded]);

  // ── stage transitions ─────────────────────────────────────────────────────
  const handleSplashFinish = useCallback(() => setStage('login'), []);
  const handleLogin = useCallback(() => setStage('app'), []);
  const handleLogout = useCallback(() => {
    setStage('login');
    setTabStacks(INITIAL_TAB_STACKS);
    setActiveTab('home');
  }, []);

  // ── tab navigation ────────────────────────────────────────────────────────
  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id as TabId);
  }, []);

  // ── events ────────────────────────────────────────────────────────────────
  const handleOpenEvents = useCallback(() => {
    setTabStacks(prev => ({ ...prev, home: { screen: 'events' } }));
  }, []);

  // ── hub ───────────────────────────────────────────────────────────────────
  const handleOpenHub = useCallback(() => {
    setTabStacks(prev => ({ ...prev, home: { screen: 'hub' } }));
  }, []);

  // ── edu stack ─────────────────────────────────────────────────────────────
  const handleOpenClass = useCallback((classId: string) => {
    setTabStacks(prev => ({ ...prev, [activeTab]: { screen: 'lesson', classId } }));
  }, [activeTab]);

  const handleOpenTeacher = useCallback(() => {
    setTabStacks(prev => {
      const cur = prev[activeTab];
      if (cur?.screen !== 'lesson') return prev;
      return { ...prev, [activeTab]: { screen: 'teacher', classId: cur.classId } };
    });
  }, [activeTab]);

  // ── market stack ──────────────────────────────────────────────────────────
  const handleOpenProduct = useCallback((product: typeof PRODUCTS[0]) => {
    setTabStacks(prev => ({ ...prev, market: { screen: 'product', productId: product.id } }));
  }, []);

  const handleAddToCart = useCallback(() => {
    setTabStacks(prev => {
      const cur = prev.market;
      const fromProductId = cur?.screen === 'product' ? cur.productId : null;
      return { ...prev, market: { screen: 'cart', fromProductId } };
    });
  }, []);

  // ── universal back ────────────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    setTabStacks(prev => {
      const cur = prev[activeTab];
      if (!cur) return prev;

      switch (cur.screen) {
        case 'events':
        case 'hub':
          return { ...prev, [activeTab]: null };
        case 'teacher':
          return { ...prev, [activeTab]: { screen: 'lesson', classId: cur.classId } };
        case 'lesson':
          return { ...prev, [activeTab]: null };
        case 'cart':
          return {
            ...prev,
            market: cur.fromProductId
              ? { screen: 'product', productId: cur.fromProductId }
              : null,
          };
        case 'product':
          return { ...prev, market: null };
        default:
          return { ...prev, [activeTab]: null };
      }
    });
  }, [activeTab]);

  const currentRoute = tabStacks[activeTab];

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          {stage === 'splash' && <SplashScreen onFinish={handleSplashFinish} />}
          {stage === 'login'  && <LoginScreen  onLogin={handleLogin} />}

          {stage === 'app' && (
            <>
              {/* Root tab screens — kept mounted, hidden when a detail is open */}
              <View style={{ flex: 1, display: currentRoute ? 'none' : 'flex' }}>
                {activeTab === 'home'   && <HomeScreen        onTabChange={handleTabChange} onOpenEvents={handleOpenEvents} onOpenHub={handleOpenHub} />}
                {activeTab === 'cal'    && <ScheduleScreen    onTabChange={handleTabChange} onOpenClass={handleOpenClass} />}
                {activeTab === 'market' && <MarketplaceScreen onTabChange={handleTabChange} onOpenProduct={handleOpenProduct} />}
                {activeTab === 'user'   && <ProfileScreen     onTabChange={handleTabChange} onOpenClass={handleOpenClass} onLogout={handleLogout} />}
                {activeTab === 'menu'   && <MoreScreen        onTabChange={handleTabChange} />}
              </View>

              {/* ── Home detail screens ── */}
              {currentRoute?.screen === 'events' && (
                <EventsScreen onBack={handleBack} />
              )}
              {currentRoute?.screen === 'hub' && (
                <HubScreen onBack={handleBack} />
              )}

              {/* ── Edu detail screens ── */}
              {currentRoute?.screen === 'lesson' && (
                <LessonDetailScreen
                  classId={currentRoute.classId}
                  onBack={handleBack}
                  onTeacher={handleOpenTeacher}
                  onEnter={() => {}}
                />
              )}
              {currentRoute?.screen === 'teacher' && (
                <TeacherScreen
                  classId={currentRoute.classId}
                  onBack={handleBack}
                />
              )}

              {/* ── Market detail screens ── */}
              {currentRoute?.screen === 'product' && (
                <ProductDetailScreen
                  onBack={handleBack}
                  onAddToCart={handleAddToCart}
                />
              )}
              {currentRoute?.screen === 'cart' && (
                <CartScreen onPay={() => {}} />
              )}
            </>
          )}
        </View>
        <StatusBar style="light" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
