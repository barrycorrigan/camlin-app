import { defineStore } from 'pinia';

// Define the type for the filters
interface FilterState {
  alpha: boolean;
  bravo: boolean;
  charlie: boolean;
  delta: boolean;
  echo: boolean;
}

export const useTransformersStore = defineStore({
  id: 'transformers',
  state: () => ({
    transformers: [
      {
        "assetId": 1,
        "name": "Transformer Alpha",
        "region": "London",
        "health": "Good",
        "lastTenVoltgageReadings": [
          {"timestamp": "2024-07-21T00:00:00Z", "voltage": "35234"},
          {"timestamp": "2024-07-20T00:00:00Z", "voltage": "29098"},
          {"timestamp": "2024-07-19T00:00:00Z", "voltage": "33456"},
          {"timestamp": "2024-07-18T00:00:00Z", "voltage": "35123"},
          {"timestamp": "2024-07-17T00:00:00Z", "voltage": "23542"},
          {"timestamp": "2024-07-16T00:00:00Z", "voltage": "39107"},
          {"timestamp": "2024-07-15T00:00:00Z", "voltage": "35360"},
          {"timestamp": "2024-07-14T00:00:00Z", "voltage": "33245"},
          {"timestamp": "2024-07-13T00:00:00Z", "voltage": "31244"},
          {"timestamp": "2024-07-12T00:00:00Z", "voltage": "27598"}
        ]
      },
      {
        "assetId": 2,
        "name": "Transformer Bravo",
        "region": "Manchester",
        "health": "Excellent",
        "lastTenVoltgageReadings": [
          {"timestamp": "2024-07-21T00:00:00Z", "voltage": "40234"},
          {"timestamp": "2024-07-20T00:00:00Z", "voltage": "39098"},
          {"timestamp": "2024-07-19T00:00:00Z", "voltage": "39456"},
          {"timestamp": "2024-07-18T00:00:00Z", "voltage": "38123"},
          {"timestamp": "2024-07-17T00:00:00Z", "voltage": "40542"},
          {"timestamp": "2024-07-16T00:00:00Z", "voltage": "39907"},
          {"timestamp": "2024-07-15T00:00:00Z", "voltage": "38560"},
          {"timestamp": "2024-07-14T00:00:00Z", "voltage": "39345"},
          {"timestamp": "2024-07-13T00:00:00Z", "voltage": "41234"},
          {"timestamp": "2024-07-12T00:00:00Z", "voltage": "37598"}
        ]
      },
      {
        "assetId": 3,
        "name": "Transformer Charlie",
        "region": "Glasgow",
        "health": "Fair",
        "lastTenVoltgageReadings": [
          {"timestamp": "2024-07-21T00:00:00Z", "voltage": "32010"},
          {"timestamp": "2024-07-20T00:00:00Z", "voltage": "31500"},
          {"timestamp": "2024-07-19T00:00:00Z", "voltage": "26002"},
          {"timestamp": "2024-07-18T00:00:00Z", "voltage": "29540"},
          {"timestamp": "2024-07-17T00:00:00Z", "voltage": "26045"},
          {"timestamp": "2024-07-16T00:00:00Z", "voltage": "23523"},
          {"timestamp": "2024-07-15T00:00:00Z", "voltage": "27682"},
          {"timestamp": "2024-07-14T00:00:00Z", "voltage": "26013"},
          {"timestamp": "2024-07-13T00:00:00Z", "voltage": "31173"},
          {"timestamp": "2024-07-12T00:00:00Z", "voltage": "28135"}
        ]
      },
      {
        "assetId": 4,
        "name": "Transformer Delta",
        "region": "London",
        "health": "Poor",
        "lastTenVoltgageReadings": [
          {"timestamp": "2024-07-21T00:00:00Z", "voltage": "22110"},
          {"timestamp": "2024-07-20T00:00:00Z", "voltage": "31020"},
          {"timestamp": "2024-07-19T00:00:00Z", "voltage": "26021"},
          {"timestamp": "2024-07-18T00:00:00Z", "voltage": "25406"},
          {"timestamp": "2024-07-17T00:00:00Z", "voltage": "20645"},
          {"timestamp": "2024-07-16T00:00:00Z", "voltage": "23243"},
          {"timestamp": "2024-07-15T00:00:00Z", "voltage": "27812"},
          {"timestamp": "2024-07-14T00:00:00Z", "voltage": "26123"},
          {"timestamp": "2024-07-13T00:00:00Z", "voltage": "31713"},
          {"timestamp": "2024-07-12T00:00:00Z", "voltage": "21235"}
        ]
      },
      {
        "assetId": 5,
        "name": "Transformer Echo",
        "region": "Manchester",
        "health": "Critical",
        "lastTenVoltgageReadings": [
          {"timestamp": "2024-07-21T00:00:00Z", "voltage": "18031"},
          {"timestamp": "2024-07-20T00:00:00Z", "voltage": "21052"},
          {"timestamp": "2024-07-19T00:00:00Z", "voltage": "20285"},
          {"timestamp": "2024-07-18T00:00:00Z", "voltage": "21317"},
          {"timestamp": "2024-07-17T00:00:00Z", "voltage": "19123"},
          {"timestamp": "2024-07-16T00:00:00Z", "voltage": "19644"},
          {"timestamp": "2024-07-15T00:00:00Z", "voltage": "18345"},
          {"timestamp": "2024-07-14T00:00:00Z", "voltage": "21564"},
          {"timestamp": "2024-07-13T00:00:00Z", "voltage": "22245"},
          {"timestamp": "2024-07-12T00:00:00Z", "voltage": "20102"}
        ]
      }
    ],
    filters: {
      alpha: true,
      bravo: true,
      charlie: true,
      delta: true,
      echo: true,
    } as FilterState,
  }),
  actions: {
    setFilters(updatedFilters: FilterState) {
      this.filters = updatedFilters;
      localStorage.setItem('transformer-filters', JSON.stringify(this.filters));  // Save filters to localStorage
    },
    loadFiltersFromLocalStorage() {
      const savedFilters = localStorage.getItem('transformer-filters');
      if (savedFilters) {
        this.filters = JSON.parse(savedFilters);
      }
    },
  },
  getters: {
    getTransformers(state) {
      return state.transformers;
    },
    filteredTransformers(state) {
      return state.transformers.filter((transformer) => {
        if (state.filters.alpha && transformer.name.includes('Alpha')) {
          return true;
        }
        if (state.filters.bravo && transformer.name.includes('Bravo')) {
          return true;
        }
        if (state.filters.charlie && transformer.name.includes('Charlie')) {
          return true;
        }
        if (state.filters.delta && transformer.name.includes('Delta')) {
          return true;
        }
        if (state.filters.echo && transformer.name.includes('Echo')) {
          return true;
        }
        return false;
      });
    },
    hasTransformers(state) {
      return state.transformers && state.transformers.length > 0;
    },
  },
  persist: {
    key: 'transformer-store',
    storage: localStorage,
  },
});

// Sync Pinia store with localStorage changes across tabs
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'transformer-filters') {
      const store = useTransformersStore();
      store.loadFiltersFromLocalStorage();
    }
  });
}
