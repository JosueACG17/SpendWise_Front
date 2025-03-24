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
    @save="saveUser"
    @close="closeModal"
  >
    <form @submit.prevent="saveUser">
      <div class="mb-4">
        <label class="text-gray-700 block mb-2">Correo Electrónico</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2"
          placeholder="Ingrese el correo electrónico"
        />
      </div>

      <div class="mb-4">
        <label class="text-gray-700 block mb-2">Contraseña</label>
        <input
          v-model="form.password"
          type="password"
          :required="!selectedUser"
          class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2"
          placeholder="Ingrese la contraseña"
        />
      </div>

      <div class="mb-4">
        <label class="text-gray-700 block mb-2">Rol</label>
        <select
          v-model="form.rolId"
          required
          class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2"
        >
          <option value="" disabled>Seleccione un rol</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.nombre }}</option>
        </select>
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
import { jwtDecode } from 'jwt-decode'

interface Role {
  id: number;
  nombre: string;
}

interface UserForm {
  email: string;
  password?: string;
  rolId: number | null;
}

const userStore = useUserStore();
const isModalOpen = ref<boolean>(false);
const selectedUser = ref<any | null>(null);
const roles = ref<Role[]>([]);

const form = ref<UserForm>({
  email: '',
  password: '',
  rolId: null,
});

onMounted(async () => {
  await userStore.getUsers();
  const rolesResponse = await fetchRoles();
  roles.value = rolesResponse;
});

const openAddUserModal = (): void => {
  selectedUser.value = null;
  form.value = { email: '', password: '', rolId: null };
  isModalOpen.value = true;
};

const editUser = (user: any): void => {
  selectedUser.value = user;
  form.value = { email: user.email, password: '', rolId: user.rolId };
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
};

const saveUser = async (): Promise<void> => {
  const userData: any = {
    email: form.value.email,
    rolId: form.value.rolId,
  };
  if (form.value.password) {
    userData.contraseña = form.value.password;
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
  } catch {
    Swal.fire('Error', 'Hubo un problema al guardar el usuario.', 'error');
  }
};

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
