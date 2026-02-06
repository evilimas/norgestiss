import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function SearchScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search Toilets</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <ThemedText>
          🔍 Search for public toilets by location, accessibility features, or
          other criteria.
        </ThemedText>
        <ThemedView style={styles.searchContainer}>
          <ThemedText type="subtitle">Search Features:</ThemedText>
          <ThemedText>• Location-based search</ThemedText>
          <ThemedText>• Filter by accessibility</ThemedText>
          <ThemedText>• Filter by payment type</ThemedText>
          <ThemedText>• Distance from current location</ThemedText>
        </ThemedView>
        <ThemedText style={styles.placeholder}>
          Search functionality coming soon...
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
  searchContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    gap: 8,
  },
  placeholder: {
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
  },
});
