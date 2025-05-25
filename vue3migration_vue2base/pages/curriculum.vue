<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-semibold text-gray-700 mb-6">カリキュラム管理</h2>

    <!-- Add Button -->
    <div class="mb-4">
      <button @click="openAddModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        新規追加 (Add New)
      </button>
    </div>

    <!-- Curriculum Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">コースID (ID)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">コース名 (Name)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">単位数 (Credits)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">アクション (Actions)</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-if="curriculums.length === 0">
            <td colspan="4" class="text-center py-4">データがありません (No data available)</td>
          </tr>
          <tr v-for="(item, index) in curriculums" :key="item.id" class="hover:bg-gray-50">
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ item.id }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ item.name }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ item.credits }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">
              <button @click="openEditModal(item)" class="text-indigo-600 hover:text-indigo-900 mr-2">編集 (Edit)</button>
              <button @click="deleteItem(item, index)" class="text-red-600 hover:text-red-900">削除 (Delete)</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">{{ isEditMode ? 'カリキュラム編集 (Edit Curriculum)' : 'カリキュラム新規追加 (Add New Curriculum)' }}</h3>
            <form @submit.prevent="saveItem">
              <div class="mb-4">
                <label for="courseId" class="block text-sm font-medium text-gray-700">コースID (Course ID)</label>
                <input type="text" id="courseId" v-model="currentItem.id" :disabled="isEditMode" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="courseName" class="block text-sm font-medium text-gray-700">コース名 (Course Name)</label>
                <input type="text" id="courseName" v-model="currentItem.name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="credits" class="block text-sm font-medium text-gray-700">単位数 (Credits)</label>
                <input type="number" id="credits" v-model.number="currentItem.credits" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </form>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="saveItem" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              保存 (Save)
            </button>
            <button @click="closeModal" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              キャンセル (Cancel)
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'カリキュラム管理 - 校務支援システム (Curriculum Management - School Management System)'
    }
  },
  data() {
    return {
      showModal: false,
      isEditMode: false,
      curriculums: [
        { id: 'C001', name: '国語総合 (Japanese General)', credits: 4 },
        { id: 'C002', name: '数学I (Mathematics I)', credits: 3 },
        { id: 'C003', name: '物理基礎 (Basic Physics)', credits: 2 },
      ],
      currentItem: {
        id: '',
        name: '',
        credits: null,
      },
      editingIndex: -1, // To keep track of item being edited
    };
  },
  methods: {
    openAddModal() {
      this.isEditMode = false;
      this.currentItem = { id: '', name: '', credits: null };
      this.showModal = true;
    },
    openEditModal(item) {
      this.isEditMode = true;
      // Create a copy to avoid mutating the original item directly in the list
      this.currentItem = { ...item }; 
      this.editingIndex = this.curriculums.findIndex(c => c.id === item.id);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentItem = { id: '', name: '', credits: null };
      this.editingIndex = -1;
    },
    saveItem() {
      if (!this.currentItem.id || !this.currentItem.name || this.currentItem.credits === null) {
        alert('すべてのフィールドを入力してください (Please fill all fields).');
        return;
      }
      if (this.isEditMode) {
        if (this.editingIndex !== -1) {
          this.curriculums.splice(this.editingIndex, 1, { ...this.currentItem });
        }
      } else {
        // Check for duplicate ID on add
        if (this.curriculums.some(c => c.id === this.currentItem.id)) {
          alert('このコースIDは既に使用されています (This Course ID is already in use).');
          return;
        }
        this.curriculums.push({ ...this.currentItem });
      }
      this.closeModal();
    },
    deleteItem(itemToDelete, index) {
      if (confirm(`「${itemToDelete.name}」を削除してもよろしいですか？ (Are you sure you want to delete "${itemToDelete.name}"?)`)) {
        // In a real app, you'd use the item's unique ID. Here, index is fine for mock.
        this.curriculums.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
/* Add any specific scoped styles if needed */
</style>
