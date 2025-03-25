import { jsPDF } from 'jspdf';

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    label?: string;
  }[];
}

export const generateFinancialPDF = (
  categoryData: ChartData,
  timelineData: ChartData,
): void => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();

  const colors = {
    dark: '#342E2E',
    medium: '#817A7A',
    light: '#F3F4F6',
    accent: '#4A6FA5',
    yellow: '#FFD166',
    white: '#FFFFFF'
  };

  const margin = 15;
  let yPosition = margin;

  // Función para agregar espacios
  const addSpace = (height: number) => {
    yPosition += height;
    if(yPosition > 280) {
      doc.addPage();
      yPosition = margin;
    }
  };

  doc.setFillColor(colors.dark);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(colors.white);
  doc.text('Controla tus finanzas', 105, 25, { align: 'center' });

  doc.setFontSize(14);
  doc.text('Reporte financiero completo', 105, 35, { align: 'center' });

  yPosition = 60;

  // Fecha con estilo
  doc.setFontSize(12);
  doc.setTextColor(colors.medium);
  doc.text(`Generado el: ${date}`, margin, yPosition);
  addSpace(5);

  // Sección de categorías
  doc.setFillColor(colors.white);
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(margin, yPosition, 180, 100, 3, 3, 'FD');

  doc.setFontSize(18);
  doc.setTextColor(colors.dark);
  doc.text('Gastos por Categoría', margin + 10, yPosition + 15);

  // Línea divisoria
  doc.setDrawColor(colors.medium);
  doc.line(margin + 10, yPosition + 20, margin + 170, yPosition + 20);

  // Datos de categorías
  doc.setFontSize(12);
  let categoryY = yPosition + 30;

  categoryData.labels.forEach((label, index) => {
    const amount = categoryData.datasets[0].data[index];

    // Barra de progreso visual
    const maxWidth = 100;
    const percentage = (amount / Math.max(...categoryData.datasets[0].data)) * maxWidth;

    doc.setFillColor(colors.accent);
    doc.rect(margin + 20, categoryY - 3, percentage, 4, 'F');

    doc.setTextColor(colors.dark);
    doc.text(`${label}:`, margin + 20, categoryY + 5);
    doc.text(`$${amount.toLocaleString()}`, margin + 160, categoryY + 5, { align: 'right' });

    categoryY += 10;
  });

  addSpace(110);

  // Sección de evolución
  doc.setFillColor(colors.white);
  doc.roundedRect(margin, yPosition, 180, 100, 3, 3, 'FD');

  doc.setFontSize(18);
  doc.setTextColor(colors.dark);
  doc.text('Evolución Mensual', margin + 10, yPosition + 15);

  // Línea divisoria
  doc.line(margin + 10, yPosition + 20, margin + 170, yPosition + 20);

  // Datos mensuales con gráfico de líneas simple
  const timelineY = yPosition + 30;
  const maxData = Math.max(...timelineData.datasets[0].data);

  timelineData.labels.forEach((month, index) => {
    const amount = timelineData.datasets[0].data[index];
    const height = (amount / maxData) * 30;

    // Barras del gráfico
    doc.setFillColor(colors.yellow);
    doc.rect(margin + 20 + (index * 25), timelineY + 20 - height, 15, height, 'F');

    doc.setTextColor(colors.dark);
    doc.text(`${month}`, margin + 20 + (index * 25), timelineY + 35);
    doc.text(`$${amount.toLocaleString()}`, margin + 20 + (index * 25), timelineY + 45, {
      align: 'center',
      maxWidth: 20
    });
  });

  addSpace(120);

  // Pie de página con estilo
  doc.setFillColor(colors.dark);
  doc.rect(0, 280, doc.internal.pageSize.getWidth(), 20, 'F');
  doc.setFontSize(10);
  doc.setTextColor(colors.white);
  doc.text('Reporte generado por SpendWise', 105, 287, { align: 'center' });
  doc.save(`REPORTE-FINANCIERO-${date.replace(/\//g, '-')}.pdf`);
};
