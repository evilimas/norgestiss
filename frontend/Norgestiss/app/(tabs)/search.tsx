import { StyleSheet, TextInput } from 'react-native';
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
};

export default function SearchScreen() {
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [filteredToilets, setFilteredToilets] = useState<Toilet[]>([]);
  const [filters, setFilters] = useState<ToiletFilter>({});

  useEffect(() => {
    getAllToilets().then(setToilets);
  }, []);

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

      return result;
    }

    if (toilets) {
      const filtered = filterToilets(toilets, filters);
      setFilteredToilets(filtered);
    }
  }, [filters, toilets]);

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
          {/* <RadioInput
            label="Free Toilets"
            value={filters.isFree === true}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, isFree: value }))
            }
          /> */}
          <TextInput
            style={styles.textInput}
            placeholder="Search for toilet"
            onChangeText={(text) =>
              setFilters((prev) => ({ ...prev, search: text }))
            }
            value={filters.search || ''}
          />
        </ThemedView>
        <ThemedText style={styles.placeholder}>
          {filteredToilets.map((toilet) => (
            <ThemedText style={styles.toilet} key={toilet.id}>
              {toilet.name} - {toilet.adress}
              {' | '}
              {toilet.isFree ? '🆓 Free' : '💵 Paid'}
              {' | '}
              {toilet.hasHandicapAccess
                ? 'Handicap Accessible♿'
                : 'Not Handicap Accessible'}{' '}
            </ThemedText>
          ))}
          {filteredToilets.length === 0
            ? 'No toilets found. Try adjusting your search criteria.'
            : `Found ${filteredToilets.length} toilets.`}
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  toilet: {
    display: 'flex',
    paddingVertical: 4,

    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
});
