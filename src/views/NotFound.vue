<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <h1 class="text-9xl font-extrabold text-indigo-600">404</h1>
      <h2 class="mt-4 text-3xl font-extrabold text-gray-900">Page not found</h2>
      <p class="mt-2 text-sm text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div class="mt-6">
        <router-link
          to="/"
          class="text-base font-medium text-indigo-600 hover:text-indigo-500"
        >
          Go back home<span aria-hidden="true"> &rarr;</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
