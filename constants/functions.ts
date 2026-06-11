export const formatGTQ = (n : number) => `Q ${n.toFixed(2)}`;

import { Linking } from 'react-native';

/** Safely open any https:// URL in the system browser. */
export async function openURL(url: string) {
  try {
    await Linking.openURL(url);

import { Linking } from 'react-native';

/** Safely open any URL — falls back to a no-op if the system can't handle it. */
export async function openURL(url: string) {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn('Cannot open URL:', url);
    }
  } catch (e) {
    console.warn('openURL error:', e);
  }
}
