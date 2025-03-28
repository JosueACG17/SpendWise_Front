import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import {
  addBudget,
  deleteBudget,
  getBudgetsByUser,
  updateBudget
} from '@/services/presupuestosService';
import { getCategories } from '@/services/categoryService';
import { getGastosPorUsuario } from '@/services/gastosService';

export function usePresupuestos(usuarioId: number) {
  // Estados
  const categorias = ref([]);
  const presupuestos = ref([]);
  const gastos = ref([]);
  const isModalOpen = ref(false);
  const editingCategory = ref(null);
  const showDeleteModal = ref(false);
  const categoryToDelete = ref(null);
  const totalPresupuestado = ref(0);
  const totalGastadoGeneral = ref(0);

  const nuevoPresupuesto = ref({
    categoriaId: null,
    usuarioId: usuarioId,
    monto: 0,
    fechaInicio: new Date(),
    fechaFin: new Date(),
  });

  // Esquema de validación
  const schema = yup.object({
    categoriaId: yup.number()
      .required('La categoría es requerida'),
    monto: yup.number()
      .typeError('El monto debe ser un número válido')
      .required('El monto es requerido')
      .min(1, 'El monto debe ser mayor a 0')
      .max(1000000, 'El monto no puede exceder 1,000,000')
  });

  // Computed
  const totalAsignado = computed(() => {
    return presupuestos.value.reduce((total, p) => total + p.asignado, 0);
  });

  const totalGastado = computed(() => {
    return presupuestos.value.reduce((total, p) => total + p.gastado, 0);
  });

  const totalRestante = computed(() => {
    return totalAsignado.value - totalGastado.value;
  });

  // Métodos
  const cargarCategorias = async () => {
    try {
      categorias.value = await getCategories(usuarioId);
    } catch (error) {
      console.error('Error al obtener categorias:', error);
      throw error;
    }
  };

  const cargarPresupuestos = async () => {
    try {
      presupuestos.value = await getBudgetsByUser(usuarioId);
    } catch (error) {
      console.error('Error al obtener presupuestos:', error);
      throw error;
    }
  };

  const cargarGastos = async () => {
    try {
      gastos.value = await getGastosPorUsuario(usuarioId);
    } catch (error) {
      console.error('Error al obtener gastos:', error);
      throw error;
    }
  };

  const calcularGastosPorPresupuesto = () => {
    presupuestos.value = presupuestos.value.map(presupuesto => ({
      ...presupuesto,
      totalGastado: 0,
    }));

    gastos.value.forEach(gasto => {
      const presupuesto = presupuestos.value.find(p => p.categoriaId === gasto.categoriaId);
      if (presupuesto) {
        presupuesto.totalGastado += gasto.monto;
      }
    });

    totalPresupuestado.value = presupuestos.value.reduce((acc, p) => acc + p.monto, 0);
    totalGastadoGeneral.value = gastos.value.reduce((acc, g) => acc + g.monto, 0);
  };

  const openAddModal = () => {
    if (!categorias.value.length) {
      showWarning('No hay categorías disponibles', 'Por favor, crea una categoría antes de agregar un presupuesto.');
      return;
    }

    editingCategory.value = null;
    nuevoPresupuesto.value = {
      categoriaId: null,
      usuarioId: usuarioId,
      monto: 0,
      fechaInicio: new Date(),
      fechaFin: new Date(),
    };
    isModalOpen.value = true;
  };

  const agregarPresupuesto = async () => {
    const isValid = await schema.validate(nuevoPresupuesto.value).catch(() => false);
    if (!isValid) {
      showError('Error', 'Por favor, completa todos los campos correctamente');
      return;
    }

    try {
      if (editingCategory.value) {
        const updatedCategory = {
          id: editingCategory.value.id,
          categoriaId: nuevoPresupuesto.value.categoriaId,
          usuarioId: usuarioId,
          monto: nuevoPresupuesto.value.monto,
          fechaInicio: nuevoPresupuesto.value.fechaInicio,
          fechaFin: nuevoPresupuesto.value.fechaFin,
        };
        await updateBudget(editingCategory.value.id, updatedCategory);
        showSuccess('¡Actualizado!', 'El presupuesto se ha actualizado correctamente');
      } else {
        const newCategory = {
          categoriaId: nuevoPresupuesto.value.categoriaId,
          usuarioId: usuarioId,
          monto: nuevoPresupuesto.value.monto,
          fechaInicio: nuevoPresupuesto.value.fechaInicio,
          fechaFin: nuevoPresupuesto.value.fechaFin,
        };
        await addBudget(newCategory);
        showSuccess('¡Creado!', 'Presupuesto agregado correctamente');
      }
      closeModal();
      await cargarPresupuestos();
      calcularGastosPorPresupuesto();
    } catch (error) {
      console.error("Error al guardar el presupuesto:", error);
      throw error;
    }
  };

  const editarPresupuesto = (presupuesto) => {
    editingCategory.value = presupuesto;
    nuevoPresupuesto.value = {
      categoriaId: presupuesto.categoriaId,
      usuarioId: usuarioId,
      monto: presupuesto.monto,
      fechaInicio: presupuesto.fechaInicio,
      fechaFin: presupuesto.fechaFin,
    };
    isModalOpen.value = true;
  };

  const confirmDelete = (categoria) => {
    categoryToDelete.value = categoria;
    showDeleteModal.value = true;
  };

  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    categoryToDelete.value = null;
  };

  const deleteCategory = async () => {
    if (!categoryToDelete.value) return;

    try {
      await deleteBudget(categoryToDelete.value);
      showSuccess('¡Eliminado!', 'El presupuesto ha sido eliminado correctamente');
      await cargarPresupuestos();
      calcularGastosPorPresupuesto();
    } catch (error) {
      console.error("Error al eliminar el presupuesto:", error);
      throw error;
    } finally {
      closeDeleteModal();
    }
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const formatCurrency = (monto) => {
    if (!monto) return 'Aún no hay gastos';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(monto);
  };

  const getCategoriaNombre = (categoriaId) => {
    const categoria = categorias.value.find(c => c.id === categoriaId);
    return categoria ? categoria.nombre : "Sin categoría";
  };

  // Helpers para notificaciones
  const showSuccess = (title, text) => {
    Swal.fire({
      icon: 'success',
      title,
      text,
      showConfirmButton: false,
      timer: 1000
    });
  };

  const showError = (title, text) => {
    Swal.fire({
      icon: 'error',
      title,
      text,
      showConfirmButton: false,
      timer: 700
    });
  };

  const showWarning = (title, text) => {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#f59e0b',
    });
  };

  return {
    categorias,
    presupuestos,
    gastos,
    isModalOpen,
    editingCategory,
    showDeleteModal,
    categoryToDelete,
    totalPresupuestado,
    totalGastadoGeneral,
    nuevoPresupuesto,
    totalAsignado,
    totalGastado,
    totalRestante,
    cargarCategorias,
    cargarPresupuestos,
    cargarGastos,
    calcularGastosPorPresupuesto,
    openAddModal,
    agregarPresupuesto,
    editarPresupuesto,
    confirmDelete,
    closeDeleteModal,
    deleteCategory,
    closeModal,
    formatCurrency,
    getCategoriaNombre
  };
}

// Función helper para obtener usuarioId
export function getUsuarioId() {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  return decodedToken ? decodedToken.nameid : null;
}
