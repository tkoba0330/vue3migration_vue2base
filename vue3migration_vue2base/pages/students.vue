<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-semibold text-gray-700 mb-6">生徒管理 (Student Management)</h2>

    <!-- Add Button -->
    <div class="mb-4">
      <button @click="openAddModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        新規追加 (Add New Student)
      </button>
    </div>

    <!-- Students Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">生徒ID (ID)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">氏名 (Name)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">学年 (Grade)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">クラス (Class)</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">アクション (Actions)</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-if="students.length === 0">
            <td colspan="5" class="text-center py-4">データがありません (No data available)</td>
          </tr>
          <tr v-for="(student, index) in students" :key="student.id" class="hover:bg-gray-50">
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ student.id }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ student.name }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ student.grade }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ student.className }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">
              <button @click="openEditModal(student)" class="text-indigo-600 hover:text-indigo-900 mr-2">編集 (Edit)</button>
              <button @click="deleteStudent(student, index)" class="text-red-600 hover:text-red-900">削除 (Delete)</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Student Modal -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">{{ isEditMode ? '生徒情報編集 (Edit Student)' : '生徒新規追加 (Add New Student)' }}</h3>
            <form @submit.prevent="saveStudent">
              <div class="mb-4">
                <label for="studentId" class="block text-sm font-medium text-gray-700">生徒ID (Student ID)</label>
                <input type="text" id="studentId" v-model="currentStudent.id" :disabled="isEditMode" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="studentName" class="block text-sm font-medium text-gray-700">氏名 (Name)</label>
                <input type="text" id="studentName" v-model="currentStudent.name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="studentGrade" class="block text-sm font-medium text-gray-700">学年 (Grade)</label>
                <input type="number" id="studentGrade" v-model.number="currentStudent.grade" required min="1" max="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="studentClass" class="block text-sm font-medium text-gray-700">クラス (Class)</label>
                <input type="text" id="studentClass" v-model="currentStudent.className" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </form>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="saveStudent" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
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
      title: '生徒管理 - 校務支援システム (Student Management - School Management System)'
    }
  },
  data() {
    return {
      showModal: false,
      isEditMode: false,
      students: [
        { id: 'S0001', name: '山田 太郎 (Yamada Taro)', grade: 1, className: 'A組' },
        { id: 'S0002', name: '鈴木 花子 (Suzuki Hanako)', grade: 2, className: 'B組' },
        { id: 'S0003', name: '佐藤 一郎 (Sato Ichiro)', grade: 3, className: 'C組' },
      ],
      currentStudent: {
        id: '',
        name: '',
        grade: null,
        className: ''
      },
      editingIndex: -1,
    };
  },
  methods: {
    openAddModal() {
      this.isEditMode = false;
      this.currentStudent = { id: '', name: '', grade: 1, className: '' };
      this.showModal = true;
    },
    openEditModal(student) {
      this.isEditMode = true;
      this.currentStudent = { ...student };
      this.editingIndex = this.students.findIndex(s => s.id === student.id);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentStudent = { id: '', name: '', grade: null, className: '' };
      this.editingIndex = -1;
    },
    saveStudent() {
      if (!this.currentStudent.id || !this.currentStudent.name || !this.currentStudent.grade || !this.currentStudent.className) {
        alert('すべてのフィールドを入力してください (Please fill all fields).');
        return;
      }
      if (this.currentStudent.grade < 1 || this.currentStudent.grade > 3) {
        alert('学年は1から3の間で入力してください (Grade must be between 1 and 3).');
        return;
      }

      if (this.isEditMode) {
        if (this.editingIndex !== -1) {
          this.students.splice(this.editingIndex, 1, { ...this.currentStudent });
        }
      } else {
        if (this.students.some(s => s.id === this.currentStudent.id)) {
          alert('この生徒IDは既に使用されています (This Student ID is already in use).');
          return;
        }
        this.students.push({ ...this.currentStudent });
      }
      this.closeModal();
    },
    deleteStudent(studentToDelete, index) {
      if (confirm(`「${studentToDelete.name}」さんの情報を削除してもよろしいですか？ (Are you sure you want to delete ${studentToDelete.name}?)`)) {
        this.students.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
/* Add any specific scoped styles if needed */
</style>
