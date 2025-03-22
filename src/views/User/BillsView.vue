<template>
  <NavbarComponent />
  <div
    class=" mx-auto p-8 min-h-screen items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">


    <div class="top">
      <div class="title">
        <h1 class="text-center text-4xl font-bold text-gray-800 mb-4 mt-5 sm:mt-0  animate__animated animate__fadeIn">
          Mis Gastos</h1>

      </div>
      <div class="filters ">
        <!-- <v-select label="Select" :items="presupuestos" :label="categoria" variant="solo-filled"></v-select> -->
        <v-select label="Selecciona una categoría" :items="presupuestos" item-title="categoria" item-value="id"
          v-model="selectedId" variant="solo-filled"></v-select>
        <button @click="openAddModal"
          class="bg-gradient-to-r cursor-pointer from-yellow-500 to-yellow-600 text-white sm:px-6 sm:py-3 px-2 py-1.5 rounded-full hover:from-yellow-500 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl self-end">
          Agregar Gasto
        </button>
      </div>
    </div>

    <!-- Resumen de Presupuestos -->
    <div class="bg-white rounded-xl shadow-xl p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Resumen de gastos</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Presupuesto Total</p>
          <p class="text-2xl font-bold text-gray-800">{{ formatCurrency(totalAsignado) }} MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Gastos totales</p>
          <p class="text-2xl font-extrabold text-red-600">{{ formatCurrency(totalGastado) }} MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Restante</p>
          <p class="text-2xl font-extrabold text-green-600">{{ formatCurrency(totalRestante) }} MXN</p>
        </div>
      </div>
    </div>

    <TableContent title="Lista de gastos" description="Gestiona tus gastos para un mejor análisis."
      searchPlaceholder="Buscar gastos..." :items="gastos" emptyStateMessage="Comienza creando un nuevo gasto"
      addButtonText="Agregar Gasto" @add="openAddModal" @edit="editGastos" @delete="eliminarGasto" />

    <v-dialog v-model="dialog" width="500">
      <v-card max-width="700">
        <v-card-title>Agregar Transacción</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <div class="inputs">
              <v-select label="Selecciona una categoría" :items="presupuestos" item-title="categoria" item-value="id"
                v-model="selectedId" variant="solo-filled"></v-select>
              <v-text-field v-model="form.monto" label="Monto" type="number" variant="solo-filled"></v-text-field>
              <v-text-field v-model="form.fecha" label="Fecha" type="date" variant="solo-filled"></v-text-field>
              <v-text-field v-model="form.descripcion" label="Descripción" variant="solo-filled"></v-text-field>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="buttons-forms">
            <button @click="dialog = false">Cancelar</button>
            <button @click="submitForm">Guardar</button>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
  <FooterComponent />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import 'animate.css';
import { addGasto, deleteGasto, getGastosPorUsuario, updateGasto } from '@/services/gastosService';
import TableContent from './components/TableContentGastos.vue';

onMounted(() => {
  cargarGastos();
});

const dialog = ref(false)
const gastos = ref([]);
const usuarioId = 1;
const selectedId = ref(null);
const editingCategory = ref(null);

const getIcon = (categoria: string) => {
  switch (categoria) {
    case 'Alimentación':
      return '🍔';
    case 'Transporte':
      return '🚗';
    case 'Servicios':
      return '🌐';
    default:
      return '💳';
  }
};

const cargarGastos = async () => {
  try {
    gastos.value = await getGastosPorUsuario(usuarioId);
    console.log('Gastos cargados:', gastos.value);
  } catch (error) {
    console.error('Error al obtener gastos:', error);
  }
};

const totalAsignado = computed(() => {
  return presupuestos.value.reduce((total, p) => total + p.asignado, 0);
});

const totalGastado = computed(() => {
  return gastos.value.reduce((total, p) => total + p.monto, 0);
});

const totalRestante = computed(() => {
  return totalAsignado.value - totalGastado.value;
});


const presupuestos = ref([
  { id: 1, categoria: 'Alimentación', asignado: 1500, gastado: 800 },
  { id: 2, categoria: 'Transporte', asignado: 1000, gastado: 600 },
  { id: 3, categoria: 'Servicios', asignado: 2000, gastado: 900 },
  { id: 4, categoria: 'Entretenimiento', asignado: 500, gastado: 300 },
]);

const form = ref({
  usuarioId: 1,
  monto: 0,
  categoriaId: 1,
  // categoriaId: selectedId,
  fecha: new Date(),
  descripcion: '',
});


const submitForm = async () => {
  try {
    // console.log(form.value);
    // return
    if (editingCategory.value) {
      await updateGasto(editingCategory.value.id, form.value);
      console.log(`Gasto ${editingCategory.value.id} actualizado`);

    } else {
      const response = await addGasto(form.value);
      console.log('Gasto agregado:', response);
    }
    dialog.value = false;
    cargarGastos();
  } catch (error) {
    console.error('Error al agregar gasto:', error);
  }
};


const formatFecha = (fecha) => {
  if (!fecha) return 'Fecha no disponible';
  return new Date(fecha).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


const eliminarGasto = async (data) => {
  // if (!confirm('¿Estás seguro de que quieres eliminar este gasto?')) return;
  try {
    await deleteGasto(data.id);
    console.log(`Gasto ${data.id} eliminado`);
    cargarGastos();
  } catch (error) {
    console.error('Error al eliminar gasto:', error);
  }
};

const openAddModal = () => {
  editingCategory.value = null;
  form.value = {
    usuarioId: 1,
    monto: 0,
    categoriaId: 1,
    fecha: new Date(),
    descripcion: '',
  };
  dialog.value = true;
};

const editGastos = async (gasto) => {
  editingCategory.value = gasto;
  form.value = {
    usuarioId: 1,
    monto: gasto.monto,
    categoriaId: 1,
    fecha: gasto.fecha,
    descripcion: gasto.descripcion,
  };
  dialog.value = true;

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
