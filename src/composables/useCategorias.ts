import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import {
  addCategory,
  deleteCategoria,
  getCategories,
  updateCategory,
  isCategoryInUse,
  hasExpenses
} from '@/services/categoryService';
import { getBudgetsByUser } from '@/services/presupuestosService';

export function useCategorias(usuarioId: number) {
  const categorias = ref([]);
  const presupuestos = ref([]);
  const showModal = ref(false);
  const editingCategory = ref(null);
  const showDeleteModal = ref(false);
  const categoryToDelete = ref(null);

  const formData = ref({
    nombre: '',
  });

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

  const openAddModal = () => {
    editingCategory.value = null;
    formData.value = { nombre: '' };
    showModal.value = true;
  };

  const editCategory = (categoria) => {
    editingCategory.value = { ...categoria };
    formData.value.nombre = categoria.nombre;
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const validateCategoryName = (name) => {
    const trimmedName = name.trim();
    const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(trimmedName);
    if (!trimmedName) return 'El nombre es requerido';
    if (hasSpecialChars) return 'El nombre no puede contener caracteres especiales';
    if (trimmedName.length < 3) return 'El nombre debe tener al menos 3 caracteres válidos';
    return null;
  };

  const saveCategory = async () => {
    const validationError = validateCategoryName(formData.value.nombre);
    if (validationError) {
      showError('Error', validationError);
      return;
    }

    formData.value.nombre = formData.value.nombre.trim();
    try {
      if (editingCategory.value) {
        const updatedCategory = {
          id: editingCategory.value.id,
          nombre: formData.value.nombre,
          usuarioId: usuarioId,
        };
        await updateCategory(editingCategory.value.id, updatedCategory);
        showSuccess('¡Actualizado!', 'La categoría se ha actualizado correctamente');
      } else {
        const newCategory = {
          nombre: formData.value.nombre,
          usuarioId: usuarioId,
        };
        await addCategory(newCategory);
        showSuccess('¡Creado!', 'Categoría creada correctamente');
      }
      closeModal();
      await cargarCategorias();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      throw error;
    }
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
      // Primero verificar si está en presupuestos
      const inUse = await isCategoryInUse(categoryToDelete.value.id);
      if (inUse) {
        showError('Error', 'No se puede eliminar la categoría porque tiene un presupuesto asociado');
        closeDeleteModal();
        return;
      }

      // Luego verificar si tiene gastos
      const hasExp = await hasExpenses(categoryToDelete.value.id);
      if (hasExp) {
        showError('Error', 'No se puede eliminar la categoría porque tiene gastos asociados');
        closeDeleteModal();
        return;
      }

      // Si pasa las validaciones, eliminar
      await deleteCategoria(categoryToDelete.value.id);
      showSuccess('¡Eliminado!', 'La categoría se ha eliminado correctamente');
      await cargarCategorias();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      showError('Error', 'Ocurrió un error al eliminar la categoría');
    } finally {
      closeDeleteModal();
    }
  };

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
      timer: 1000
    });
  };

  return {
    categorias,
    presupuestos,
    showModal,
    editingCategory,
    showDeleteModal,
    categoryToDelete,
    formData,
    cargarCategorias,
    cargarPresupuestos,
    openAddModal,
    editCategory,
    closeModal,
    saveCategory,
    confirmDelete,
    closeDeleteModal,
    deleteCategory
  };
}

// Función de conveniencia para obtener el usuarioId del token
export function getUsuarioId() {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  return decodedToken ? decodedToken.nameid : null;
}
