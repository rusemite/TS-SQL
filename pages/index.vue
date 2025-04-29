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
          <input class="text-black" name="schedule" type="text" placeholder="Put in any weekday" v-model="postschedule" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="salary">Insert salary</label>
          <input class="text-black" name="salary" type="text" placeholder="Put in the salary" v-model="postsalary" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="profile">Insert profile</label>
          <input class="text-black" name="profile" type="text" placeholder="Put in the profile" v-model="postprofile" />
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
          <input class="text-black" name="schedule" type="text" placeholder="Put in any weekday" v-model="getschedule" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="salary">Filter by salary</label>
          <input class="text-black" name="salary" type="number" placeholder="Put in the salary" v-model="getsalary" />
        </div>
        <div class = "flex flex-col gap-2">
          <label for="profile">Filter by profile</label>
          <input class="text-black" name="profile" type="text" placeholder="Put in the profile" v-model="getprofile" />
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
          <td class= "border border-gray-300 px-4 py-2"><button @click = "deleteData(doctor.doctor_id)"
              class="w-[40px] rounded-full bg-red-800 text-white font-bold">X</button></td>
          <td class= "border border-gray-300 px-4 py-2"><button @click = "updateData(doctor.doctor_id)"
              class="w-[40px] rounded-full bg-green-800 text-white font-bold">U</button></td>
        </tr>
      </tbody>
    </table>

    <div class = "flex fixed inset-0 items-center justify-center bg-black bg-opacity-50 border-2 border-gray-900" v-show="modal">
    <form @submit.prevent = "putData" class = "flex flex-row gap-4 flex-wrap">
      <div class = "flex flex-col gap-2">
        <label for="doctor_id">Update id</label>
        <input class = "border-2[px] border-gray-400 text-center text-black" type = "number" placeholder ="Insert any id" v-model="selectedId" />
      </div>

      <div class = "flex flex-col gap-2">
        <label for="doctor_name">Update name</label>
        <input class = "border-2[px] border-gray-400 text-center text-black" type = "text" placeholder ="Insert any name" v-model="selectedName" />
      </div>

      <div class = "flex flex-col gap-2">
        <label for="schedule">Update schedule</label>
        <input class = "border-2[px] border-gray-400 text-center text-black" type = "text" placeholder ="Insert any weekday" v-model="selectedSchedule" />
      </div>

      <div class = "flex flex-col gap-2">
        <label for="salary">Update salary</label>
        <input class = "border-2[px] border-gray-400 text-center text-black" type = "number" placeholder ="Insert the salary" v-model="selectedSalary" />
      </div>

      <div class = "flex flex-col gap-2">
        <label for="profile">Update profile</label>
        <input class = "border-2[px] border-gray-400 text-center text-black" type = "text" placeholder ="Insert the profile" v-model="selectedProfile" />
      </div>

      <button @click = "modal = false" class = "w-[100px] h- [30px] bg-green-900 hover:bg-red-900 text-white rounded-x1" type ="button">Cancel</button>
      <button @click = "modal = false" class = "w-[100px] h- [30px] bg-green-900 hover:bg-red-900 text-white rounded-x1" type ="submit">PUT</button>

    </form>
    </div>

    </main>
</template>

<script setup lang = 'ts'>
import {ref} from 'vue';
const getname = ref<string>('');
const getid = ref<number>(0);
const getschedule = ref<string>('');
const getsalary = ref<number>(0);
const getprofile = ref<string>('');
const data = ref<any[]>([]);

const postname = ref<string>('');
const postid = ref<number>(0);
const postschedule = ref<string>('');
const postsalary = ref<number>(0);
const postprofile = ref<string>('');

const selectedId = ref<number | null>(null);
const selectedName = ref<string>('');
const selectedSchedule = ref<string>('');
const selectedSalary = ref<number>(0);
const selectedProfile = ref<string>('');

const modal = ref<boolean>(false);

const fetchData = async () => {
  const response = await $fetch('/api/doctors', {
    params: { doctor_name: getname.value,
              doctor_id: getid.value,
              schedule: getschedule.value,
              salary: getsalary.value,
              profile: getprofile.value,
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

const deleteData = async (index: number) => {
  const Delete = await $fetch('/api/doctors/', {
    method: 'DELETE',
    body: {
      doctor_id: index,
    },
  })
}

const updateData = (index: number) => {
  const doctor = data.value.find(doctor => doctor.doctor_id === index);
  if (!doctor) return

  selectedId.value = doctor.doctor_id;
  selectedName.value = doctor.doctor_name;
  selectedSchedule.value = doctor.schedule;
  selectedSalary.value = doctor.salary;
  selectedProfile.value = doctor.profile;

  modal.value = true;
}

const putData = async () => {
  if (selectedId.value === null) return alert("Please select a doctor to update")

  const puts = await $fetch('/api/doctors/', {
    method: 'PUT',
    body: {
      doctor_id: selectedId.value,
      doctor_name: selectedName.value,
      schedule: selectedSchedule.value,
      salary: selectedSalary.value,
      profile: selectedProfile.value,
    },
  })
}

definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/protected',
  },
});
</script>