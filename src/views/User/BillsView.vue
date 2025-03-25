<template>
  <NavbarComponent />
  <div class="mx-auto p-8 min-h-screen items-center justify-center rounded-3xl bg-white">
    <div class="top">
      <div class="mb-6 md:mb-0">
        <h1 class="text-3xl text-gray-900 font-extrabold md:text-4xl tracking-tight">
          Mis Gastos
        </h1>
        <p class="text-gray-600 text-lg mt-3">
          Organiza tus finanzas personales
        </p>
      </div>
      <div class="filters">
        <v-select label="Selecciona una categoría" :items="categorias" item-title="nombre" item-value="id"
          v-model="selectedId" variant="solo-filled"></v-select>
        <button @click="openAddModal"
          class="bg-gradient-to-r cursor-pointer from-yellow-500 to-yellow-600 text-white sm:px-6 sm:py-3 px-2 py-1.5 rounded-full hover:from-yellow-500 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl self-end">
          Agregar Gasto
        </button>
      </div>
    </div>

    <TableContent title="Lista de gastos" description="Gestiona tus gastos para un mejor análisis."
      searchPlaceholder="Buscar gastos..." :items="filteredGastos" emptyStateMessage="Comienza creando un nuevo gasto"
      addButtonText="Agregar Gasto" @add="openAddModal" @edit="editGastos" @delete="solicitarEliminarGasto" />

    <v-dialog v-model="dialog" width="500">
      <v-card max-width="700">
        <v-card-title>{{ editingCategory ? 'Editar Gasto' : 'Agregar Transacción' }}</v-card-title>
        <v-card-text>
          <Form @submit="submitForm" :validation-schema="schema">
            <div class="inputs">
              <div class="input-group">
                <Field name="categoriaId" v-slot="{ field }">
                  <v-select v-bind="field" label="Selecciona una categoría" :items="categorias" item-title="nombre" item-value="id" v-model="form.categoriaId" variant="solo-filled">
                    <template #message="{ message }">
                      <div class="error-message">{{ message }}</div>
                    </template>
                  </v-select>
                  <ErrorMessage name="categoriaId" class="error-message" />
                </Field>
              </div>
              <div class="input-group">
                <Field name="monto" v-slot="{ field }">
                  <v-text-field v-bind="field" v-model="form.monto" label="Monto" type="number" variant="solo-filled">
                    <template #message="{ message }">
                      <div class="error-message">{{ message }}</div>
                    </template>
                  </v-text-field>
                  <ErrorMessage name="monto" class="error-message" />
                </Field>
              </div>
              <div class="input-group">
                <Field name="fecha" v-slot="{ field }">
                  <v-text-field v-bind="field" v-model="form.fecha" label="Fecha" type="date" variant="solo-filled">
                    <template #message="{ message }">
                      <div class="error-message">{{ message }}</div>
                    </template>
                  </v-text-field>
                  <ErrorMessage name="fecha" class="error-message" />
                </Field>
              </div>
              <div class="input-group">
                <Field name="descripcion" v-slot="{ field }">
                  <v-text-field v-bind="field" v-model="form.descripcion" label="Descripción" variant="solo-filled">
                    <template #message="{ message }">
                      <div class="error-message">{{ message }}</div>
                    </template>
                  </v-text-field>
                  <ErrorMessage name="descripcion" class="error-message" />
                </Field>
              </div>
            </div>
          </Form>
        </v-card-text>
        <v-card-actions>
          <div class="buttons-forms">
            <button @click="dialog = false">Cancelar</button>
            <button @click="submitForm">Guardar</button>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de confirmación de eliminación -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      itemName="Gasto"
      :itemToDelete="gastoToDelete"
      @confirmDelete="confirmDeleteGasto"
      @close="closeDeleteModal"
    />

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
import { Form, Field, ErrorMessage } from 'vee-validate';
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
});

const token = localStorage.getItem('token');
const decodedToken = token ? jwtDecode(token) : null;
const usuarioId = decodedToken ? decodedToken.nameid : null;

const dialog = ref(false);
const gastos = ref([]);
const selectedId = ref(null);
const editingCategory = ref(null);
const categorias = ref([]);
const presupuestos = ref([]);

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
  editingCategory.value = null;
  form.value = {
    usuarioId: usuarioId,
    monto: 0,
    categoriaId: null,
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
  };
  dialog.value = true;
};

const editGastos = async (gasto) => {
  editingCategory.value = gasto;
  form.value = {
    usuarioId: usuarioId,
    monto: gasto.monto,
    categoriaId: gasto.categoriaId,
    fecha: new Date(gasto.fecha).toISOString().split('T')[0],
    descripcion: gasto.descripcion,
  };
  dialog.value = true;
};

const submitForm = async () => {
  try {
    if (editingCategory.value) {
      await updateGasto(editingCategory.value.id, form.value);
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'El gasto se ha actualizado correctamente',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      await addGasto(form.value);
      Swal.fire({
        icon: 'success',
        title: '¡Agregado!',
        text: 'Gasto registrado correctamente',
        showConfirmButton: false,
        timer: 2000
      });
    }
    dialog.value = false;
    await cargarGastos();
    await asignarNombreCategorias();
  } catch (error) {
    console.error('Error al agregar gasto:', error);
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

.input-group {
  margin-bottom: 8px;
}

.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 30px 0px;
}

.title {
  width: fit-content;
}

.title h1 {
  width: fit-content;
  white-space: nowrap;
  margin: 0;
}

.filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  gap: 20px;
  width: 100%;
}

.filters .v-input {
  max-width: 300px;
}

.filters button {
  height: 56px;
}

.v-card-item__prepend {
  display: none;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.buttons-forms {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.buttons-forms button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

.buttons-forms button:first-child {
  background-color: #f44336;
  color: white;
}

.buttons-forms button:last-child {
  background-color: #ecab00;
  color: white;
}
</style>
