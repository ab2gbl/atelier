<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
      <div class="app">
      <div class="icon">
        <h1 class="text">PREVIOUS CHALLENGES</h1>
        <el-input
          placeholder="Type something"
          prefix-icon="el-icon-search"
          v-model="input2"
        ></el-input>
      </div>
      <div class="hero">
        <button href="Form" @click="log" class="btn">
          <span>Add</span>
        </button>
      </div>
    </div>
    <div class="squares-container">
    <div class="squares" v-for="(form, index) in forms" :key="index">
      <div class="square">
        <div class="square-image">
          <img :src="form.image" alt="Image">
        </div>
        <div class="square-content">
          <h3>{{ form.name }}</h3>
          <p>{{ form.description }}</p>
          <p class="points">.Points: {{ form.points }}</p>
          <p class="max">.Max Team Members: {{ form.max_teamsize }}</p>
          <button class="btn" @click="deleteSquare(index)">Delete</button>
        </div>
      </div>
    </div>
  </div>

</div>

</template>

<script>
export default {
  data() {
    return {
      forms: [],
    };
  },
  mounted() {
    const forms = JSON.parse(localStorage.getItem('forms'));
    if (forms) {
      this.forms = forms;
    }
    console.log(this.$store.state.taskIdGlobal)
  },
  methods: {
    log() {
      this.$router.push({name: 'Form'} );
    },
    deleteSquare(index) {
      this.forms.splice(index, 1);
      localStorage.setItem('forms', JSON.stringify(this.forms));
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  position: relative;
}

.icon {
  position: relative;
  width: 100%;
  height: 300px;
  background-image: linear-gradient(to bottom, #3366ff, #003399),url('@/assets/hi.png');
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon .text {
  color: white;
  font-size: 50px;
  margin-top: 20px;
  text-align: center;
}

.icon .el-input {
  width: 400px;
  margin-top: 20px;
}

.hero {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #0062cc;
}

.squares-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 15px;
  padding: 20px;
}

.square {
  width: 250px;
  height: 335px;
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  cursor: pointer;
}

.square:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}

.square-image {
  height: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.square-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}

.square-content {
  padding: 20px;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h3 {
  margin-top: 0px;
  color: #444;
  font-weight: 700;
  font-size: 24px;
}

p {
  margin-top: 3px;
  margin-bottom: 10px;
  color: #777;
  font-weight: 400;
  font-size: 16px;
}
.points
{
  font-weight: 200;
}

</style>
