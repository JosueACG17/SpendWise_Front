import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUsers, createUser, updateUser, deleteUser } from '@/services/userService'
import Swal from 'sweetalert2'

interface User {
  id: number
  email: string
  rolId: number
}

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref<boolean>(false)

  const getUsers = async (): Promise<void> => {
    try {
      loading.value = true
      const usersResponse = await fetchUsers()
      users.value = usersResponse
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron obtener los usuarios. Inténtalo de nuevo.',
      })
    } finally {
      loading.value = false
    }
  }

  const addUser = async (userData: {
    email: string
    password: string
    rolId: number
  }): Promise<void> => {
    try {
      loading.value = true
      const newUser = await createUser(userData)
      users.value.push(newUser)
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario creado correctamente.',
      })
    } catch (error) {
      console.error('Error al crear usuario:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el usuario. Inténtalo de nuevo.',
      })
    } finally {
      loading.value = false
    }
  }

  const editUser = async (
    userId: number,
    userData: { email: string; password: string; rolId: number },
  ): Promise<void> => {
    try {
      loading.value = true
      const updatedUser = await updateUser(userId, userData)
      const index = users.value.findIndex((u) => u.id === userId)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario actualizado correctamente.',
      })
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el usuario. Inténtalo de nuevo.',
      })
    } finally {
      loading.value = false
    }
  }

  const removeUser = async (userId: number): Promise<void> => {
    try {
      loading.value = true
      await deleteUser(userId)
      users.value = users.value.filter((u) => u.id !== userId)
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario eliminado correctamente.',
      })
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el usuario. Inténtalo de nuevo.',
      })
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    getUsers,
    addUser,
    editUser,
    removeUser,
  }
})
