<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" width="500">
    <v-card max-width="700">
      <v-card-title>{{ gasto?.id ? 'Editar Gasto' : 'Agregar Transacción' }}</v-card-title>
      <v-card-text>
        <Form @submit="handleSubmit" :validation-schema="schema" :initial-values="gasto || form" v-slot="{ errors }">
          <div class="inputs">
            <div class="input-group">
              <Field name="categoriaId" v-slot="{ field }">
                <v-select
                  v-bind="field"
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  label="Selecciona una categoría"
                  :items="categorias"
                  item-title="nombre"
                  item-value="id"
                  variant="solo-filled"
                  :error="!!errors.categoriaId"
                ></v-select>
                <div v-if="errors.categoriaId" class="error-message">{{ errors.categoriaId }}</div>
              </Field>
            </div>

            <div class="input-group">
              <Field name="monto" v-slot="{ field }">
                <v-text-field
                  v-bind="field"
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  label="Monto"
                  type="number"
                  variant="solo-filled"
                  :error="!!errors.monto"
                ></v-text-field>
                <div v-if="errors.monto" class="error-message">{{ errors.monto }}</div>
              </Field>
            </div>

            <div class="input-group">
              <Field name="fecha" v-slot="{ field }">
                <v-text-field
                  v-bind="field"
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  label="Fecha"
                  type="date"
                  variant="solo-filled"
                  :error="!!errors.fecha"
                ></v-text-field>
                <div v-if="errors.fecha" class="error-message">{{ errors.fecha }}</div>
              </Field>
            </div>

            <div class="input-group">
              <Field name="descripcion" v-slot="{ field }">
                <v-text-field
                  :model-value="field.value"
                  @update:model-value="(val) => { field.onChange(val); form.descripcion = val; }"
                  label="Descripción"
                  variant="solo-filled"
                  :error="!!errors.descripcion"
                ></v-text-field>
                <div v-if="errors.descripcion" class="error-message">{{ errors.descripcion }}</div>
              </Field>
            </div>

            <v-card-actions>
              <div class="flex justify-end w-full">
                <button
                  class="mt-3 w-full inline-flex justify-center rounded-md cursor-pointer border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  type="button"
                  @click="closeModal"
                >
                  Cancelar
                </button>
                <button
                  class="w-full inline-flex justify-center rounded-md cursor-pointer border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                  type="submit"
                >
                  Guardar
                </button>
              </div>
            </v-card-actions>
          </div>
        </Form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2';

const props = defineProps({
  modelValue: Boolean,
  gasto: {
    type: Object,
    default: null
  },
  categorias: {
    type: Array,
    required: true
  },
  presupuestos: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'submit']);

const schema = yup.object({
  categoriaId: yup.number().required('La categoría es requerida').typeError('Elige una categoría válida'),
  monto: yup.number()
    .required('El monto es requerido')
    .min(1, 'El monto debe ser mayor a 0')
    .typeError('El monto debe ser un número válido'),
  fecha: yup.date()
    .required('La fecha es requerida')
    .max(new Date(), 'La fecha no puede ser futura')
    .typeError('La fecha debe ser válida'),
  descripcion: yup.string()
    .trim()
    .required('La descripción es requerida')
    .max(100, 'La descripción no puede exceder 100 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'La descripción solo puede contener letras y espacios')
});

const form = ref({
  usuarioId: null,
  monto: 0,
  categoriaId: null,
  fecha: new Date().toISOString().split('T')[0],
  descripcion: '',
});

const closeModal = () => {
  emit('update:modelValue', false);
};

const handleSubmit = async (values: any) => {
  const presupuestoCategoria = props.presupuestos.find((p: any) => p.categoriaId === values.categoriaId);

  if (!presupuestoCategoria) {
    closeModal();
    Swal.fire({
      icon: 'warning',
      title: 'Categoría sin presupuesto',
      text: 'No puedes agregar gastos a una categoría que no tiene presupuesto asignado. Por favor, crea un presupuesto primero.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#f59e0b',
    });
    return;
  }

  emit('submit', values);
  closeModal();
};

watch(() => props.gasto, (newVal) => {
  if (newVal) {
    form.value = {
      ...newVal,
      fecha: new Date(newVal.fecha).toISOString().split('T')[0]
    };
  } else {
    form.value = {
      usuarioId: null,
      monto: 0,
      categoriaId: null,
      fecha: new Date().toISOString().split('T')[0],
      descripcion: '',
    };
  }
}, { immediate: true });
</script>

<style scoped>
.error-message {
  color: #ff5252;
  font-size: 0.85rem;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  margin-bottom: 12px;
}
</style>
