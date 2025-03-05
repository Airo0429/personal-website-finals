<template>
  <h1>Rhime Airo O. Ravinera Finals</h1>
  <personal-profile /> <br>
  <food-item />
  <food-item />
  <food-item />

  <h1>Countries I've Visited</h1>

  <h2>Add a you've visited recently</h2>
  <form @submit.prevent="addCountry">
    <label for="countryName">Country Name:</label>
    <input type="text" id="countryName" v-model="newCountryName" required />
    <button type="submit">Add Country</button>
    <div v-if="addStatus" class="mt-2">
      {{ addStatus }}
    </div>
  </form>

  <ul>
    <li v-for="country in countries" :key="country.id">
      {{ country.name }}
    </li>
  </ul>

  <guest-book />
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from './lib/supabaseClient'
  

  const countries = ref();
  const newCountryName = ref('');
  const addStatus = ref(null);

  async function getCountries() {
    const { data } = await supabase.from('countries').select()
    countries.value = data
  }
  async function addCountry() {
    try {
      const { error } = await supabase.from('countries').insert([{ name: newCountryName.value }]);
      if (error) {
        addStatus.value = `Error adding country: ${error.message}`;
      } else {
        addStatus.value = 'Country added successfully!';
        newCountryName.value = '';
        await getCountries();
      }
    } catch (error) {
      addStatus.value = `An unexpected error occurred: ${error}`;
    }
  }

  onMounted(() => {
    getCountries()
  })

  const comments = ref([]);
const newComment = ref({ name: '', message: '' });

onMounted(async () => {
  await fetchComments();
});

async function fetchComments() {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    return;
  }
  comments.value = data;
}

async function addComment() {
  const { error } = await supabase.from('comments').insert([newComment.value]);

  if (error) {
    console.error('Error adding comment:', error);
    return;
  }

  await fetchComments();
  newComment.value = { name: '', message: '' };
}
</script>

<style>
  #app > div {
    border: dashed black 1px;
    display: inline-block;
    margin: 10px;
    padding: 10px;
    background-color: lightgreen;
  }
</style>