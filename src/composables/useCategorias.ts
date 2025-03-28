import { ref } from 'vue';
import { getCategories } from '@/services/categoryService';
import { getBudgetsByUser } from '@/services/presupuestosService';

export function useCategorias(usuarioId: number) {
  const categorias = ref([]);
  const presupuestos = ref([]);

  const cargarCategorias = async () => {
    try {
      categorias.value = await getCategories(usuarioId);
    } catch (error) {
      console.error('Error al obtener categorias:', error);
    }
  };

  const cargarPresupuestos = async () => {
    try {
      presupuestos.value = await getBudgetsByUser(usuarioId);
    } catch (error) {
      console.error('Error al obtener presupuestos:', error);
    }
  };

  return {
    categorias,
    presupuestos,
    cargarCategorias,
    cargarPresupuestos
  };
}
