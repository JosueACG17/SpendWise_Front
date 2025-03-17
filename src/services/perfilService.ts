export const usePerfilService = () => {
  const crearPerfil = async (perfilData: FormData) => {
    try {
      const response = await fetch('https://localhost:7035/api/Perfil', {
        method: 'POST',
        body: perfilData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar el perfil');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en el servicio:', error);
      throw new Error('Ocurrió un error interno al registrar el usuario.'); // Mensaje genérico para el usuario
    }
  };

  return {
    crearPerfil,
  };
};
