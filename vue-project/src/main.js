import { createApp } from 'vue'

import App from './App.vue'
import FoodItem from './components/FoodItem.vue'
import PersonalProfile from './components/PersonalProfile.vue'
import Guestbook from './components/Guestbook.vue'

const app = createApp(App)
app.component('food-item', FoodItem)
app.component('personal-profile', PersonalProfile)
app.component('guest-book', Guestbook)

app.mount('#app')