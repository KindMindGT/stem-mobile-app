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

// Tab IDs match exactly what TabBar passes to onChange
type TabId = 'home' | 'cal' | 'market' | 'user' | 'menu';

type DetailScreenId = 'cal' | 'class';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [stage, setStage] = useState<AppStage>('splash');
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [activeDetailScreen, setActiveDetailScreen] = useState<DetailScreenId>('cal');

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
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSplashFinish = useCallback(() => setStage('login'), []);
  const handleLogin = useCallback(() => setStage('app'), []);
  const handleTabChange = useCallback((id: string) => setActiveTab(id as TabId), []);
  const handleOpenClass = useCallback((id: string) => setActiveDetailScreen(id as DetailScreenId), []);

  return (
    <SafeAreaProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        {/* Pre-app stages — rendered on top via absolute fill in each component */}
        {stage === 'splash' && <SplashScreen onFinish={handleSplashFinish} />}
        {stage === 'login'  && <LoginScreen  onLogin={handleLogin} />}

        {/* Tab screens — only mounted when stage === 'app' */}
        {stage === 'app' && (
          <>
            {activeTab === 'home'   && <HomeScreen     onTabChange={handleTabChange} />}
            {activeTab === 'cal'    && ( 
              <>
                { activeDetailScreen === 'cal' && <ScheduleScreen onTabChange={handleTabChange} onOpenClass={() =>handleOpenClass('class')} /> }
                { activeDetailScreen === 'class' && <LessonDetailScreen onBack={() => setActiveDetailScreen('cal')} onTeacher={() => {}} onEnter={() => {}} /> }
              </>
            )}
            {activeTab === 'market' && <View style={{ flex: 1 }} />}
            {activeTab === 'user'   && <ProfileScreen  onTabChange={handleTabChange} onOpenClass={handleOpenClass} onLogout={() => setStage('login')} />}
            {activeTab === 'menu'   && <MenuScreen     onTabChange={handleTabChange} />}
          </>
        )}
      </View>
      <StatusBar style="light" />
    </ThemeProvider>
    </SafeAreaProvider>
  );
}
