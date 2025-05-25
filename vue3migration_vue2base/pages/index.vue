<template>
  <div class="container mx-auto p-4">
    <div class="bg-white shadow-md rounded-lg p-8">
      <h2 class="text-3xl font-semibold text-gray-800 mb-4">
        校務支援システムへようこそ (Welcome to the School Affairs Support System)
      </h2>
      <p class="text-gray-600 mb-6">
        左側のナビゲーションメニューから各管理機能を選択してください。
        (Please select a management function from the navigation menu on the left.)
      </p>
      <p class="text-gray-600">
        このシステムは、カリキュラム、生徒、および教師の情報を管理するためのデモンストレーションです。
        (This system is a demonstration for managing curriculum, student, and teacher information.)
      </p>
      <hr class="my-6">
      <div class="text-sm text-gray-500">
        <p>機能一覧 (Feature List):</p>
        <ul class="list-disc list-inside ml-4 mt-2">
          <li>カリキュラム管理 (Curriculum Management)</li>
          <li>生徒管理 (Student Management)</li>
          <li>教師管理 (Teacher Management)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'ホーム - 校務支援システム (Home - School Management System)'
    }
  }
}
</script>

<style scoped>
/* Add any specific scoped styles if needed */
</style>
