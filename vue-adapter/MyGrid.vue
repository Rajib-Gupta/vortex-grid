<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.field" @click="col.sortable && sort(col.field)">
          {{ col.headerName }}<span v-if="col.sortable"> 🔽</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in data" :key="idx">
        <td v-for="col in columns" :key="col.field">{{ row[col.field] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Grid, GridOptions, GridColumn } from '../core/Grid';

export default defineComponent({
  name: 'LightGrid',
  props: {
    columns: {
      type: Array as () => GridColumn[],
      required: true
    },
    rowData: {
      type: Array as () => any[],
      required: true
    },
    pagination: Boolean,
    pageSize: Number
  },
  setup(props) {
    const grid = ref(new Grid({ columns: props.columns, rowData: props.rowData, pagination: props.pagination, pageSize: props.pageSize }));
    const data = ref<any[]>(props.rowData);
    const page = ref(1);

    watch(() => [props.columns, props.rowData, props.pagination, props.pageSize, page.value], () => {
      data.value = grid.value.getPage(page.value);
    });

    function sort(field: string) {
      grid.value.sort(field, 'asc');
      data.value = grid.value.getPage(page.value);
    }

    return { columns: props.columns, data, sort };
  }
});
</script>
