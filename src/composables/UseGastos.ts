import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { getGastosPorUsuario, addGasto, updateGasto, deleteGasto } from '@/services/gastosService';
import Swal from 'sweetalert2';

interface Gasto {
  id?: number;
  usuarioId: number | null;
  monto: number;
  categoriaId: number | null;
  fecha: string;
  descripcion: string;
}

export function useGastos(usuarioId: number | null) {
  const gastos: Ref<Gasto[]> = ref([]);
  const selectedId = ref<number | null>(null);
  const dialog = ref(false);
  const editingGasto = ref<Gasto | null>(null);
  const showDeleteModal = ref(false);
  const gastoToDelete = ref<Gasto | null>(null);

  const filteredGastos = computed(() => {
    if (!selectedId.value) return gastos.value;
    return gastos.value.filter(gasto => gasto.categoriaId === selectedId.value);
  });

  const cargarGastos = async () => {
    if (!usuarioId) return;

    try {
      const data = await getGastosPorUsuario(usuarioId);
      gastos.value = data.map(gasto => ({
        ...gasto,
        usuarioId 
      }));
    } catch (error) {
      console.error('Error al obtener gastos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los gastos',
        confirmButtonColor: '#f59e0b'
      });
    }
  };

  const openAddModal = () => {
    editingGasto.value = {
      usuarioId,
      monto: 0,
      categoriaId: null,
      fecha: new Date().toISOString().split('T')[0],
      descripcion: '',
    };
    dialog.value = true;
  };

  const editGasto = (gasto: Gasto) => {
    editingGasto.value = {
      ...gasto,
      fecha: new Date(gasto.fecha).toISOString().split('T')[0]
    };
    dialog.value = true;
  };

  const handleSubmit = async (values: Omit<Gasto, 'usuarioId'>) => {
    if (!usuarioId) return;

    try {
      const gastoData = { ...values, usuarioId };

      if (editingGasto.value?.id) {
        await updateGasto(editingGasto.value.id, gastoData);
        Swal.fire('¡Actualizado!', 'El gasto se actualizó correctamente', 'success');
      } else {
        await addGasto(gastoData);
        Swal.fire('¡Agregado!', 'Gasto registrado correctamente', 'success');
      }

      dialog.value = false;
      await cargarGastos();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Ocurrió un error al procesar el gasto', 'error');
    }
  };

  const solicitarEliminarGasto = (gasto: Gasto) => {
    gastoToDelete.value = gasto;
    showDeleteModal.value = true;
  };

  const confirmDeleteGasto = async () => {
    if (!gastoToDelete.value?.id) return;

    try {
      await deleteGasto(gastoToDelete.value.id);
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El gasto ha sido eliminado',
        showConfirmButton: false,
        timer: 1500
      });
      await cargarGastos();
      closeDeleteModal();
    } catch (error) {
      console.error('Error al eliminar gasto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el gasto',
        confirmButtonColor: '#f59e0b'
      });
    }
  };

  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    gastoToDelete.value = null;
  };

  return {
    gastos,
    filteredGastos,
    selectedId,
    dialog,
    editingGasto,
    showDeleteModal,
    gastoToDelete,
    cargarGastos,
    openAddModal,
    editGasto,
    handleSubmit,
    solicitarEliminarGasto,
    confirmDeleteGasto,
    closeDeleteModal
  };
}
