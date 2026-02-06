import { Image } from 'expo-image';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/logo2.png')}
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.title}>
          Welcome To Norgestiss!
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Find public toilets across Norway
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedView style={styles.featureContainer}>
          <ThemedText type="subtitle">🚻 Find Nearby Toilets</ThemedText>
          <ThemedText>
            Locate public toilets in your area with real-time information about
            availability, accessibility, and payment options.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureContainer}>
          <ThemedText type="subtitle">♿ Accessibility Info</ThemedText>
          <ThemedText>
            Get detailed information about handicap accessibility, helping
            everyone find suitable facilities.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureContainer}>
          <ThemedText type="subtitle">💳 Payment Details</ThemedText>
          <ThemedText>
            Know in advance whether facilities are free or require payment, and
            what payment methods are accepted.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  logo: {
    width: '100%',
    height: 220,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  featureContainer: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    gap: 8,
  },
});
