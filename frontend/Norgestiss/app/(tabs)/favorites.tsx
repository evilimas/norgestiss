import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function FavoritesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Favorite Toilets</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <ThemedText>
          ❤️ Your saved and favorite toilet locations will appear here.
        </ThemedText>
        <ThemedView style={styles.featureContainer}>
          <ThemedText type="subtitle">Features:</ThemedText>
          <ThemedText>• Save frequently used toilets</ThemedText>
          <ThemedText>• Quick access to favorites</ThemedText>
          <ThemedText>• Rate and review toilets</ThemedText>
          <ThemedText>• Offline access to saved locations</ThemedText>
        </ThemedView>
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>No favorites yet</ThemedText>
          <ThemedText style={styles.placeholder}>
            Start exploring to add toilets to your favorites!
          </ThemedText>
        </ThemedView>
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
  featureContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    gap: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 18,
    opacity: 0.7,
  },
  placeholder: {
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
  },
});
