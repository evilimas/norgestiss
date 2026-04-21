import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  View,
  Pressable,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAllToilets } from '@/services/toiletServices';
import { useEffect, useState } from 'react';

type Toilet = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  adress: string;
  isFree: boolean;
  hasHandicapAccess: boolean;
  description: string;
};

type ToiletFilter = {
  name?: string;
  adress?: string;
  isFree?: boolean;
  hasHandicapAccess?: boolean;
  search?: string;
  isFreeOrPaid?: 'free' | 'paid' | 'all';
  isHandicapAccessible?: boolean;
};

export default function SearchScreen() {
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [filteredToilets, setFilteredToilets] = useState<Toilet[]>([]);
  const [filters, setFilters] = useState<ToiletFilter>({
    isFreeOrPaid: 'all',
    hasHandicapAccess: true,
  });

  useEffect(() => {
    getAllToilets().then(setToilets);
  }, [getAllToilets]);

  useEffect(() => {
    function filterToilets(
      allToilets: Toilet[],
      filters: ToiletFilter,
    ): Toilet[] {
      let result = allToilets;

      if (filters.name) {
        result = result.filter((toilet) => toilet.name === filters.name);
      }

      if (filters.adress) {
        if (filters.name && filters.adress) {
          result = result.filter((toilet) => toilet.name === filters.name);
        }
        result = result.filter((toilet) => toilet.adress === filters.adress);
      }

      if (filters.search) {
        result = result.filter(
          (toilet) =>
            toilet.name
              .toLocaleLowerCase()
              .includes(filters.search?.toLocaleLowerCase() || '') ||
            toilet.adress
              .toLocaleLowerCase()
              .includes(filters.search?.toLocaleLowerCase() || '') ||
            toilet.description
              .toLocaleLowerCase()
              .includes(filters.search?.toLocaleLowerCase() || ''),
        );
      }
      // if (filters.isFree === true || filters.isFree === false) {
      //   result = result.filter((toilet) => toilet.isFree === filters.isFree);
      // }
      if (filters.isFreeOrPaid === 'all') {
        // do nothing, show all toilets
      } else if (filters.isFreeOrPaid === 'free') {
        result = result.filter((toilet) => toilet.isFree === true);
      } else if (filters.isFreeOrPaid === 'paid') {
        result = result.filter((toilet) => toilet.isFree === false);
      }
      if (filters.hasHandicapAccess !== undefined) {
        result = result.filter(
          (toilet) => toilet.hasHandicapAccess === filters.hasHandicapAccess,
        );
      }

      return result;
    }

    if (toilets) {
      const filtered = filterToilets(toilets, filters);
      setFilteredToilets(filtered);
    }
  }, [filters, toilets]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Search Toilets</ThemedText>
        </ThemedView>
        <ThemedView style={styles.contentContainer}>
          <ThemedText>
            🔍 Search for public toilets by location, accessibility features, or
            other criteria.
          </ThemedText>

          <ThemedView style={styles.searchContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Search for toilet"
              onChangeText={(text) =>
                setFilters((prev) => ({ ...prev, search: text }))
              }
              value={filters.search || ''}
            />
          </ThemedView>
          <ThemedView style={styles.filterContainer}>
            <View style={styles.radioInputs}>
              {(['free', 'paid', 'all'] as const).map((value) => (
                <Pressable
                  key={value}
                  style={styles.radio}
                  onPress={() =>
                    setFilters((prev) => ({ ...prev, isFreeOrPaid: value }))
                  }
                >
                  <Text
                    style={[
                      styles.radioName,
                      filters.isFreeOrPaid === value &&
                        styles.radioNameSelected,
                    ]}
                  >
                    {value === 'free'
                      ? 'Free'
                      : value === 'paid'
                        ? 'Paid'
                        : 'All Toilets'}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              style={styles.filtersContainer}
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  hasHandicapAccess: prev.hasHandicapAccess ? undefined : true,
                }))
              }
            >
              <View
                style={[
                  styles.checkbox,
                  filters.hasHandicapAccess && styles.checkboxChecked,
                ]}
              />
              <Text style={styles.checkboxLabel}>Handicap Accessible</Text>
            </Pressable>
          </ThemedView>
          <ThemedView style={styles.toiletList}>
            {filteredToilets.map((toilet) => (
              <ThemedText style={styles.toilet} key={toilet.id}>
                <Text style={{ fontWeight: 'bold' }}>{toilet.name}</Text>
                <Text style={{ fontStyle: 'italic' }}>
                  Adress: {toilet.adress}
                </Text>
                <Text>{toilet.description}</Text>
                {toilet.isFree ? '🆓 Free' : '💵 Paid'}
                {' | '}
                {toilet.hasHandicapAccess
                  ? 'Handicap Accessible♿'
                  : 'Not Handicap Accessible'}{' '}
              </ThemedText>
            ))}
          </ThemedView>
          <ThemedText style={styles.toiletLength}>
            {filteredToilets.length === 0
              ? 'No toilets found. Try adjusting your search criteria.'
              : `Found ${filteredToilets.length} toilets.`}
          </ThemedText>
        </ThemedView>
      </ScrollView>
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  toilet: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 6,

    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
  toiletList: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  toiletLength: {
    marginTop: 'auto',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterContainer: {
    gap: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  radioInputs: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 8,
    backgroundColor: '#EEE',
    padding: 4,
    // width: 300,
  },
  radio: {
    flex: 1,
    textAlign: 'center',
  },
  radioName: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    fontSize: 14,
    color: 'rgba(51, 65, 85, 1)',
  },
  radioNameSelected: {
    backgroundColor: '#fff',
    fontWeight: '600',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'gray',
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  checkboxLabel: {
    fontSize: 14,
    color: 'rgba(51, 65, 85, 1)',
  },
});
