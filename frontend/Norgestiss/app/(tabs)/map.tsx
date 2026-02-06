import { StyleSheet, Platform, Pressable, Linking } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAllToilets } from '@/services/toiletServices';

// Dynamic imports for react-native-maps (mobile only)
let MapView: any;
let Marker: any;
let PROVIDER_GOOGLE: any;

type Toilet = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  isFree: boolean;
  hasHandicapAccess: boolean;
  description: string;
};

// Only import maps on mobile platforms
if (Platform.OS !== 'web') {
  try {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
  } catch (e) {
    console.log('Maps not available');
  }
}

// Web Map Component
const WebMapView = () => {
  const [toilets, setToilets] = useState<Toilet[]>([]);

  useEffect(() => {
    const fetchTouilets = async () => {
      try {
        const toiletData = await getAllToilets();
        setToilets(toiletData);
      } catch (error) {
        console.error('Error fetching toilets:', error);
      }
    };
    fetchTouilets();
  }, []);

  const openGoogleMaps = () => {
    const url =
      'https://www.google.com/maps/search/public+toilet/@59.9139,10.7522,13z';
    Linking.openURL(url);
  };

  return (
    <ThemedView style={styles.webMapContainer}>
      <ThemedView style={styles.mapPlaceholder}>
        <ThemedText type="title" style={styles.mapTitle}>
          🗺️
        </ThemedText>
        <ThemedText type="subtitle">Interactive Map</ThemedText>
        <ThemedText style={styles.mapSubtext}>
          View toilets around Oslo
        </ThemedText>
        <Pressable style={styles.mapButton} onPress={openGoogleMaps}>
          <ThemedText style={styles.buttonText}>Open in Google Maps</ThemedText>
        </Pressable>
      </ThemedView>

      {/* Toilet markers overlay */}
      <ThemedView style={styles.markersContainer}>
        {toilets.map((toilet: Toilet) => (
          <ThemedView key={toilet.id} style={styles.markerCard}>
            <ThemedText style={styles.markerName}>📍 {toilet.name}</ThemedText>
            <ThemedText style={styles.markerInfo}>
              {toilet.isFree ? '🆓' : '💵'}{' '}
              {toilet.hasHandicapAccess ? '♿' : ''}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

// Sample toilet data based on your API structure
// const sampleToilets = [
//   {
//     id: 42,
//     name: 'Oslo Central Station',
//     latitude: 59.9127,
//     longitude: 10.7461,
//     isFree: false,
//     hasHandicapAccess: true,
//     description: 'Paid, payment by card',
//   },
//   {
//     id: 43,
//     name: 'Oslo City Hall',
//     latitude: 59.9117,
//     longitude: 10.7348,
//     isFree: true,
//     hasHandicapAccess: true,
//     description: 'Free public toilet',
//   },
//   {
//     id: 44,
//     name: 'Holmenkollen Ski Museum',
//     latitude: 59.9637,
//     longitude: 10.6686,
//     isFree: false,
//     hasHandicapAccess: false,
//     description: 'Paid facility',
//   },
// ];

export default function MapScreen() {
  const [toilets, setToilets] = useState<Toilet[]>([]);

  useEffect(() => {
    const fetchToilets = async () => {
      try {
        const toiletData = await getAllToilets();
        setToilets(toiletData);
      } catch (error) {
        console.error('Error fetching toilets:', error);
      }
    };
    fetchToilets();
  }, []);

  // Web: Show map placeholder with Google Maps link
  if (Platform.OS === 'web') {
    return (
      <ThemedView style={styles.container}>
        <WebMapView />
      </ThemedView>
    );
  }

  // Mobile: Show interactive native map
  if (!MapView) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.errorContainer}>
          <ThemedText type="title">Map Unavailable</ThemedText>
          <ThemedText>Please install map dependencies for mobile.</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude: 59.9139, // Oslo center
          longitude: 10.7522,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {toilets.map((toilet) => (
          <Marker
            key={toilet.id}
            coordinate={{
              latitude: toilet.latitude,
              longitude: toilet.longitude,
            }}
            title={toilet.name}
            description={`${toilet.isFree ? '🆓 Free' : '💵 Paid'} ${toilet.hasHandicapAccess ? '♿ Accessible' : ''}`}
            pinColor={toilet.isFree ? 'green' : 'red'}
          />
        ))}
      </MapView>

      <ThemedView style={styles.overlay}>
        <ThemedText style={styles.legend}>
          🟢 Free • 🔴 Paid • 📍 Your Location
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Native map styles
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  legend: {
    fontSize: 12,
    opacity: 0.8,
  },
  // Web map styles
  webMapContainer: {
    flex: 1,
    padding: 16,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 150, 255, 0.1)',
    borderRadius: 12,
    padding: 32,
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapSubtext: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 20,
  },
  mapButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  markersContainer: {
    maxHeight: 200,
    gap: 8,
  },
  markerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  markerName: {
    flex: 1,
    fontWeight: '500',
  },
  markerInfo: {
    fontSize: 16,
  },
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});
