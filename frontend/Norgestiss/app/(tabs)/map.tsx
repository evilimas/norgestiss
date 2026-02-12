import { StyleSheet, Pressable, Alert } from 'react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAllToilets } from '@/services/toiletServices';
import * as Location from 'expo-location';

type Toilet = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  isFree: boolean;
  hasHandicapAccess: boolean;
  description: string;
};

export default function MapScreen() {
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([
    10.7522, 59.9139,
  ]);
  const webViewRef = useRef<WebView>(null);

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

      setUserLocation([location.coords.longitude, location.coords.latitude]);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const mapHtml = useMemo(() => {
    const toiletsJson = JSON.stringify(toilets);
    const userLocationJson = JSON.stringify(userLocation);

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; }
    .leaflet-container { font-family: -apple-system, Roboto, sans-serif; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const toilets = ${toiletsJson};
    const userLocation = ${userLocationJson};

    const map = L.map('map').setView([userLocation[1], userLocation[0]], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const userIcon = L.divIcon({
      html: '<div style="width:16px;height:16px;border-radius:8px;background:#3b82f6;border:2px solid white;"></div>',
      className: '',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    L.marker([userLocation[1], userLocation[0]], { icon: userIcon })
      .addTo(map)
      .bindPopup('Your location');

    toilets.forEach((toilet) => {
      const markerColor = toilet.isFree ? '#22c55e' : '#ef4444';
      const toiletIcon = L.divIcon({
        html: '<div style="width:18px;height:18px;border-radius:9px;background:' + markerColor + ';border:2px solid white;"></div>',
        className: '',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });

      const detail = (toilet.isFree ? 'Free' : 'Paid') +
        (toilet.hasHandicapAccess ? ' • Accessible' : '');

      L.marker([toilet.latitude, toilet.longitude], { icon: toiletIcon })
        .addTo(map)
        .bindPopup('<b>' + toilet.name + '</b><br/>' + detail + '<br/><br/>' + toilet.description);
    });

    window.centerToUser = function(lon, lat) {
      map.setView([lat, lon], 15);
    };
  </script>
</body>
</html>`;
  }, [toilets, userLocation]);

  return (
    <ThemedView style={styles.container}>
      <WebView ref={webViewRef} style={styles.map} source={{ html: mapHtml }} />

      <Pressable
        style={styles.locationButton}
        onPress={async () => {
          await getCurrentLocation();
          webViewRef.current?.injectJavaScript(
            `window.centerToUser(${userLocation[0]}, ${userLocation[1]}); true;`,
          );
        }}
      >
        <ThemedText style={styles.locationButtonText}>📍</ThemedText>
      </Pressable>

      <ThemedView style={styles.overlay}>
        <ThemedText style={styles.legend}>
          🟢 Free • 🔴 Paid • 🔵 You
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
    shadowOffset: { width: 0, height: 2 },
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  legend: {
    fontWeight: 'bold',
  },
});
