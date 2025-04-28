<template>
    <h1>This is the main page</h1>
    <main class = "h-screen flex items-center justify-center">

      <form class= "flex flex-row gap-4 flex-wrap" @submit.prevent="postData">
        <div class = "flex flex-col gap-2">
          <label for="doctor_id">Insert ID</label>
          <input class="text-black" name="doctor_id" type="number" placeholder="Put in internal ID" v-model="postid" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="doctor_name">Insert name</label>
          <input class="text-black" name="doctor_name" type="text" placeholder="Put in any name" v-model="postname" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="schedule">Insert schedule</label>
          <input class="text-black" name="schedule" type="text" placeholder="Put in any day of the week" v-model="postschedule" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="salary">Insert salary</label>
          <input class="text-black" name="salary" type="text" placeholder="Put in any day of the week" v-model="postsalary" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="profile">Insert profile</label>
          <input class="text-black" name="profile" type="text" placeholder="Put in any day of the week" v-model="postprofile" />
        </div>
        <button class= "w-[100px] bg-green-900 hover:bg-red-900 text-white rounded-xl" type="submit">POST</button>
      </form>

      <form class= "flex flex-row gap-4 flex-wrap" @submit.prevent="fetchData">
        <div class = "flex flex-col gap-2">
          <label for="doctor_id">Filter by ID</label>
          <input class="text-black" name="doctor_id" type="number" placeholder="Put in internal ID" v-model="getid" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="doctor_name">Filter by name</label>
          <input class="text-black" name="doctor_name" type="text" placeholder="Put in any name" v-model="getname" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="schedule">Filter by schedule</label>
          <input class="text-black" name="schedule" type="text" placeholder="Put in any day of the week" v-model="getschedule" />
        </div>
        <button class= "w-[100px] bg-green-900 hover:bg-red-900 text-white rounded-xl" type="submit">Find</button>
      </form>

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
        <tr v-for = "doctor in data" :key = "doctor.doctor_id">
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
import {ref} from 'vue';
const getname = ref<string>('');
const getid = ref<number>(0);
const getschedule = ref<string>('');
const data = ref<any[]>([]);

const postname = ref<string>('');
const postid = ref<number>(0);
const postschedule = ref<string>('');
const postsalary = ref<number>(0);
const postprofile = ref<string>('');

const fetchData = async () => {
  const response = await $fetch('/api/doctors', {
    params: { doctor_name: getname.value,
              doctor_id: getid.value,
              schedule: getschedule.value,
    },
  });
  data.value = response.getus || response;
};

const postData = async () => {
  if (!postname.value || !postid.value || !postschedule.value || !postsalary.value || !postprofile.value) {
    return alert("Please fill in all fields")
  }

  const posts = await $fetch('/api/doctors', {
    method: 'POST',
    body: {
      doctor_name: postname.value,
      doctor_id: postid.value,
      schedule: postschedule.value,
      salary: postsalary.value,
      profile: postprofile.value,
    },
  });
}

definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/protected',
  },
});
</script>