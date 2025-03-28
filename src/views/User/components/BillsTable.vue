<template>
  <div>
    <TableContentGastos
      title="Lista de gastos"
      description="Gestiona tus gastos para un mejor análisis."
      searchPlaceholder="Buscar gastos..."
      :items="gastosConCategoria"
      emptyStateMessage="Comienza creando un nuevo gasto"
      addButtonText="Agregar Gasto"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import TableContentGastos from './TableContentGastos.vue';

// Interfaces de tipos
interface Gasto {
  id: number;
  monto: number;
  categoriaId: number;
  fecha: string;
  descripcion: string;
  nombreCategoria?: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

// Props
const props = defineProps({
  gastos: {
    type: Array as PropType<Gasto[]>,
    required: true,
    default: () => []
  },
  categorias: {
    type: Array as PropType<Categoria[]>,
    required: true,
    default: () => []
  }
});

// Emits con tipado
const emit = defineEmits({
  add: () => true,
  edit: (gasto: Gasto) => {
    if (gasto?.id) return true;
    console.warn('Objeto gasto inválido en emit edit');
    return false;
  },
  delete: (gasto: Gasto) => {
    if (gasto?.id) return true;
    console.warn('Objeto gasto inválido en emit delete');
    return false;
  }
});

// Mapeo seguro de gastos con categorías
const gastosConCategoria = computed<Gasto[]>(() => {
  return props.gastos.map(gasto => {
    const categoria = props.categorias.find(c => c.id === gasto.categoriaId);
    return {
      ...gasto,
      nombreCategoria: categoria?.nombre || 'Sin categoría'
    };
  });
});

// Handlers para los eventos
const handleAdd = () => emit('add');
const handleEdit = (gasto: Gasto) => emit('edit', gasto);
const handleDelete = (gasto: Gasto) => emit('delete', gasto);
</script>
