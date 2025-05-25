<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="px-6 py-4 border-b border-gray-700">
        <h1 class="text-2xl font-semibold">校務支援</h1>
        <span class="text-sm text-gray-400">Nuxt v2 Demo</span>
      </div>
      <nav class="flex-1 px-4 py-4 space-y-2">
        <nuxt-link
          to="/"
          exact
          class="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          active-class="bg-blue-600 text-white"
        >
          <svg class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"> <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /> </svg>
          ホーム (Home)
        </nuxt-link>
        <nuxt-link
          to="/curriculum"
          class="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          active-class="bg-blue-600 text-white"
        >
          <svg class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" /> </svg>
          カリキュラム管理
        </nuxt-link>
        <nuxt-link
          to="/students"
          class="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          active-class="bg-blue-600 text-white"
        >
          <svg class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"> <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /> </svg>
          生徒管理
        </nuxt-link>
        <nuxt-link
          to="/teachers"
          class="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          active-class="bg-blue-600 text-white"
        >
          <svg class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"> <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015.537-4.873 1.5 1.5 0 00-3.074 0A5.002 5.002 0 011 16v1h6.07A6.97 6.97 0 007 16a6.97 6.97 0 00-.07-1H6z" /> </svg>
          教師管理
        </nuxt-link>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm p-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-700"><!-- Page specific title could go here --></h2>
          <div class="text-sm text-gray-500">
            <!-- User info or other header items -->
            ログインユーザー: デモ太郎
          </div>
        </div>
      </header>
      <!-- Content area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  // You can add data or methods here if needed for the layout
}
</script>

<style scoped>
/* Scoped styles for the layout if needed */
.nuxt-link-exact-active { /* Default active class if not using active-class prop */
  /* Custom styles for exact active link if not overridden by active-class */
}
</style>
