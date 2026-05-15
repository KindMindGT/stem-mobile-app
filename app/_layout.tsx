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
import HomeScreen from '@/screens/home-screen';
import LessonDetailScreen from '@/screens/lesson-details-screen';
import LoginScreen from '@/screens/login-screen';
import MenuScreen from '@/screens/menu-screen';
import ProfileScreen from '@/screens/profile-screen';
import ScheduleScreen from '@/screens/schedule-screen';

ExpoSplashScreen.preventAutoHideAsync();

type AppStage = 'splash' | 'login' | 'app';
type TabId = 'home' | 'cal' | 'market' | 'user' | 'menu';

// Each tab has its own independent navigation stack.
// null = showing the tab's root screen; string = showing lesson details for that classId.
type TabStacks = Record<TabId, string | null>;

const INITIAL_TAB_STACKS: TabStacks = {
  home: null,
  cal: null,
  market: null,
  user: null,
  menu: null,
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [stage, setStage] = useState<AppStage>('splash');
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

  const handleSplashFinish = useCallback(() => setStage('login'), []);
  const handleLogin       = useCallback(() => setStage('app'), []);
  const handleLogout      = useCallback(() => {
    setStage('login');
    setTabStacks(INITIAL_TAB_STACKS);
    setActiveTab('home');
  }, []);

  // Switch tabs — never affects the stack of other tabs
  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id as TabId);
  }, []);

  // Push lesson detail onto the current tab's stack
  const handleOpenClass = useCallback((classId: string) => {
    setTabStacks(prev => ({ ...prev, [activeTab]: classId }));
  }, [activeTab]);

  // Pop back to the tab's root screen
  const handleBack = useCallback(() => {
    setTabStacks(prev => ({ ...prev, [activeTab]: null }));
  }, [activeTab]);

  // Convenience: is the current tab showing a detail screen?
  const currentDetail = tabStacks[activeTab];

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          {stage === 'splash' && <SplashScreen onFinish={handleSplashFinish} />}
          {stage === 'login'  && <LoginScreen  onLogin={handleLogin} />}

          {stage === 'app' && (
            <>
              {/* Root screens — hidden (not unmounted) when a detail is open */}
              <View style={{ flex: 1, display: currentDetail ? 'none' : 'flex' }}>
                {activeTab === 'home'   && <HomeScreen     onTabChange={handleTabChange} />}
                {activeTab === 'cal'    && <ScheduleScreen onTabChange={handleTabChange} onOpenClass={handleOpenClass} />}
                {activeTab === 'market' && <View style={{ flex: 1 }} />}
                {activeTab === 'user'   && <ProfileScreen  onTabChange={handleTabChange} onOpenClass={handleOpenClass} onLogout={handleLogout} />}
                {activeTab === 'menu'   && <MenuScreen     onTabChange={handleTabChange} />}
              </View>

              {/* Detail screen — rendered on top when a classId is set for the active tab */}
              {currentDetail !== null && (
                <LessonDetailScreen
                  classId={currentDetail}
                  onBack={handleBack}
                  onTeacher={() => {}}
                  onEnter={() => {}}
                />
              )}
            </>
          )}
        </View>
        <StatusBar style="light" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
