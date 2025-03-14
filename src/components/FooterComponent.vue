<template>
  <footer class="bg-black text-white py-8">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Contenedor de columnas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center text-center md:text-left">
        <div class="col-span-1">
          <RouterLink to="/home" class="flex items-center justify-center md:justify-start space-x-3 rtl:space-x-reverse">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/50/Bitcoin.png"
              class="h-8"
              alt="SpendWise Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap">SpendWise</span>
          </RouterLink>
          <p class="mt-4 text-sm text-gray-400 max-w-md mx-auto md:mx-0">
            Controla tus finanzas de manera inteligente y alcanza tus metas financieras con SpendWise.
          </p>
        </div>

        <div class="col-span-1">
          <h3 class="text-lg font-semibold mb-4">Síguenos</h3>
          <div class="flex justify-center md:justify-start space-x-4">
            <a
              href="#"
              class="text-gray-400 hover:text-yellow-500 transition duration-300"
              aria-label="Facebook"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-yellow-500 transition duration-300"
              aria-label="Twitter"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0023.953 4.57z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-yellow-500 transition duration-300"
              aria-label="LinkedIn"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2023 SpendWise. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>
