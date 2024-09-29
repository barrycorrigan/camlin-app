<template>
    <section>
        <transformer-filter @change-filter="setFilters"></transformer-filter>
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
          <tbody v-if="hasTransformers">
            <transformer-item v-for="transformer in filteredTransformers"
              :key="transformer.assetId"
              :id="transformer.assetId"
              :name="transformer.name"
              :region="transformer.region"
              :health="transformer.health"
              :lastTenVoltgageReadings="transformer.lastTenVoltgageReadings"
            >
            </transformer-item>
          </tbody>
          <h3 v-else>No Transformers available</h3>
        </table>
  
        <!-- Add a single chart for all transformers -->
        <line-chart :voltageData="voltageDataForChart" />

      </base-card>
    </section>
  </template>
  
<script>
import TransformerItem from '../../components/transformers/TransformerItem.vue';
import TransformerFilter from '../../components/transformers/TransformerFilter.vue';
import LineChart from '../../components/LineChart.vue';
import { useTransformersStore } from '../../store/index.ts';
  
export default {
    components: {
      TransformerItem,
      LineChart,
      TransformerFilter,
    },
    data() {
        return {
            activeFilters: {
                alpha: true,
                bravo: true,
                charlie: true,
                delta: true,
                echo: true
            }
        };
    },
    setup() {
      // Access the store
      const store = useTransformersStore();
  
      return {
        store,
      };
    },
    computed: {
        filteredTransformers() {
            const transformers = this.store.getTransformers; // Complete the assignment in one line
            return transformers.filter(transformer => {
                if (this.activeFilters.alpha && transformer.name.includes('Alpha')) {
                    return true;
                }
                if (this.activeFilters.bravo && transformer.name.includes('Bravo')) {
                    return true;
                }
                if (this.activeFilters.charlie && transformer.name.includes('Charlie')) {
                    return true;
                }
                if (this.activeFilters.delta && transformer.name.includes('Delta')) {
                    return true;
                }
                if (this.activeFilters.echo && transformer.name.includes('Echo')) {
                    return true;
                }
                return false;
            });
        },
        hasTransformers() {
            return this.store.hasTransformers;
        },
        voltageDataForChart() {
            return this.filteredTransformers.map((transformer) => ({
                label: transformer.name, // The name of the transformer as the label
                data: transformer.lastTenVoltgageReadings.map((reading) => ({
                    x: reading.timestamp, // The timestamp as x-axis value
                    y: Number(reading.voltage), // Ensure the voltage is a number for y-axis value
                })),
            }));
        },
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        }
    }
};
</script>
  