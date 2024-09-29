<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
      <div class="flex items-center">
          <div class="text-base font-semibold">{{ name }}</div>
        </div>  
    </td>
    <td class="px-6 py-4">
      {{ region }}
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center">
        {{ health }}
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: [
    'assetId',
    'name',
    'region',
    'health',
  ],
};
</script>
