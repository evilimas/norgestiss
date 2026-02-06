import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function MapScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Toilet Map</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <ThemedText>
          🗺️ Interactive map showing all public toilets in your area will be
          displayed here.
        </ThemedText>
        <ThemedText style={styles.placeholder}>
          Map integration coming soon...
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  placeholder: {
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
  },
});
