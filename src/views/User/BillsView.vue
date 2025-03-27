<template>
  <NavbarComponent />
  <div class="mx-auto p-8 min-h-screen items-center justify-center rounded-3xl bg-white">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
      <div class="mb-6 md:mb-0">
        <h1 class="text-3xl text-gray-900 font-extrabold md:text-4xl tracking-tight">
          Mis Gastos
        </h1>
        <p class="text-gray-600 text-lg max-w-3xl mt-3 animate__animated animate__fadeIn">
          Organiza tus finanzas personales para un mejor control de gastos.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row space-x-4 space-y-3 sm:space-y-0">
        <button @click="openAddModal"
          class="inline-flex items-center cursor-pointer px-4 py-2  border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
          Agregar Gasto
        </button>
        <v-select label="Selecciona una categoría" :items="categorias" item-title="nombre" item-value="id"
          v-model="selectedId" variant="solo-filled" class="sm:w-60 sm:h-15 "></v-select>
      </div>
    </div>

    <TableContent title="Lista de gastos" description="Gestiona tus gastos para un mejor análisis."
      searchPlaceholder="Buscar gastos..." :items="filteredGastos" emptyStateMessage="Comienza creando un nuevo gasto"
      addButtonText="Agregar Gasto" @add="openAddModal" @edit="editGastos" @delete="solicitarEliminarGasto" />

    <v-dialog v-model="dialog" width="500">
      <v-card max-width="700">
        <v-card-title>{{ editingCategory ? 'Editar Gasto' : 'Agregar Transacción' }}</v-card-title>
        <v-card-text>
          <Form @submit="submitForm" :validation-schema="schema" :initial-values="editingCategory || form"
            v-slot="{ errors }">
            <div class="inputs">
              <div class="input-group">
                <Field name="categoriaId" v-slot="{ field }">
                  <v-select v-bind="field" :model-value="field.value" @update:model-value="field.onChange"
                    label="Selecciona una categoría" :items="categorias" item-title="nombre" item-value="id"
                    variant="solo-filled"></v-select>
                  <div v-if="errors.categoriaId" class="error-message">{{ errors.categoriaId }}</div>

                </Field>
              </div>
              <div class="input-group">
                <Field name="monto" v-slot="{ field }">
                  <v-text-field v-bind="field" v-model="form.monto" label="Monto" type="number" variant="solo-filled"
                    :error="!!errors.monto"></v-text-field>
                  <div v-if="errors.monto" class="error-message">{{ errors.monto }}</div>
                </Field>
              </div>
              <div class="input-group">
                <Field name="fecha" v-slot="{ field }">
                  <v-text-field v-bind="field" v-model="form.fecha" label="Fecha" type="date" variant="solo-filled"
                    :error="!!errors.fecha"></v-text-field>
                  <div v-if="errors.fecha" class="error-message">{{ errors.fecha }}</div>
                </Field>
              </div>
              <div class="input-group">
                <Field name="descripcion" v-slot="{ field }">
                  <v-text-field :model-value="field.value"
                    @update:model-value="(val) => { field.onChange(val); form.descripcion = val; }" label="Descripción"
                    variant="solo-filled"></v-text-field>
                  <div v-if="errors.descripcion" class="error-message">{{ errors.descripcion }}</div>

                </Field>
              </div>
              <v-card-actions>
                <div class="flex justify-content-end space-x-4 text-end align-end">
                  <button class="bg-red-600 p-3 rounded-lg text-white" type="button"
                    @click="dialog = false">Cancelar</button>
                  <button class="bg-yellow-600 p-3 rounded-lg text-white" type="submit">Guardar</button>
                </div>
              </v-card-actions>
            </div>
          </Form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal de confirmación de eliminación -->
    <DeleteConfirmationModal :show="showDeleteModal" itemName="Gasto" :itemToDelete="gastoToDelete"
      @confirmDelete="confirmDeleteGasto" @close="closeDeleteModal" />

  </div>
  <FooterComponent />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import 'animate.css';
import { addGasto, deleteGasto, getGastosPorUsuario, updateGasto } from '@/services/gastosService';
import TableContent from './components/TableContentGastos.vue';
import { getCategories } from '@/services/categoryService';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import DeleteConfirmationModal from '@/views/User/components/DeleteConfirmationModal.vue';

const schema = yup.object({
  categoriaId: yup.number().required('La categoría es requerida'),
  monto: yup.number()
    .required('El monto es requerido')
    .min(1, 'El monto debe ser mayor a 0'),
  fecha: yup.date()
    .required('La fecha es requerida')
    .max(new Date(), 'La fecha no puede ser futura'),
  descripcion: yup.string()
    .trim()
    .required('La descripción es requerida')
    .max(100, 'La descripción no puede exceder 100 caracteres')
    .matches(/^[a-zA-Z0-9\s]+$/, 'La descripción solo puede contener letras, números y espacios')
});

const token = localStorage.getItem('token');
const decodedToken = token ? jwtDecode(token) : null;
const usuarioId = decodedToken ? decodedToken.nameid : null;
const dialog = ref(false);
const gastos = ref([]);
const selectedId = ref(null);
const editingCategory = ref(null);
const categorias = ref([]);

// Variables para el modal de confirmación
const showDeleteModal = ref(false);
const gastoToDelete = ref(null);

const form = ref({
  usuarioId: usuarioId,
  monto: 0,
  categoriaId: null,
  fecha: new Date().toISOString().split('T')[0],
  descripcion: '',
});

onMounted(async () => {
  await cargarGastos();
  await cargarCategorias();
  await asignarNombreCategorias();
});

const cargarGastos = async () => {
  try {
    gastos.value = await getGastosPorUsuario(usuarioId);
    await asignarNombreCategorias(); //
  } catch (error) {
    console.error('Error al obtener gastos:', error);
  }
};

const cargarCategorias = async () => {
  try {
    categorias.value = await getCategories(usuarioId);
  } catch (error) {
    console.error('Error al obtener categorias:', error);
  }
};

const asignarNombreCategorias = () => {
  if (!gastos.value.length || !categorias.value.length) return;

  gastos.value = gastos.value.map(gasto => {
    if (gasto.nombreCategoria && categorias.value.some(cat => cat.id === gasto.categoriaId)) {
      return gasto;
    }

    const categoria = categorias.value.find(cat => cat.id === gasto.categoriaId);
    return {
      ...gasto,
      nombreCategoria: categoria ? categoria.nombre : "Sin categoría"
    };
  });
};

const filteredGastos = computed(() => {
  if (!selectedId.value) return gastos.value;
  return gastos.value.filter(gasto => gasto.categoriaId === selectedId.value);
});

const openAddModal = () => {
  if (!categorias.value.length) {
    Swal.fire({
      icon: 'warning',
      title: 'No hay categorías disponibles',
      text: 'Por favor, crea una categoría antes de agregar un gasto.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#f59e0b',
    });
    return;
  }

  editingCategory.value = {
    usuarioId: usuarioId,
    monto: 0,
    categoriaId: null,
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
  };
  dialog.value = true;
};

const editGastos = (gasto) => {
  editingCategory.value = {
    ...gasto,
    fecha: new Date(gasto.fecha).toISOString().split('T')[0]
  };
  dialog.value = true;
};

const submitForm = async (values) => {
  try {
    const currentGasto = editingCategory.value?.id
      ? gastos.value.find(g => g.id === editingCategory.value.id)
      : null;

    const payload = {
      ...values,
      usuarioId: usuarioId,
      ...(currentGasto?.nombreCategoria && { nombreCategoria: currentGasto.nombreCategoria })
    };

    if (editingCategory.value?.id) {
      await updateGasto(editingCategory.value.id, payload);
      Swal.fire('¡Actualizado!', 'El gasto se actualizó correctamente', 'success');
    } else {
      await addGasto(payload);
      Swal.fire('¡Agregado!', 'Gasto registrado correctamente', 'success');
    }

    dialog.value = false;
    await cargarGastos();
    await asignarNombreCategorias();
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', 'Ocurrió un error al procesar el gasto', 'error');
  }
};

const solicitarEliminarGasto = (gasto) => {
  gastoToDelete.value = gasto;
  showDeleteModal.value = true;
};

const confirmDeleteGasto = async () => {
  if (gastoToDelete.value) {
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
      await asignarNombreCategorias();
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
  }
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  gastoToDelete.value = null;
};

const formatCurrency = (monto) => {
  if (!monto) return 'Monto no disponible';
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(monto);
};
</script>

<style>
.error-message {
  color: #ff5252;
  font-size: 0.85rem;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

</style>
