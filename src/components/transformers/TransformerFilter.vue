<template>
  <base-card>
    <h2>Filter Your Transformer</h2>
    <span class="filter-option">
      <input type="checkbox" id="alpha" checked @change="setFilter" />
      <label for="alpha">Transformer Alpha</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="bravo" checked @change="setFilter" />
      <label for="bravo">Transformer Bravo</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="charlie" checked @change="setFilter" />
      <label for="charlie">Transformer Charlie</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="delta" checked @change="setFilter" />
      <label for="delta">Transformer Delta</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="echo" checked @change="setFilter" />
      <label for="echo">Transformer Echo</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        alpha: true,
        bravo: true,
        charlie: true,
        delta: true,
        echo: true
      }
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    }
  }
}
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