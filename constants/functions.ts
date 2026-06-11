export const formatGTQ = (n: number) => `Q ${n.toFixed(2)}`;

import { Linking } from 'react-native';

/** Safely open any https:// URL in the system browser. */
export async function openURL(url: string) {
  try {
    await Linking.openURL(url);
  } catch (e) {
    console.warn('openURL error:', e);
  }
}
