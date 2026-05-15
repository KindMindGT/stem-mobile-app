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
import TeacherScreen from '@/screens/teacher-screen';

ExpoSplashScreen.preventAutoHideAsync();

type AppStage = 'splash' | 'login' | 'app';
type TabId = 'home' | 'cal' | 'market' | 'user' | 'menu';

// Discriminated union of all detail routes a tab can push
type TabRoute =
  | { screen: 'lesson';  classId: string }
  | { screen: 'teacher'; classId: string }; // classId kept so back() can restore lesson

// Each tab holds its own current route (null = root screen)
type TabStacks = Record<TabId, TabRoute | null>;

const INITIAL_TAB_STACKS: TabStacks = {
  home: null, cal: null, market: null, user: null, menu: null,
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [stage, setStage]       = useState<AppStage>('splash');
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

  const handleLogin = useCallback(() => setStage('app'), []);

  const handleLogout = useCallback(() => {
    setStage('login');
    setTabStacks(INITIAL_TAB_STACKS);
    setActiveTab('home');
  }, []);

  // Switch tabs — never touches another tab's route
  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id as TabId);
  }, []);

  // Push LessonDetail onto the active tab's stack
  const handleOpenClass = useCallback((classId: string) => {
    setTabStacks(prev => ({ ...prev, [activeTab]: { screen: 'lesson', classId } }));
  }, [activeTab]);

  // Push TeacherScreen on top of the current lesson (preserving classId for back)
  const handleOpenTeacher = useCallback(() => {
    setTabStacks(prev => {
      const current = prev[activeTab];
      if (current?.screen !== 'lesson') return prev;
      return { ...prev, [activeTab]: { screen: 'teacher', classId: current.classId } };
    });
  }, [activeTab]);

  // Pop: teacher → lesson → root
  const handleBack = useCallback(() => {
    setTabStacks(prev => {
      const current = prev[activeTab];
      if (!current) return prev;
      if (current.screen === 'teacher') {
        // go back to the lesson that opened this teacher
        return { ...prev, [activeTab]: { screen: 'lesson', classId: current.classId } };
      }
      // lesson → root
      return { ...prev, [activeTab]: null };
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
              {/* Root tab screens — kept mounted but hidden when a detail is open */}
              <View style={{ flex: 1, display: currentRoute ? 'none' : 'flex' }}>
                {activeTab === 'home'   && <HomeScreen     onTabChange={handleTabChange} />}
                {activeTab === 'cal'    && <ScheduleScreen onTabChange={handleTabChange} onOpenClass={handleOpenClass} />}
                {activeTab === 'market' && <View style={{ flex: 1 }} />}
                {activeTab === 'user'   && <ProfileScreen  onTabChange={handleTabChange} onOpenClass={handleOpenClass} onLogout={handleLogout} />}
                {activeTab === 'menu'   && <MenuScreen     onTabChange={handleTabChange} />}
              </View>

              {/* Lesson detail */}
              {currentRoute?.screen === 'lesson' && (
                <LessonDetailScreen
                  classId={currentRoute.classId}
                  onBack={handleBack}
                  onTeacher={handleOpenTeacher}
                  onEnter={() => {}}
                />
              )}

              {/* Teacher profile — slides on top of lesson detail */}
              {currentRoute?.screen === 'teacher' && (
                <TeacherScreen
                  classId={currentRoute.classId}
                  onBack={handleBack}
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
