<template>
  <div class="container">
    <div class="video-wrapper">
      <video src="@/assets/ji.mp4" autoplay loop muted></video>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="type" class="label">Type:</label>
          <select id="type" name="type" v-model="type" required class="select">
            <option value="title" >Title</option>
            <option value="text" selected>Text</option>
            <option value="image">Image</option>
            <option value="file">File</option>
            <option value="video">Video</option>
            <option value="question">Question</option>
            
            
          </select>
          <button type="button" @click="addField" class="add-field-btn">Add Field</button>
        </div>
        <div v-for="(field, index) in fields" :key="index" class="new-field">
          <label :for="field.id" class="label">{{ field.label }}:</label>
          <template v-if="field.type === 'image'">
            <input type="file" :id="field.id" :name="field.id" @change="onFileSelected($event, index)" class="file-input">
          </template>
          <template v-else-if="field.type === 'file'">
            <input type="file" :id="field.id" :name="field.id" @change="onFileSelected($event, index)" class="file-input">
          </template>
          <template v-else-if="field.type === 'video'">
            <input type="file" :id="field.id" :name="field.id" @change="onFileSelected($event, index)" class="file-input">
          </template>
          <template v-else-if="field.type === 'title'">
            <input type="text" :id="field.id" :name="field.id" v-model="field.value" class="input">
          </template>
          <template v-else-if="field.type === 'text'">
            <textarea :id="field.id" :name="field.id" v-model="field.value" class="input" style="height: 150px"></textarea>
          </template>
          <template v-else-if="field.type === 'question'">
            <input type="text" :id="'question-' + field.id" :name="'question-' + field.id" v-model="field.question" class="input" placeholder="Question">
            <input type="text" :id="'hint-' + field.id" :name="'hint-' + field.id" v-model="field.hint" class="input" placeholder="Hint">
            <input type="text" :id="'solution-' + field.id" :name="'solution-' + field.id" v-model="field.solution" class="input" placeholder="Solution">
            <input type="number" :id="'note-' + field.id" :name="'note-' + field.id" v-model="field.note" class="input" placeholder="Note">
          
          </template>

          
        <button type="button" class="remove-field" @click="removeField(index)">Remove Field</button>
      </div>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      taskId: "",
      type: '',
      fieldId: 0,
      index: 0,
      
      fields: [],
      question: [],
    }
  },
  mounted() {
    this.taskId = this.$route.params.taskId;
  },
  methods: {
  
    addField() {
      this.fieldId++;
      this.index++;
      
      if (this.type=='question'){
        const newField = { id: this.fieldId, index: this.index, type: 'question', label: 'Question', question: '', hint: '', solution: '',note: 0 };
        this.fields.push(newField);
      }else{
        const newField = { id: this.fieldId,index: this.index, type: this.type, label: this.type.charAt(0).toUpperCase() + this.type.slice(1), value: '' };
        this.fields.push(newField);
      }
      
      
    },
    removeField(n) {
      for (let i=n; i<this.fields.length; i++){
        this.fields[i].index--
      }
      this.fields.splice(n, 1);
      
      this.index--
    },
    onFileSelected(event, index) {
      this.fields[index].value = event.target.files[0];
    },
    submitForm() {
      console.log(this.fields)
      
      for (let i=0;i<this.fields.length;i++){
        if (this.fields[i].type=='image'){
          const formData = new FormData();
          formData.append('image', this.fields[i].value);
          formData.append('imagenumber', this.fields[i].index);
          formData.append('task', this.taskId);
          axios.post('http://127.0.0.1:8000/creatTaskImages/', formData)
        }else if(this.fields[i].type=='title'){
          const titleData = {
            titel: this.fields[i].value,
            titelnumber: this.fields[i].index,
            task: this.taskId
          };
          axios.post('http://127.0.0.1:8000/creatTaskTitels/', titleData);
        }else if(this.fields[i].type=='text'){
          const textData = {
            paragraph: this.fields[i].value,
            paragraphnumber: this.fields[i].index,
            task: this.taskId
          };
          axios.post('http://127.0.0.1:8000/creatTaskParagrahe/', textData);
        }else if (this.fields[i].type === 'question') {
          const questionData = {
            question: this.fields[i].question,
            question_number: this.fields[i].index,
            question_point: this.fields[i].note, // Add the appropriate value for question_point
            question_solution: this.fields[i].solution,
            question_hint: this.fields[i].hint,
            task: this.taskId
          };
          console.log()
          axios.post('http://127.0.0.1:8000/createquestion/', questionData);
        }
        
        /*else if (this.fields[i].type == 'file') {
          const file = this.fields[i].value; // Assuming `value` contains the file object
          const fileData = new FormData();
          fileData.append('task_file', file, file.name);
          fileData.append('filenumber', this.fields[i].index);
          fileData.append('task', this.taskId);

          axios.post('http://127.0.0.1:8000/createfile/', fileData);
        } */

        this.$router.push('/instructor/courstasks/'+this.$route.params.coursId);
      }
      /*
      // Create an array to store all the API requests
       const requests = [];

      // Create the task image requests
      for (let i = 0; i < this.imageFiles.length; i++) {
        const imageFile = this.imageFiles[i];
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('imagenumber', i + 1);
        formData.append('task', this.taskId);

        // Send the image request
        const imageRequest = axios.post('http://127.0.0.1:8000/creatTaskImages/', formData);
        requests.push(imageRequest);
      }

      // Create the task title request
      const titleData = {
        titel: this.title,
        titelnumber: this.fields.length + 1,
        task: this.taskId
      };

      // Send the title request
      const titleRequest = axios.post('http://127.0.0.1:8000/creatTaskTitels/', titleData);
      requests.push(titleRequest);

      // Send all the requests concurrently
      axios.all(requests)
        .then(axios.spread((...responses) => {
          // Handle the response for each request if needed
          console.log(responses);
          this.$router.push('/home');
        }))
        .catch(error => {
          // Handle errors if any request fails
          console.log(error);
          // Show an error message or perform error handling
        }); */
    }
  }
};
</script>

<style>
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
