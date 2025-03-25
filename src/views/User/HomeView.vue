<template>
  <NavbarComponent />
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen overflow-x-hidden">
    <!-- Hero Section -->
    <section class="py-16 px-4">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="sm:text-6xl text-4xl font-bold text-[#342E2E] sm:mb-6 mb-4">
          Controla tus finanzas de manera inteligente
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          No somos los únicos, pero sí los mejores.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/gastos">
            <button class="bg-yellow-500 px-8 py-3 rounded-lg font-medium w-full hover:bg-yellow-600 cursor-pointer transition-colors">
              Ver gastos
            </button>
          </RouterLink>
          <RouterLink to="/presupuestos">
            <button class="bg-black text-white hover:bg-gray-800 px-8 py-3 w-full rounded-lg font-medium cursor-pointer transition-colors">
              Ver presupuestos
            </button>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="sm:py-12 py-4 px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mx-auto">
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
          <div class="bg-[#342E2E] w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <WalletIcon class="text-white w-6 h-6" />
          </div>
          <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Gestiona tus gastos</h2>
          <p class="text-[#817A7A]">
            Registra y categoriza tus gastos para tener un control total de tu dinero.
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
          <div class="bg-[#342E2E] w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <BanknotesIcon class="text-white w-6 h-6" />
          </div>
          <h2 class="text-2xl font-semibold text-[#342E2E] mb-4">Planifica tu ahorro</h2>
          <p class="text-[#817A7A]">
            Establece metas de ahorro y sigue tu progreso para alcanzar tus objetivos.
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
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

    <!-- Charts Section Simplificada -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#342E2E] mb-12">
          Visualiza tus finanzas
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4 text-[#342E2E]">Gastos por categoría</h3>
            <div class="h-80">
              <ChartComponent
                v-if="categoriesLoaded"
                :chartData="expensesByCategory"
              />
              <div v-else class="h-full flex items-center justify-center">
                <p class="text-gray-500">Cargando datos...</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4 text-[#342E2E]">Evolución de gastos</h3>
            <div class="h-80">
              <LineChart
                v-if="monthsLoaded"
                :chartData="expensesOverTime"
              />
              <div v-else class="h-full flex items-center justify-center">
                <p class="text-gray-500">Cargando datos...</p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-8">
          <div class="text-center mb-6">
            <h3 class="text-3xl font-bold text-center text-[#342E2E]">Exporta tu reporte financiero</h3>
            <p class="text-[#817A7A] mt-2">
              Descarga un PDF con tu análisis completo para compartir o guardar tus registros
            </p>
          </div>
          <button @click="handleDownloadPDF"
            class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-colors font-medium" :disabled="!categoriesLoaded || !monthsLoaded"
          >
            <span class="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              Descargar PDF
            </span>
          </button>
        </div>
      </div>
    </section>
    <!-- Módulos Section -->
    <section class="py-16 bg-gray-50">
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
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
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { WalletIcon, BanknotesIcon, ChartBarIcon } from '@heroicons/vue/24/solid';
import ChartComponent from './components/ChartComponent.vue';
import LineChart from './components/LineChart.vue';
import { getCategories } from '@/services/categoryService';
import { getGastosPorUsuario } from '@/services/gastosService';
import { generateFinancialPDF } from '@/utils/PdfGenerator';

const handleDownloadPDF = () => {
  generateFinancialPDF(
    {
      labels: expensesByCategory.value.labels,
      datasets: [{
        data: expensesByCategory.value.datasets[0].data,
        label: 'Gastos por categoría'
      }]
    },
    {
      labels: expensesOverTime.value.labels,
      datasets: [{
        data: expensesOverTime.value.datasets[0].data,
        label: 'Evolución mensual'
      }]
    }
  );
};

const categoriesLoaded = ref(false);
const monthsLoaded = ref(false);
const userId = ref<number | null>(null);

const expensesByCategory = ref({
  labels: [] as string[],
  datasets: [{
    data: [] as number[],
    backgroundColor: ['#4A6FA5', '#FF6B6B', '#4ECDC4', '#FFD166', '#6A0572'],
    borderWidth: 0
  }]
});

const expensesOverTime = ref({
  labels: [] as string[],
  datasets: [{
    label: 'Gastos',
    data: [] as number[],
    borderColor: '#4A6FA5',
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    tension: 0.4,
    fill: true
  }]
});

// Decodificar token para obtener userId
const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) {
    console.error('Token no encontrado');
    return null;
  }

  try {
    const decoded: { nameid: string } = jwtDecode(token);
    return parseInt(decoded.nameid);
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
};

const loadFinancialData = async () => {
  userId.value = getUserIdFromToken();
  if (!userId.value) return;

  try {
    const [categories, gastos] = await Promise.all([
      getCategories(userId.value),
      getGastosPorUsuario(userId.value)
    ]);

    // Procesar gastos por categoría
    const categoryMap: Record<string, number> = {};
    categories.forEach(cat => categoryMap[cat.nombre] = 0);

    gastos.forEach(gasto => {
      const categoria = categories.find(c => c.id === gasto.categoriaId);
      if (categoria) {
        categoryMap[categoria.nombre] += gasto.monto;
      }
    });

    expensesByCategory.value = {
      labels: Object.keys(categoryMap),
      datasets: [{
        ...expensesByCategory.value.datasets[0],
        data: Object.values(categoryMap)
      }]
    };
    categoriesLoaded.value = true;

    // Procesar gastos por mes
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Creamos un array para los últimos 6 meses incluyendo año
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentYear, currentMonth - i, 1);
      return {
        month: date.getMonth(),
        year: date.getFullYear(),
        name: `${monthNames[date.getMonth()]} ${date.getFullYear().toString().slice(2)}`,
        total: 0
      };
    }).reverse();

    // Procesamos cada gasto
    gastos.forEach(gasto => {
      const fechaGasto = new Date(gasto.fecha);
      const monthGasto = fechaGasto.getMonth();
      const yearGasto = fechaGasto.getFullYear();

      // Buscamos si el gasto pertenece a alguno de los últimos 6 meses
      const monthData = last6Months.find(m =>
        m.month === monthGasto && m.year === yearGasto
      );

      if (monthData) {
        monthData.total += gasto.monto;
      }
    });

    expensesOverTime.value = {
      labels: last6Months.map(m => m.name),
      datasets: [{
        ...expensesOverTime.value.datasets[0],
        data: last6Months.map(m => m.total)
      }]
    };
    monthsLoaded.value = true;

  } catch (error) {
    console.error('Error cargando datos financieros:', error);
  }
};

onMounted(() => {
  loadFinancialData();
});
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

.h-80 {
  height: 20rem;
}
</style>
