<template>
  <NavbarComponent />
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <!-- Hero Section -->
    <section class="py-16 px-4">
      <div class="text-center max-w-3xl mx-auto animate__animated animate__fadeIn">
        <h1 class="sm:text-6xl text-4xl font-bold text-[#342E2E] sm:mb-6 mb-4">
          Controla tus finanzas de manera inteligente
        </h1>
        <p class="text-xl text-gray-600 mb-8 ">
          No somos los unicos, pero si los mejores.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/gastos">
          <button class="bg-yellow-500  px-8 py-3 rounded-lg font-medium hover:bg-yellow-600 cursor-pointer transition-colors animate__animated animate__fadeInLeft animate__delay-1s">
            Ver gastos
          </button>
        </RouterLink>
        <RouterLink to="/presupuestos">
          <button class="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium cursor-pointer transition-colors animate__animated animate__fadeInRight animate__delay-1s">
            Ver presupuestos
          </button>
        </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="sm:py-12 py-4 px-4">
      <div class=" grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mx-auto">
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 animate__animated animate__fadeInUp animate__delay-1s">
          <div class="bg-[#342E2E] w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <WalletIcon class="text-white w-6 h-6" />
          </div>
          <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Gestiona tus gastos</h2>
          <p class="text-[#817A7A]">
            Registra y categoriza tus gastos para tener un control total de tu dinero.
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s">
          <div class="bg-[#342E2E] w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <BanknotesIcon class="text-white w-6 h-6" />
          </div>
          <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Planifica tu ahorro</h2>
          <p class="text-[#817A7A]">
            Establece metas de ahorro y sigue tu progreso para alcanzar tus objetivos.
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 animate__animated animate__fadeInUp animate__delay-3s">
          <div class="bg-[#342E2E] w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <ChartBarIcon class="text-white w-6 h-6" />
          </div>
          <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Informes detallados</h2>
          <p class="text-[#817A7A]">
            Obtén informes visuales y análisis para tomar decisiones financieras informadas.
          </p>
        </div>
      </div>
    </section>

    <!-- Charts Section -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#342E2E] mb-12 animate__animated animate__fadeIn">
          Visualiza tus finanzas
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg shadow-md animate__animated animate__fadeInLeft">
            <h3 class="text-xl font-semibold mb-4 text-[#342E2E]">Gastos por categoría</h3>
            <div class="h-80">
              <ChartComponent :chartData="expensesByCategory" />
            </div>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md animate__animated animate__fadeInRight">
            <h3 class="text-xl font-semibold mb-4 text-[#342E2E]">Evolución de gastos</h3>
            <div class="h-80">
              <LineChart :chartData="expensesOverTime" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#342E2E] mb-12 animate__animated animate__fadeIn">
          Lo que dicen nuestros usuarios
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeIn">
            <div class="flex items-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="w-12 h-12 bg-gray-200 rounded-full mr-4">
              <div>
                <h4 class="font-semibold text-[#342E2E]">María García</h4>
                <p class="text-sm text-gray-500">Emprendedora</p>
              </div>
            </div>
            <p class="text-[#817A7A]">"Esta aplicación ha transformado la manera en que manejo mis finanzas personales. Ahora tengo claridad total sobre mis gastos."</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-1s">
            <div class="flex items-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="w-12 h-12 bg-gray-200 rounded-full mr-4">
              <div>
                <h4 class="font-semibold text-[#342E2E]">Carlos Rodríguez</h4>
                <p class="text-sm text-gray-500">Profesional</p>
              </div>
            </div>
            <p class="text-[#817A7A]">"Gracias a esta plataforma he podido ahorrar más del 20% de mis ingresos mensuales. Las visualizaciones son increíblemente útiles."</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-2s">
            <div class="flex items-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="w-12 h-12 bg-gray-200 rounded-full mr-4">
              <div>
                <h4 class="font-semibold text-[#342E2E]">Laura Martínez</h4>
                <p class="text-sm text-gray-500">Estudiante</p>
              </div>
            </div>
            <p class="text-[#817A7A]">"Incluso con un presupuesto ajustado de estudiante, esta app me ha ayudado a organizar mis gastos y evitar deudas innecesarias."</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { WalletIcon, BanknotesIcon, ChartBarIcon } from '@heroicons/vue/24/solid';
import ChartComponent from './components/ChartComponent.vue';
import LineChart from './components/LineChart.vue';

interface ChartDataset {
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  label?: string;
  tension?: number;
  fill?: boolean;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// Chart data for expenses by category
const expensesByCategory = ref<ChartData>({
  labels: ['Alimentación', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud'],
  datasets: [
    {
      data: [30, 15, 40, 10, 5],
      backgroundColor: [
        '#4A6FA5',
        '#FF6B6B',
        '#4ECDC4',
        '#FFD166',
        '#6A0572'
      ],
      borderWidth: 0
    }
  ]
});

// Chart data for expenses over time
const expensesOverTime = ref<ChartData>({
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Gastos',
      data: [1500, 1700, 1400, 1800, 1600, 1300],
      borderColor: '#4A6FA5',
      backgroundColor: 'rgba(74, 111, 165, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Ingresos',
      data: [2000, 2000, 2100, 2100, 2200, 2300],
      borderColor: '#4ECDC4',
      backgroundColor: 'rgba(78, 205, 196, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
});
</script>

<style>
@import 'animate.css';

/* Additional custom styles */
.animate__delay-1s {
  --animate-delay: 0.3s;
}

.animate__delay-2s {
  --animate-delay: 0.6s;
}

.animate__delay-3s {
  --animate-delay: 0.9s;
}
</style>
