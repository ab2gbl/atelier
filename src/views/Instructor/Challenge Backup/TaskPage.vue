<template>
  <div class="container">
    <div class="video-wrapper">
      <video src="@/assets/ji.mp4" autoplay loop muted></video>
    </div>
    <h1 class="title">Task {{ index + 1 }}</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="type" class="label">Type:</label>
        <select id="type" name="type" v-model="type" required class="select">
          <option value="">-- Select Type --</option>
          <option value="title">Title</option>
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="file">File</option>
          <option value="question">Question</option>
        </select>
        <button type="button" @click="addField" class="add-field-btn">Add Field</button>
      </div>
      <div v-for="(field, index) in fields" :key="index" class="new-field">
        <label :for="field.id" class="label">{{ field.label }}:</label>
        <template v-if="field.type === 'title'">
          <input type="text" :id="field.id" :name="field.id" v-model="field.value" class="input">
        </template>
        <template v-else-if="field.type === 'text'">
          <input type="text" :id="field.id" :name="field.id" v-model="field.value" class="input">
        </template>
        <template v-else-if="field.type === 'image'">
          <input type="file" :id="field.id" :name="field.id" @change="onFileSelected($event, index)" class="file-input">
          <img v-if="field.type === 'image' && `field.value!=''`" :src="field. value"/>
        
       
        </template>
        <template v-else-if="field.type === 'video'">
          <input type="file" :id="field.id" :name="field.id" @change="onFileSelected($event, index)" class="file-input">
        </template>
        <template v-else-if="field.type === 'file'">
          <input type="file" :id="field.id" :name="field.id" @change="onFileSelected($event, index)" class="file-input">
        </template>
        <button type="button" class="remove-field" @click="removeField(index)">Remove Field</button>
      </div>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  beforeMount() {
    console.log(this.$store.state.CreateC)
    this.images = this.$store.state.CreateC.images.filter(image => image.taskId == this.taskId);
    const lastImage = this.$store.state.CreateC.images[this.$store.state.CreateC.images.length - 1];
    if (lastImage) {
      this.in = lastImage.id;
      this.number=lastImage.num
    }
    
    for (let k=0;k<this.images.length;k++){
      //console.log(this.$store.state.CreateC.images[k].num)
      this.fields[this.images[k].num-1]=this.images[k]
    }
    console.log(this.fields)
  },
  
  data() {
    return {
      type: '',
      titles: [],
      texts: [],
      images: [],
      videos: [],
      files: [],
      //questios: [],
      number: 1,
      in: 0,

      fields: [],
      fieldId: 0,
      taskId: "",
      index: "",
      jcp: []
    }
  },
  created() {
    this.taskId = this.$route.params.taskId;
  },
  methods: {
  
    addField() {
  const newField = {
    id: this.fieldId,
    num: this.number,
    type: this.type,
    label: this.type.charAt(0).toUpperCase() + this.type.slice(1),
    taskId: this.taskId,
    value: '' // Initialize value to an empty string
  };

  this.fields.push(newField);

  if (this.type === 'image') {
    this.images.push({ value: '' }); // Initialize the image field value
  }

  this.number++;
  this.fieldId++;

  console.log(this.fields);
},

    removeField(index) {

      console.log(this.fields[index].num,'index',index)
      this.fields.splice(index, 1);
      for(let i = index; i < this.fields.length; i++){
        
        this.fields[i].num--
      } 
      this.number--
    },
    onFileSelected(event, index) {
      this.fields[index].value = event.target.files[0];
    },
    submitForm() {
      
      this.$store.state.CreateC.images = this.$store.state.CreateC.images.filter(image => image.taskId !== this.taskId);



      for (let i = 0; i < this.fields.length; i++) {
        const type = this.fields[i].type;
        if (type === 'image') {
          this.images.push(this.fields[i]);
          this.$store.state.CreateC.images.push(this.fields[i]);
        } /* else if (type === 'video') {
          this.videos.push(this.fields[i]);
        } else if (type === 'file') {
          this.files.push(this.fields[i]);
        } else if (type === 'title') {
          this.titles.push(this.fields[i]);
        } else if (type === 'text') {
          this.texts.push(this.fields[i]);
        } */
      }
      //const taskToUpdatetas = this.$store.state.tasks.find(task => task.taskId === this.taskId);


      
      console.log('this.images', this.$store.state.CreateC.images);
      
      
      this.$router.push({ name: 'tasks', params: { challengeId: this.challengeId } })
      /* this.$store.state.CreateC.tasks[taskToUpdatetas].titles= this.titles
      console.log('this.titles', this.$store.state.CreateC.tasks[taskToUpdatetas].titles);
      this.$store.state.CreateC.tasks[taskToUpdatetas].texts= this.texts
      console.log('this.texts', this.$store.state.CreateC.tasks[taskToUpdatetas].texts);
      this.$store.state.CreateC.tasks[taskToUpdatetas].videos= this.videos
      console.log('this.videos', this.$store.state.CreateC.tasks[taskToUpdatetas].videos);
      this.$store.state.CreateC.tasks[taskToUpdatetas].files= this.files
      console.log('this.files', this.$store.state.CreateC.tasks[taskToUpdatetas].files);
      */ 
    }

  }
};
</script>

<style scoped>
 .container {
    max-width: 600px;
    margin-top: 50px;
    margin-left: 450px;
    padding: 50px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Style for form title */
  .title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  .video-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  
  .video-wrapper video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Style for form fields */
  .form-group {
    margin-bottom: 20px;
  }

  /* Style for form labels */
  .label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
    color: #333;
  }

  /* Style for form input fields */
  .input,
  .textarea,
  .select,
  .file-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  .select option {
    font-size: 16px;
    color: #333;
  }

  /* Style for add field button */
  .add-field-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
  }

  /* Style for remove field button */
  .remove-field {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #dc3545;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
  }

  /* Style for submit button */
  .submit-btn {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
  }
</style>
