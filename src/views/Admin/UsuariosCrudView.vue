<template>
  <NavSidebar>
    <main class="flex-1 overflow-auto p-6 bg-gray-100">
      <p class="text-center text-3xl font-bold mb-4">¡Bienvenido Josue!</p>

      <button
        @click="openAddUserModal"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-6"
      >
        Agregar Usuario
      </button>

      <TableComponent
        title="Tabla de Usuarios"
        :headers="['Correo Electronico', 'Rol']"
        :rows="tableUsers"
        :showActions="true"
        @edit="editUser"
        @delete="deleteUser"
      />
    </main>
  </NavSidebar>

  <UserModal
    :isModalOpen="isModalOpen"
    :user="selectedUser"
    @close="closeModal"
    @save="saveUser"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import NavSidebar from './components/NavSidebar.vue';
import TableComponent from '@/common/TableComponent.vue';
import UserModal from '@/components/UserModal.vue'; // Asegúrate de que la ruta sea correcta

const tableUsers = ref([
  { id: 1, email: 'usuario1@example.com', role: 'Admin' },
  { id: 2, email: 'usuario2@example.com', role: 'Editor' },
  { id: 3, email: 'usuario3@example.com', role: 'Usuario' },
]);

const isModalOpen = ref(false);
const selectedUser = ref(null);

const openAddUserModal = () => {
  selectedUser.value = null; // Resetear para agregar nuevo usuario
  isModalOpen.value = true;
};

const editUser = (user) => {
  selectedUser.value = user; // Cargar datos del usuario seleccionado
  isModalOpen.value = true;
};

const deleteUser = (user) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres eliminar este usuario?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
  }).then((result) => {
    if (result.isConfirmed) {
      tableUsers.value = tableUsers.value.filter((u) => u.id !== user.id);
      Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
    }
  });
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveUser = (user) => {
  if (user.id) {
    const index = tableUsers.value.findIndex((u) => u.id === user.id);
    tableUsers.value[index] = user;
  } else {
    user.id = tableUsers.value.length + 1; // Asignar un ID único
    tableUsers.value.push(user);
  }

  closeModal();
};
</script>
