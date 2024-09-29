<template>
  <base-card>
    <h2>Filter Your Transformer</h2>
    <span class="filter-option">
      <input type="checkbox" id="alpha" :checked="filters.alpha" @change="setFilter" />
      <label for="alpha">Transformer Alpha</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="bravo" :checked="filters.bravo" @change="setFilter" />
      <label for="bravo">Transformer Bravo</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="charlie" :checked="filters.charlie" @change="setFilter" />
      <label for="charlie">Transformer Charlie</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="delta" :checked="filters.delta" @change="setFilter" />
      <label for="delta">Transformer Delta</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="echo" :checked="filters.echo" @change="setFilter" />
      <label for="echo">Transformer Echo</label>
    </span>
  </base-card>
</template>

<script>
import { useTransformersStore } from '../../store/index.ts';

export default {
  setup() {
    const store = useTransformersStore();

    // Directly access filters from Pinia store
    const filters = store.filters;

    // Function to update filters in the store
    const setFilter = (event) => {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...filters,
        [inputId]: isActive,
      };
      store.setFilters(updatedFilters);  // Update the Pinia store
    };

    return {
      filters,
      setFilter,
    };
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>