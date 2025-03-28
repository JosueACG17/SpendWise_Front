<template>
  <NavSidebar>
    <main class="flex-1 overflow-auto p-6 bg-gray-100">
      <p class="text-center text-3xl font-bold mb-4">Lista de usuarios</p>
      <div class="flex justify-end">
        <button
          @click="openAddUserModal"
          class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 mb-4 cursor-pointer"
        >
          Agregar Usuario
        </button>
      </div>

      <TableComponent
        title="Tabla de Usuarios"
        :headers="['Correo Electronico', 'Rol']"
        :rows="tableUsers"
        :showActions="true"
        :nonDeletableUserIds="[currentUserId]"
        @edit="editUser"
        @delete="deleteUser"
      />
    </main>
  </NavSidebar>

  <GenericModal
    :show="isModalOpen"
    :title="selectedUser ? 'Editar Usuario' : 'Agregar Usuario'"
    :saveButtonText="selectedUser ? 'Actualizar' : 'Crear'"
    :icon="UserIcon"
    @save="onSubmit"
    @close="closeModal"
  >
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <label class="text-gray-700 block mb-2">Correo Electrónico</label>
        <input
          v-model="email"
          @blur="validateField('email')"
          type="email"
          class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2"
          placeholder="Ingrese el correo electrónico"
          :class="{ 'border-red-500': (meta.touched || submitCount > 0) && errors.email }"
        />
        <p v-if="(meta.touched || submitCount > 0) && errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <div class="mb-4">
    <label class="text-gray-700 block mb-2">Contraseña</label>
    <input
      v-model="password"
      @blur="validateField('password')"
      type="password"
      class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2"
      :placeholder="isEditMode ? 'Nueva Contraseña (dejar vacío para mantener la actual)' : 'Ingrese la contraseña'"
      :class="{ 'border-red-500': (meta.touched || submitCount > 0) && errors.password }"
    />
    <p v-if="(meta.touched || submitCount > 0) && errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
  </div>

      <div class="mb-4">
        <label class="text-gray-700 block mb-2">Rol</label>
        <select
          v-model="rolId"
          @blur="validateField('rolId')"
          class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2"
          :class="{ 'border-red-500': (meta.touched || submitCount > 0) && errors.rolId }"
        >
          <option value="" disabled>Seleccione un rol</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.nombre }}</option>
        </select>
        <p v-if="(meta.touched || submitCount > 0) && errors.rolId" class="text-red-600 text-sm mt-1">{{ errors.rolId }}</p>
      </div>
    </form>
  </GenericModal>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';
import NavSidebar from './components/NavSidebar.vue';
import TableComponent from '@/common/TableComponent.vue';
import { UserIcon } from '@heroicons/vue/24/solid';
import GenericModal from '@/common/GenericModal.vue';
import { useUserStore } from '@/stores/userStore';
import { fetchRoles } from '@/services/roleService';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

interface Role {
  id: number;
  nombre: string;
}

const userStore = useUserStore();
const isModalOpen = ref<boolean>(false);
const selectedUser = ref<any | null>(null);
const roles = ref<Role[]>([]);
const originalPassword = ref<string | null>(null);

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Correo Electrónico inválido')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
      'El correo debe tener un formato válido'
    )
    .required('El correo es requerido'),
  password: yup.string()
    .trim()
    .when('isEditMode', {
      is: false,
      then: (schema) => schema
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es requerida'),
      otherwise: (schema) => schema
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .nullable()
    }),
  rolId: yup.number()
    .required('El rol es requerido')
    .typeError('Debes seleccionar un rol')
});

const {
  errors,
  handleSubmit,
  defineField,
  validateField,
  meta,
  resetForm,
  submitCount,
  setFieldValue
} = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
    rolId: null,
    isEditMode: false
  },
  validateOnMount: false,
  validateOnChange: false,
  validateOnBlur: false
});

const [email] = defineField('email');
const [password] = defineField('password');
const [rolId] = defineField('rolId');
const isEditMode = ref(false);

onMounted(async () => {
  await userStore.getUsers();
  const rolesResponse = await fetchRoles();
  roles.value = rolesResponse;
});

const openAddUserModal = (): void => {
  selectedUser.value = null;
  isEditMode.value = false;
  originalPassword.value = null;
  resetForm({
    values: {
      email: '',
      password: '',
      rolId: null,
      isEditMode: false
    }
  });
  isModalOpen.value = true;
};

const editUser = (user: any): void => {
  selectedUser.value = user;
  isEditMode.value = true;
  originalPassword.value = user.password; // Guardamos la contraseña original
  const role = roles.value.find(r => r.nombre === user.role);

  resetForm({
    values: {
      email: user.email,
      password: '',
      rolId: role ? role.id : null,
      isEditMode: true
    }
  });

  isModalOpen.value = true;
};

const deleteUser = async (user: any): Promise<void> => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres eliminar este usuario?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
  });
  if (result.isConfirmed) {
    await userStore.removeUser(user.id);
    await userStore.getUsers();
  }
};

const closeModal = (): void => {
  isModalOpen.value = false;
  originalPassword.value = null;
};

const onSubmit = handleSubmit(async (values) => {
  const userData: any = {
    email: values.email,
    rolId: values.rolId,
  };

  // Solo agregamos la contraseña si:
  // 1. Estamos creando un nuevo usuario (obligatorio)
  // 2. O estamos editando y se proporcionó una nueva contraseña
  if (!isEditMode.value || (isEditMode.value && values.password)) {
    userData.contraseña = values.password;
  }

  try {
    if (selectedUser.value) {
      await userStore.editUser(selectedUser.value.id, userData);
    } else {
      await userStore.addUser(userData);
    }
    await userStore.getUsers();
    Swal.fire('Éxito', 'Usuario guardado correctamente.', 'success');
    closeModal();
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    Swal.fire('Error', 'Hubo un problema al guardar el usuario.', 'error');
  }
});

const tableUsers = computed(() => {
  return userStore.users.map((user) => ({
    id: user.id,
    email: user.email,
    role: user.rolNombre || 'Sin rol',
  }));
});

const getCurrentUserId = (): number | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode<{ nameid: string }>(token);
    return parseInt(decodedToken.nameid);
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

const currentUserId = getCurrentUserId();
</script>
