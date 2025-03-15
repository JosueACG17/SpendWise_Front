<template>
  <NavbarComponent  />
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col items-center justify-center p-4 ">
    <div class="text-center max-w-2xl ">
      <h1 class="sm:text-6xl text-4xl font-bold text-[#342E2E] sm:mb-6 mb-4">
        Controla tus finanzas de manera inteligente
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        No somos los unicos, pero si los mejores.
      </p>
    </div>

    <div class="sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full p-6 sm:p-0">
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
        <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Gestiona tus gastos</h2>
        <p class="text-[#817A7A]">
          Registra y categoriza tus gastos para tener un control total de tu dinero.
        </p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
        <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Planifica tu ahorro</h2>
        <p class="text-[#817A7A]">
          Establece metas de ahorro y sigue tu progreso para alcanzar tus objetivos.
        </p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
        <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Informes detallados</h2>
        <p class="text-[#817A7A]">
          Obtén informes visuales y análisis para tomar decisiones financieras informadas.
        </p>
      </div>
    </div>
  </div>
<FooterComponent/>
</template>

<script lang="ts" setup>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>
