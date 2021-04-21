<template>
  <q-layout view="lHh Lpr lFf">
    <header class="header">
      <h1 class="header__title">
        <span class="header__title--regular">Ban</span><span class="header__title--bold">Formato</span>
      </h1>
    </header>
    <div>
      <router-view />
    </div>
  </q-layout>
</template>

<script>
  export default {
    name: 'MainLayout',
  }
</script>

<style lang="scss">
    .header{
      @apply bg-primary-50 h-20 text-4xl text-primary-200 relative;
  
      &__title{
        @apply absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2;
  
        &--regular{
          @apply font-normal;
        }
  
        &--bold{
          @apply font-bold;
        }
      }
    }
  </style>