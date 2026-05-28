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
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LanguageProvider } from '@/contexts/LanguageContext';
import SplashScreen from '@/components/splash-screen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import ActivityScreen from '@/screens/activity-screen';
import CartScreen from '@/screens/cart-screen';
//import EventsScreen from '@/screens/events-screen';
import HomeScreen from '@/screens/home-screen';
import HubScreen from '@/screens/hub-screen';
import LessonDetailScreen from '@/screens/lesson-details-screen';
import LoginScreen from '@/screens/login-screen';
import MarketplaceScreen, { PRODUCTS } from '@/screens/marketplace-screen';
import MoreScreen from '@/screens/more-screen';
import ProductDetailScreen from '@/screens/product-details-screen';
import ProfileScreen from '@/screens/profile-screen';
import ScheduleScreen from '@/screens/schedule-screen';
import SurveyScreen from '@/screens/survey-screen';
import TeacherScreen from '@/screens/teacher-screen';
import WhosWhoScreen from '@/screens/whos-who-screen';

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
  | { screen: 'activity' }
  | { screen: 'events' }
  | { screen: 'hub' }
  | { screen: 'surveys' }
  | { screen: 'whoswho' };

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
    'Verdana': require('../assets/fonts/Verdana.ttf'),
    'Verdana-Bold': require('../assets/fonts/Verdana-Bold.ttf'),
    'Verdana-Italic': require('../assets/fonts/Verdana-Italic.ttf'),
    'Verdana-BoldItalic': require('../assets/fonts/Verdana-BoldItalic.ttf'),
    'Magistral-MediumItalic': require('../assets/fonts/fonnts.com-Magistral_Medium_Italic.otf'),
    'MachoModular-Bold': require('../assets/fonts/fonnts.com-MachoModular_Bold.otf'),
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

  // ── surveys ───────────────────────────────────────────────────────────────
  const handleOpenSurveys = useCallback(() => {
    setTabStacks(prev => ({ ...prev, home: { screen: 'surveys' } }));
  }, []);

  // ── activity ──────────────────────────────────────────────────────────────
  const handleOpenActivity = useCallback(() => {
    setTabStacks(prev => ({ ...prev, home: { screen: 'activity' } }));
  }, []);

  // ── events ────────────────────────────────────────────────────────────────
  const handleOpenEvents = useCallback(() => {
    setTabStacks(prev => ({ ...prev, home: { screen: 'events' } }));
  }, []);

  // ── hub ───────────────────────────────────────────────────────────────────
  const handleOpenHub = useCallback(() => {
    setTabStacks(prev => ({ ...prev, home: { screen: 'hub' } }));
  }, []);
  // ── home stack ────────────────────────────────────────────────────────────
  const handleOpenWhosWho = useCallback(() => {
    setTabStacks(prev => ({ ...prev, home: { screen: 'whoswho' } }));
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

  // ── menu stack ────────────────────────────────────────────────────────────
  const handleMenuNavigate = useCallback((screen: 'faqs' | 'menu-media' | 'contact' | 'language') => {
    setTabStacks(prev => ({ ...prev, menu: { screen } }));
  }, []);

  // ── universal back ────────────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    setTabStacks(prev => {
      const cur = prev[activeTab];
      if (!cur) return prev;

      switch (cur.screen) {
        // home
        case 'activity':
        case 'events':
        case 'hub':
        case 'surveys':
          return { ...prev, [activeTab]: null };
        // edu
        case 'teacher':
          return { ...prev, [activeTab]: { screen: 'lesson', classId: cur.classId } };
        case 'whoswho':
          return { ...prev, [activeTab]: null };
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
        // menu — all sub-screens go back to the menu root
        case 'faqs':
        case 'menu-media':
        case 'contact':
        case 'language':
          return { ...prev, [activeTab]: null };
        default:
          return { ...prev, [activeTab]: null };
      }
    });
  }, [activeTab]);

  const currentRoute = tabStacks[activeTab];

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LanguageProvider>
        <View style={{ flex: 1 }}>
          {stage === 'splash' && <SplashScreen onFinish={handleSplashFinish} />}
          {stage === 'login'  && <LoginScreen  onLogin={handleLogin} />}

          {stage === 'app' && (
            <>
              {/* Root tab screens — kept mounted, hidden when a detail is open */}
              <View style={{ flex: 1, display: currentRoute ? 'none' : 'flex' }}>
                {activeTab === 'home'   && <HomeScreen        onTabChange={handleTabChange} onOpenWhosWho={handleOpenWhosWho} onOpenEvents={handleOpenEvents} onOpenHub={handleOpenHub} onOpenActivity={handleOpenActivity} onOpenSurveys={handleOpenSurveys} />}
                {activeTab === 'cal'    && <ScheduleScreen    onTabChange={handleTabChange} onOpenClass={handleOpenClass} />}
                {activeTab === 'market' && <MarketplaceScreen onTabChange={handleTabChange} onOpenProduct={handleOpenProduct} />}
                {activeTab === 'user'   && <ProfileScreen     onTabChange={handleTabChange} onOpenClass={handleOpenClass} onLogout={handleLogout} />}
                {activeTab === 'menu'   && <MoreScreen        onTabChange={handleTabChange} />}
              </View>

              {/* ── Detail screens — absoluteFill so they sit above the root layer ── */}
              {currentRoute && (
                <View style={StyleSheet.absoluteFill}>
                  {currentRoute.screen === 'activity' && (
                    <ActivityScreen onBack={handleBack} />
                  )}
                  {currentRoute.screen === 'surveys' && (
                    <SurveyScreen onBack={handleBack} />
                  )}
                  {currentRoute.screen === 'hub' && (
                    <HubScreen onBack={handleBack} />
                  )}
                  {currentRoute.screen === 'whoswho' && (
                    <WhosWhoScreen onBack={handleBack} />
                  )}
                  {currentRoute.screen === 'lesson' && (
                    <LessonDetailScreen
                      classId={currentRoute.classId}
                      onBack={handleBack}
                      onTeacher={handleOpenTeacher}
                      onEnter={() => {}}
                    />
                  )}
                  {currentRoute.screen === 'teacher' && (
                    <TeacherScreen
                      classId={currentRoute.classId}
                      onBack={handleBack}
                    />
                  )}
                  {currentRoute.screen === 'product' && (
                    <ProductDetailScreen
                      onBack={handleBack}
                      onAddToCart={handleAddToCart}
                    />
                  )}
                  {currentRoute.screen === 'cart' && (
                    <CartScreen onPay={() => {}} />
                  )}
                </View>
              )}

              {/* ── Menu detail screens ── */}
              {currentRoute?.screen === 'faqs' && (
                <FaqsScreen onBack={handleBack} onTabChange={handleTabChange} />
              )}
              {currentRoute?.screen === 'menu-media' && (
                <MediaScreen onBack={handleBack} onTabChange={handleTabChange} />
              )}
              {currentRoute?.screen === 'contact' && (
                <ContactScreen onBack={handleBack} onTabChange={handleTabChange} />
              )}
              {currentRoute?.screen === 'language' && (
                <LanguageScreen onBack={handleBack} onTabChange={handleTabChange} />
              )}
            </>
          )}
        </View>
        <StatusBar style="light" />
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
