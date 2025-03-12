<template>
  <section
    class="relative bg-[url(https://images.pexels.com/photos/6778581/pexels-photo-6778581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
    ></div>

    <div
      class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 "
    >
      <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
        <h1 class="text-3xl font-extrabold text-white sm:text-4xl">
          Gestiona tus Finanzas con

          <strong class="block font-extrabold text-yellow-400"> SpendWise </strong>
        </h1>

        <p class="mt-4 max-w-lg text-white sm:text-xl/relaxed p-2">
          Lleva el control de tus ingresos y egresos de manera fácil y eficiente.
          Visualiza tus movimientos, genera reportes y mejora tu administración financiera.
        </p>

        <div class="mt-8 flex flex-wrap gap-4 text-center">
          <RouterLink to="/login"
            class="block w-full rounded-sm bg-yellow-400 px-12 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-yellow-500 focus:ring-3 focus:outline-hidden sm:w-auto"
          >
            Iniciar Sesión
          </RouterLink>

          <RouterLink to="/register"
            class="block w-full rounded-sm border bg-white  px-12 py-3 text-sm font-medium text-black shadow-sm hover:text-amber-600 focus:ring-3 focus:outline-hidden sm:w-auto"
          >
            Registrarse
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
