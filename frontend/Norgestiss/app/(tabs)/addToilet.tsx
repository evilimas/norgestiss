import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { createToilet } from '@/services/toiletServices';

const AddToiletScreen = () => {
  const [name, setName] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [adress, setAdress] = useState<string>('');
  const [isFree, setIsFree] = useState<boolean>(false);
  const [hasHandicapAccess, setHasHandicapAccess] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    const parsedLatitude = Number(latitude);
    const parsedLongitude = Number(longitude);

    if (!name.trim() || !adress.trim()) {
      Alert.alert('Missing fields', 'Please fill in name and adress.');
      return;
    }

    if (Number.isNaN(parsedLatitude) || Number.isNaN(parsedLongitude)) {
      Alert.alert(
        'Invalid coordinates',
        'Latitude and longitude must be numbers.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await createToilet({
        name: name.trim(),
        latitude: parsedLatitude,
        longitude: parsedLongitude,
        adress: adress.trim(),
        isFree,
        hasHandicapAccess,
        description: description.trim(),
      });

      setName('');
      setLatitude('');
      setLongitude('');
      setAdress('');
      setIsFree(false);
      setHasHandicapAccess(false);
      setDescription('');
      Alert.alert('Success', 'Toilet added successfully.');
    } catch {
      Alert.alert('Submit failed', 'Could not add toilet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ThemedText style={styles.title}>Add a New Toilet</ThemedText>
        <ThemedView style={styles.formContainer}>
          <ThemedText type="defaultSemiBold">Name</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="Enter toilet name"
            value={name}
            onChangeText={setName}
          />

          <ThemedText type="defaultSemiBold">Adress</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="Enter toilet adress"
            value={adress}
            onChangeText={setAdress}
          />

          <ThemedText type="defaultSemiBold">Latitude</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. 59.9139"
            keyboardType="decimal-pad"
            value={latitude}
            onChangeText={setLatitude}
          />

          <ThemedText type="defaultSemiBold">Longitude</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. 10.7522"
            keyboardType="decimal-pad"
            value={longitude}
            onChangeText={setLongitude}
          />

          <ThemedView style={styles.switchRow}>
            <ThemedText type="defaultSemiBold">Is free</ThemedText>
            <Switch value={isFree} onValueChange={setIsFree} />
          </ThemedView>

          <ThemedView style={styles.switchRow}>
            <ThemedText type="defaultSemiBold">Handicap access</ThemedText>
            <Switch
              value={hasHandicapAccess}
              onValueChange={setHasHandicapAccess}
            />
          </ThemedView>

          <ThemedText type="defaultSemiBold">Description</ThemedText>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Enter description"
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />

          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <ThemedText style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default AddToiletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 32,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textArea: {
    minHeight: 110,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a7ea4',
  },
  submitButtonPressed: {
    opacity: 0.85,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  formContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
});
