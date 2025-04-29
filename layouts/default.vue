<template>

    <header class = "flex flex-row items-center justify-between bg-red-600 text-white text-xl">
        <div class = "px-4 py-2">
            <img src = "assets/images/cobra.png" class = "w-16 h-16 bg-transparent">
        </div>
        <nav class = "flex flex-row gap-2 px-2">
            <NuxtLink to = "/" class = "links">Home</NuxtLink>
            <NuxtLink to = "/protected" class = "links">Protected</NuxtLink>
            <NuxtLink to  = "/login" class = "links">LogIn</NuxtLink>
            <div class = "links" @click="signOut()">LogOut</div>
            <img :src = "data?.user?.image" v-show = "log_check" class = "w-14 h-14 border-2 border-black rounded-full">
        </nav>
    </header>

    <main class = "min-h-screen bg-black text-white text-xl flex px-8 py-4">
        <div class = "m-auto">
             <slot />
        </div>
    </main>


</template>

<style scoped>

    .links {
        @apply p-2 rounded-md hover:bg-black hover:text-yellow-300;
    }

</style>

<script setup lang = 'ts'>


const {signOut, status} = useAuth()

const log_check = computed(()=> status.value === 'authenticated')

const { data } = useAuth()



</script>

