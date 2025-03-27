<template>
  <NavbarComponent />
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen overflow-x-hidden">
    <!-- Hero Section -->
    <section class="py-16 px-4 text-center max-w-3xl mx-auto animate__animated animate__fadeIn">
      <h1 class="sm:text-6xl text-4xl font-bold text-[#342E2E] sm:mb-6 mb-4 animate__animated animate__fadeInDown">
        Controla tus finanzas de manera inteligente
      </h1>
      <p class="text-xl text-gray-600 mb-8 animate__animated animate__fadeInUp animate__delay-1s">
        No somos los únicos, pero sí los mejores.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center animate__animated animate__fadeInUp animate__delay-2s">
        <RouterLink to="/gastos">
          <button
            class="bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium w-full hover:bg-yellow-600 cursor-pointer transition-colors ">
            Ver gastos
          </button>
        </RouterLink>
        <RouterLink to="/presupuestos">
          <button
            class="bg-black text-white hover:bg-gray-800 px-8 py-3 w-full rounded-lg font-medium cursor-pointer transition-colors">
            Ver presupuestos
          </button>
        </RouterLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="sm:py-12 py-4 px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mx-auto">
        <div
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform animate__animated animate__zoomIn animate__delay-1s">
          <div
            class="bg-[#342E2E] w-12 h-12 rounded-full flex items-center justify-center mb-4 animate__animated animate__bounceIn">
            <WalletIcon class="text-white w-6 h-6" />
          </div>
          <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Gestiona tus gastos</h2>
          <p class="text-[#817A7A]">Registra y categoriza tus gastos para tener un control total de tu dinero.</p>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform animate__animated animate__zoomIn animate__delay-2s">
          <div
            class="bg-[#342E2E] w-12 h-12 rounded-full flex items-center justify-center mb-4 animate__animated animate__bounceIn animate__delay-1s">
            <BanknotesIcon class="text-white w-6 h-6" />
          </div>
          <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Planifica tu ahorro</h2>
          <p class="text-[#817A7A]">Establece metas de ahorro y sigue tu progreso para alcanzar tus objetivos.</p>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform animate__animated animate__zoomIn animate__delay-3s">
          <div
            class="bg-[#342E2E] w-12 h-12 rounded-full flex items-center justify-center mb-4 animate__animated animate__bounceIn animate__delay-2s">
            <ChartBarIcon class="text-white w-6 h-6" />
          </div>
          <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Informes detallados</h2>
          <p class="text-[#817A7A]">Obtén informes visuales y análisis para tomar decisiones financieras informadas.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center">
      <div class="p-8 md:p-12 lg:px-16 lg:py-24">
        <div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 class="mt-8 font-bold tracking-tight sm:text-6xl text-4xl animate__animated animate__fadeIn">Visualiza Gráficamente tus Gastos</h1>

          <p class="mt-6 text-lg leading-8 text-gray-600">
            Con gráficos intuitivos
            y reportes detallados, podrás visualizar en qué estás gastando tu dinero y tomar decisiones más informadas.
          </p>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            Mantén un seguimiento claro de tus ingresos y egresos, establece presupuestos personalizados y recibe
            alertas
            para que nunca pierdas de vista tu situación financiera. ¡Empieza hoy mismo y mejora tu bienestar económico!
          </p>

          <div class="mt-4 md:mt-8">
            <RouterLink to="/graficas">
          <button
          class="inline-block rounded-sm bg-yellow-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-yellow-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
          >
            Ver graficas
          </button>
        </RouterLink>
          </div>
        </div>
      </div>

      <img alt=""
        src="https://images.pexels.com/photos/8145328/pexels-photo-8145328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        class="h-90 w-full object-cover sm:h-[calc(90%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(90%_-_4rem)] md:rounded-ss-[60px]" />
    </section>

    <!-- Módulos Section -->
    <section class="py-16 bg-gray-50 ">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#342E2E] mb-12">
          Nuestros Módulos Principales
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="bg-[#342E2E] w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <WalletIcon class="text-white w-10 h-10" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-center text-[#342E2E] mb-3">Gestión de Gastos</h3>
            <p class="text-[#817A7A] text-center">
              Registra y clasifica todos tus gastos diarios. Visualiza en qué gastas tu dinero con análisis detallados.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="bg-[#342E2E] w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <BanknotesIcon class="text-white w-10 h-10" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-center text-[#342E2E] mb-3">Control de Presupuestos</h3>
            <p class="text-[#817A7A] text-center">
              Establece límites de gasto por categoría y recibe alertas cuando te acerques a tus límites.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="bg-[#342E2E] w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-10 h-10 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-center text-[#342E2E] mb-3">Categorías Personalizadas</h3>
            <p class="text-[#817A7A] text-center">
              Crea y gestiona tus propias categorías para organizar tus finanzas como prefieras.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="bg-[#342E2E] w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-10 h-10 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-center text-[#342E2E] mb-3">Sobre la App</h3>
            <p class="text-[#817A7A] text-center">
              Una solución todo-en-uno para gestionar tus finanzas personales con sencillez y poder.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <FooterComponent />
</template>

<script lang="ts" setup>
import { WalletIcon, BanknotesIcon, ChartBarIcon } from '@heroicons/vue/24/solid';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<style scoped>
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-gray-50 {
  --tw-gradient-from: #f9fafb;
}

.to-gray-100 {
  --tw-gradient-to: #f3f4f6;
}

.text-\[\#342E2E\] {
  color: #342E2E;
}

.text-\[\#817A7A\] {
  color: #817A7A;
}
</style>
