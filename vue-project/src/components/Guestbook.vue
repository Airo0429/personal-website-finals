<template>
  <div class="guestbook">
    <h2>Leave a Comment</h2>
    <form @submit.prevent="submitComment">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required class="form-control" />
      </div>
      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea id="comment" v-model="comment" required class="form-control"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <div v-if="submissionStatus" class="mt-2">
        {{ submissionStatus }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient'; // Adjust the path if necessary

const name = ref('');
const comment = ref('');
const submissionStatus = ref(null);

async function submitComment() {
  try {
    const { error } = await supabase.from('comments').insert([{ name: name.value, message: comment.value }]);
    if (error) {
      submissionStatus.value = `Error: ${error.message}`;
    } else {
      submissionStatus.value = 'Comment submitted successfully!';
      name.value = ''; // Clear the form
      comment.value = ''; // Clear the form
      // Optionally, fetch comments again to update the list
    }
  } catch (err) {
    submissionStatus.value = `An unexpected error occurred: ${err.message}`;
  }
}
</script>

<style scoped>
.guestbook {
  width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.mt-2 {
  margin-top: 10px;
}
</style>