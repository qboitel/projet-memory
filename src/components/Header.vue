<template>
  <div class="bg-white">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Memory</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">Que souhaitez-vous faire aujourd'hui ?</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <RouterLink
              to="/study"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              Réviser
            </RouterLink>
            <RouterLink
              to="/create"
              class="rounded-md border-indigo-600 border px-3.5 py-2.5 text-sm font-semibold text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              Créer de nouvelles cartes
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
