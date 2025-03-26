<template>
  <section class="py-15 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-[#342E2E] mb-10">
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import ChartComponent from './ChartComponent.vue';
import LineChart from './LineChart.vue';
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
