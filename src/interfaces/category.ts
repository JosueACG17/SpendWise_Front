/**
 * Representa una categoría completa en el sistema
 */
export interface Category {
  id: number;
  nombre: string;
  usuarioId?: number;
}

/**
 * Datos necesarios para crear una nueva categoría
 */
export interface CategoryFormData {
  nombre: string;
  usuarioId?: number;
}

/**
 * Respuesta básica de la API para operaciones CRUD
 */
export interface CategoryResponse {
  message: string;
}

/**
 * Estado de uso de una categoría
 */
export interface CategoryUsageStatus {
  inUse: boolean;
}

/**
 * Opciones para manejo de errores específicos
 */
export interface CategoryErrorHandlers {
  [key: number]: string;
}

/**
 * Parámetros para listar categorías
 */
export interface ListCategoriesParams {
  usuarioId: number;
  page?: number;
  limit?: number;
}
