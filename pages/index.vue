<template>
    <h1>This is main page</h1>
    <main class = "h-screen flex items-center justify-center">
    <table class = "border-collapse border border-gray-300">
      <thead>
        <tr>
          <td class="border border-gray-300 px-4 py-2">Id</td>
          <td class="border border-gray-300 px-4 py-2">Name</td>
          <td class = "border border-gray-300 px-4 py-2">Schedule</td>
          <td class="border border-gray-300 px-4 py-2">Salary</td>
          <td class = "border border-gray-300 px-4 py-2">Profile</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for = "doctor in data.getus" :key = "doctor.doctor_id">
          <td class = "border border-gray-300 px-4 py-2">{{doctor.doctor_id}}</td>
          <td class="border border-gray-300 px-4 py-2">{{doctor.doctor_name}}</td>
          <td class= "border border-gray-300 px-4 py-2">{{doctor.schedule}}</td>
          <td class="border border-gray-300 px-4 py-2">{{doctor.salary}}</td>
          <td class= "border border-gray-300 px-4 py-2">{{doctor.profile}}</td>
        </tr>
      </tbody>
    </table>
    </main>
</template>

<script setup lang = 'ts'>
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/protected',
  },
});
const data = await $fetch('/api/doctors');
</script>