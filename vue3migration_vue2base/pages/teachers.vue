<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-semibold text-gray-700 mb-6">教師管理 (Teacher Management)</h2>

    <!-- Add Button -->
    <div class="mb-4">
      <button @click="openAddModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        新規追加 (Add New Teacher)
      </button>
    </div>

    <!-- Teachers Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">教師ID (ID)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">氏名 (Name)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">担当教科 (Subject)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">アクション (Actions)</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-if="teachers.length === 0">
            <td colspan="4" class="text-center py-4">データがありません (No data available)</td>
          </tr>
          <tr v-for="(teacher, index) in teachers" :key="teacher.id" class="hover:bg-gray-50">
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ teacher.id }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ teacher.name }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ teacher.subject }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">
              <button @click="openEditModal(teacher)" class="text-indigo-600 hover:text-indigo-900 mr-2">編集 (Edit)</button>
              <button @click="deleteTeacher(teacher, index)" class="text-red-600 hover:text-red-900">削除 (Delete)</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Teacher Modal -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">{{ isEditMode ? '教師情報編集 (Edit Teacher)' : '教師新規追加 (Add New Teacher)' }}</h3>
            <form @submit.prevent="saveTeacher">
              <div class="mb-4">
                <label for="teacherId" class="block text-sm font-medium text-gray-700">教師ID (Teacher ID)</label>
                <input type="text" id="teacherId" v-model="currentTeacher.id" :disabled="isEditMode" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="teacherName" class="block text-sm font-medium text-gray-700">氏名 (Name)</label>
                <input type="text" id="teacherName" v-model="currentTeacher.name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="teacherSubject" class="block text-sm font-medium text-gray-700">担当教科 (Subject)</label>
                <input type="text" id="teacherSubject" v-model="currentTeacher.subject" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </form>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="saveTeacher" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
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
      title: '教師管理 - 校務支援システム (Teacher Management - School Management System)'
    }
  },
  data() {
    return {
      showModal: false,
      isEditMode: false,
      teachers: [
        { id: 'T001', name: '田中 守 (Tanaka Mamoru)', subject: '数学 (Mathematics)' },
        { id: 'T002', name: '高橋 陽子 (Takahashi Yoko)', subject: '国語 (Japanese)' },
        { id: 'T003', name: '渡辺 明 (Watanabe Akira)', subject: '物理 (Physics)' },
      ],
      currentTeacher: {
        id: '',
        name: '',
        subject: '',
      },
      editingIndex: -1,
    };
  },
  methods: {
    openAddModal() {
      this.isEditMode = false;
      this.currentTeacher = { id: '', name: '', subject: '' };
      this.showModal = true;
    },
    openEditModal(teacher) {
      this.isEditMode = true;
      this.currentTeacher = { ...teacher };
      this.editingIndex = this.teachers.findIndex(t => t.id === teacher.id);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentTeacher = { id: '', name: '', subject: '' };
      this.editingIndex = -1;
    },
    saveTeacher() {
      if (!this.currentTeacher.id || !this.currentTeacher.name || !this.currentTeacher.subject) {
        alert('すべてのフィールドを入力してください (Please fill all fields).');
        return;
      }

      if (this.isEditMode) {
        if (this.editingIndex !== -1) {
          this.teachers.splice(this.editingIndex, 1, { ...this.currentTeacher });
        }
      } else {
        if (this.teachers.some(t => t.id === this.currentTeacher.id)) {
          alert('この教師IDは既に使用されています (This Teacher ID is already in use).');
          return;
        }
        this.teachers.push({ ...this.currentTeacher });
      }
      this.closeModal();
    },
    deleteTeacher(teacherToDelete, index) {
      if (confirm(`「${teacherToDelete.name}」先生の情報を削除してもよろしいですか？ (Are you sure you want to delete ${teacherToDelete.name}?)`)) {
        this.teachers.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
/* Add any specific scoped styles if needed */
</style>
