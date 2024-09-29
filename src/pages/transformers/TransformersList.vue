<template>
  <section>
    <transformer-filter></transformer-filter>
  </section>
  <section>
    <base-card>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Region</th>
            <th scope="col" class="px-6 py-3">Health</th>
          </tr>
        </thead>
        <tbody v-if="filteredTransformers.length">
          <transformer-item
            v-for="transformer in filteredTransformers"
            :key="transformer.assetId"
            :id="transformer.assetId"
            :name="transformer.name"
            :region="transformer.region"
            :health="transformer.health"
            :lastTenVoltgageReadings="transformer.lastTenVoltgageReadings"
          />
        </tbody>
        <h3 v-else>No Transformers available</h3>
      </table>

      <!-- Add a single chart for all transformers -->
      <line-chart :voltageData="voltageDataForChart" />
    </base-card>
  </section>
</template>

<script>
import { computed } from 'vue'; // Import computed from vue
import { useTransformersStore } from '../../store/index.ts';
import TransformerItem from '../../components/transformers/TransformerItem.vue';
import TransformerFilter from '../../components/transformers/TransformerFilter.vue';
import LineChart from '../../components/LineChart.vue';

export default {
  components: {
    TransformerItem,
    LineChart,
    TransformerFilter,
  },
  setup() {
    const store = useTransformersStore();

    // Use computed properties to access the filtered transformers and voltage data
    const filteredTransformers = computed(() => store.filteredTransformers);
    const voltageDataForChart = computed(() =>
      filteredTransformers.value.map((transformer) => ({
        label: transformer.name,
        data: transformer.lastTenVoltgageReadings.map((reading) => ({
          x: reading.timestamp,
          y: Number(reading.voltage),
        })),
      }))
    );

    return {
      filteredTransformers,
      voltageDataForChart,
    };
  },
};
</script>