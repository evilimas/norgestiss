import { StyleSheet, Platform, Alert, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAllToilets } from '@/services/toiletServices';
import * as Location from 'expo-location';

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

export default function MapScreen() {
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [mapRef, setMapRef] = useState<any>(null);

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

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to show your position on the map.',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(userCoords);

      // Center map on user location
      if (mapRef) {
        mapRef.animateToRegion(
          {
            ...userCoords,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          1000,
        );
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Error',
        'Could not get your current location. Please make sure location services are enabled.',
      );
    }
  };

  const centerOnUser = () => {
    if (userLocation && mapRef) {
      mapRef.animateToRegion(
        {
          ...userLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000,
      );
    } else {
      getCurrentLocation();
    }
  };

  // Web: Show simple message
  // if (Platform.OS === 'web') {
  //   return (
  //     <ThemedView style={styles.container}>
  //       <ThemedView style={styles.webContainer}>
  //         <ThemedText type="title">🗺️ Map</ThemedText>
  //         <ThemedText>Maps are available on mobile devices</ThemedText>
  //         {toilets.map((toilet) => (
  //           <ThemedView key={toilet.id} style={styles.toiletCard}>
  //             <ThemedText style={styles.toiletName}>{toilet.name}</ThemedText>
  //             <ThemedText>
  //               {toilet.isFree ? '🆓 Free' : '💵 Paid'}
  //               {toilet.hasHandicapAccess ? ' ♿ Accessible' : ''}
  //             </ThemedText>
  //           </ThemedView>
  //         ))}
  //       </ThemedView>
  //     </ThemedView>
  //   );
  // }

  // Mobile: Show map or error
  if (!MapView) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.webContainer}>
          <ThemedText type="title">Map Unavailable</ThemedText>
          <ThemedText>Please install map dependencies</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <MapView
        ref={setMapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={
          userLocation
            ? {
                ...userLocation,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
            : {
                latitude: 59.9139, // Oslo center
                longitude: 10.7522,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
        showsUserLocation={true}
        showsMyLocationButton={false} // We'll use our own button
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

      {/* Location button */}
      <Pressable style={styles.locationButton} onPress={centerOnUser}>
        <ThemedText style={styles.locationButtonText}>📍</ThemedText>
      </Pressable>

      <ThemedView style={styles.overlay}>
        <ThemedText style={styles.legend}>
          🟢 Free • 🔴 Paid • 💙 Your Location
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  webContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  toiletCard: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    width: '100%',
  },
  toiletName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationButtonText: {
    fontSize: 20,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  legend: {
    fontWeight: 'bold',
  },
});
