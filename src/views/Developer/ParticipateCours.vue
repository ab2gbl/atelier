<template>
    <div v-if="challengeLoaded" id="main">
      <DeveloperNavbar />
      <div v-if="Challenge" class="challenge">
        <div class="task" v-for="i in Challenge.task" :key="i.tasknumber">
            <div class="task-head">
                <span class="task-num">Task {{ i. tasknumber}}</span>
                <span class="task-name">{{ i.name }}</span>
                <i class="fas fa-angle-down" @click="toggleTask(i.tasknumber)"></i>
            </div>
            <div class="task-body" v-show="isTaskOpen(i.tasknumber)">
                <div v-for="j in 50" :key="j">
                    <div v-for="k in i.titel" :key="k.titelnumber">
                        <div v-if="k.titelnumber == j" class="title">{{ k.titel }}</div>
                    </div> 
                    <div v-for="k in i.images" :key="k.imagenumber">
                        <div v-if="k.imagenumber == j" class="image">
                        <img :src="k.image_url">
                        </div>
                    </div> 
                    <div v-for="k in i.paragraph" :key="k.paragraphnumber">
                        <div v-if="k.paragraphnumber == j" class="paragraph">{{ k.paragraph }}</div>
                    </div> 
                    <div v-for="k in i.taskfile" :key="k.filenumber">
                        <div v-if="k.filenumber == j" class="file">
                        <a :href="'http://127.0.0.1:8000' + k.task_file" download>download</a>
                        </div>
                    </div> 
                    <div v-for="k in i.video" :key="k.video_number">
                        <div v-if="k.video_number == j" class="video">
                        <video class="video-player" controls>
                            <source :src="'http://127.0.0.1:8000' + k.task_vedio" type="video/mp4">
                        </video>
                        </div>
                    </div> 
                    <div v-for="k in i.question" :key="k.question_number">
                        <div v-if="k.question_number == j && !isAnswered(k.id)" class="question">
                          <form @submit.prevent="submitAnswer(k.id)">
                            {{ k.question }} <br>
                            <input :id="k.id" v-model="answerData[k.id]" type="text">
                            <button type="button" @click="showHint(k.question_hint)">Hint</button>
                            <input type="submit">
                          </form>
                        </div>
                        <div v-else-if="k.question_number == j" class="question-answered">
                          <input type="text" :value="k.question_solution" disabled>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <router-link :to="{ path: '/developer/home/' }">
            <div class="btn">
              <span id="leadetboard">Finish</span>
            </div>
          </router-link>
      </div>
    </div>    
  </template>
  
  <script>
 import router from '@/router';
 import axios from 'axios';
 import DeveloperNavbar from '@/components/DeveloperNavbar'
  export default {
    components:{
      DeveloperNavbar
    },
    data() {
      return {
        challengeLoaded: false,
        openTasks: [],
        participateId: "",
        UserId: this.$store.state.account.id,
        answerData: {},
      };
    },
    computed: {
      Challenge() {
        const challengeId = this.$route.params.challengeId;
        return this.$store.state.GamifiedCourses.find(challenge => challenge.id == challengeId);
      },
      participate(){
        if (this.Challenge)
          return this.Challenge.coursparticipate.find((part) => part.user_detail.id == this.UserId);
        else
          return false
      }
    },
    beforeCreate(){
      
      if(this.$store.state.account.role!='developer'){
        if(this.$store.state.account.role){
          this.$router.push('/'+this.$store.state.account.role+'/home');}
        else{
          this.$router.push('/login');}
      }else{
        this.$store.dispatch("GetGamifiedCourses")
        .then(() => {
          this.challengeLoaded = true;
        })
        .catch((error) => {
          console.error("Failed to fetch GetGamifiedCourses:", error);
        });
        
        
        axios
          .get('http://127.0.0.1:8000/creategamifiedcours/')
          .then((response) => {
            const chs = response.data;
            const chId = this.$route.params.challengeId;
            const ch =chs.find(challenge => challenge.id == chId);
            
            if(ch){
              const UserId = this.$store.state.account.id;
              console.log(ch)
              const isUserPartcipated = ch.coursparticipate.some(
                (participate) => participate.user_detail.id == UserId
              );
              if(!isUserPartcipated){
                console.log("let's create")
                const participateData={
                    "participate_by": UserId,
                    "gamifiedcours": chId
                }
                axios.post("http://127.0.0.1:8000/participateoncours/",participateData).then(()=>{
                  console.log('created')
                }).catch((error) => {
                  console.error( error);
                });
                  
              }
            }else
              router.push({path:'/paths'})
          })
      }
          
    },
    updated() {
      
      
      this.fetchChallengeData();
      this.fetchParticipationData();
      
    },
    methods: {
      fetchChallengeData() {
        this.$store.dispatch("GetGamifiedCourses")
        const challengeId = this.$route.params.challengeId;
        this.Challenge= this.$store.state.GamifiedCourses.find(challenge => challenge.id == challengeId);
      },

      fetchParticipationData() {
        if (this.Challenge)
          this.participate= this.Challenge.coursparticipate.find((part) => part.user_detail.id == this.UserId);
        else
          this.participate= false
      },
      //design
        toggleTask(taskNumber) {
            if (this.isTaskOpen(taskNumber)) {
                this.closeTask(taskNumber);
            } else {
                this.openTask(taskNumber);
            }
        },
        openTask(taskNumber) {  
            if (!this.isTaskOpen(taskNumber)) {
                this.openTasks.push(taskNumber);
            }
        },
        closeTask(taskNumber) {
            this.openTasks = this.openTasks.filter((task) => task !== taskNumber);
        },
        isTaskOpen(taskNumber) {
            return this.openTasks.includes(taskNumber);
        },
        showHint(hint) {
            alert(hint);
        },

        //answer
        submitAnswer(questionId) {
          const answer = this.answerData[questionId];

          // Create the answer object
          const answerObject = {
            answer: answer,
            question: questionId,
            user: this.UserId,
            gamifiedcours: this.$route.params.challengeId,
            coursparticpate: this.participate.id,
          };
          console.log(answerObject)

          // Send the answer to the API using axios
          axios.post("http://127.0.0.1:8000/gamifiedcoursanswer/", answerObject)
            .then(() => {
              // Handle the response if needed
              console.log("correct answer")
              
            })
            .catch((error) => {
              alert(error.response.data.message);
            });

          // Reset the input field value
          this.answerData[questionId] = "";
          this.fetchChallengeData();
          this.fetchParticipationData();
        },
        isAnswered(questionId){
          if (this.participate){
            const isIt = this.participate.answers.some(
                  (answer) => answer.question == questionId
                );
            return isIt
          }else
            return false
          

        }
         
    },
  };
  </script>
  <style scoped>
  @import '@fortawesome/fontawesome-free/css/all.css';
  #main{
    background-color: #043e70;
    min-height: 100vh;
  }
  #leadetboard{
  color: #fff;

}
.btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-left: 50%;
  transform: translate(-50%);
}
.challenge{
  align-content: center;
}
.task {
  border-radius: 5px;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 75%;
  border: #212c42 solid 1px;
}
.task-head{
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  color: white;
  background-color: #212c42;
  padding: 5px;
  position: relative;
  align-items: center;
}
.task-num{
  color: red;
}
.task-name{
  margin-left: 10px;
}
.fas.fa-angle-down {
  cursor: pointer;
  right: 10px;
  position: absolute;
  
}
.task-body{
  padding: 5px 10px ;
}
.title {
  font-size: 18px;
  font-weight: bold;
}

.image img {
  max-height: 50vh;
}

.paragraph {
  margin-top: 10px;
}

.file a {
  display: inline-block;
  padding: 5px 10px;
  background-color: #f1f1f1;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
}

.video-player {
  width: 80%;
  height: auto;
}

.question {
  margin-top: 20px;
}

.question form {
  margin-bottom: 10px;
}

.question input[type="text"] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.question-answered input[type="text"] {
  width: 100%;
  padding: 5px;
  color: green;
  border: 1px solid green;
  border-radius: 4px;
}

.question input[type="submit"] {
  padding: 5px 10px;
  background-color: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


  </style>