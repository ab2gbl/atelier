<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
      <DeveloperNavbar />
    <div class="leaderboard">
        <div class="video-wrapper">
      <video src="@/assets/hi2.mp4" autoplay loop muted></video>
    </div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
            <th>Time</th>
            <th v-if="this.$store.state.account.role=='company'" >interview</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(participant, index) in participants" :key="participant.id">
            <td>
              <span :class="getRankClass(index)">
                {{ index + 1 }}
                <i v-if="index < 3" class="trophy-icon fas fa-trophy"></i>
              
              </span>
            </td>
            <td>
              <div class="avatar">
                <img src="@/assets/avatar.png" alt="Avatar" />
                <span>{{ participant.user_detail.username }}</span>
              </div>
            </td>
            <td>{{ participant.participate_result }}</td>
            <td>{{ timeof(participant.finaldate_participate) }}</td>
            <td v-if="this.$store.state.account.role=='company'">
              <button  @click="openPopup(participant)">More Information</button>
            </td>
          </tr>
        </tbody>
        
      </table>

      <div v-if="isPopupOpen" class="popup-overlay">
  <div class="popup-content">
    <h2>User Information</h2>
    <div class="form-group">
      <label for="username">Username:&nbsp; </label>
      <span id="username">{{ selectedUser.user_detail.username }}</span>
      <br>
      <label for="email">Email:&nbsp; </label>
      <span id="email">{{ selectedUser.user_detail.email }}</span>
      <br>
      <label for="point">Point:&nbsp; </label>
      <span id="point">{{ selectedUser.user_detail.point }}</span>
    </div>
    <div class="form-group">
      <button @click="openInterviewPopup">Send Interview</button>
      <button @click="closePopup">Cancel</button>
    </div>
  </div>
</div>

      <div v-if="isInterviewPopupOpen" class="popup-overlay">
        <div class="popup-content">
          <h2>Interview Details</h2>
          <div class="form-group">
            <label for="interviewDate">Interview Date:</label>
            <input v-model="interviewDate" type="text" id="interviewDate">
          </div>
          <div class="form-group">
            <label for="interviewLink">Interview Link:</label>
            <input v-model="interviewLink" type="text" id="interviewLink">
          </div>
          <div class="form-group">
            <label for="interviewNotes">Interview Notes:</label>
            <textarea v-model="interviewNotes" id="interviewNotes" rows="4"></textarea>
          </div>
          <div class="form-group">
            <button @click="sendInterview">Send Interview</button>
            <button @click="closeInterviewPopup">Cancel</button>
          </div>
        </div>
      </div>

    </div>
          <router-link :to="{ path: '/developer/job/'+this.$route.params.challengeId+'/'}">
    <div class="btn">
          <span id="leadetboard">Back</span>
      </div>
          </router-link>
      
    
    </div>
  </template>
  
  
  <script>
import axios from 'axios';
//  import axios from 'axios';
import DeveloperNavbar from '@/components/DeveloperNavbar'
  export default {
    components:{
      DeveloperNavbar
    },
    data() {
      return {
        participants: [],
        isPopupOpen: false,
        selectedUser: null,
        message: '',
        isInterviewPopupOpen: false,
        interviewDate: '',
        interviewLink: '',
        interviewNotes: ''
      };
    },
    beforeCreate(){
      if(!this.$store.state.account.role){
        if(this.$store.state.account.role){
          this.$router.push('/'+this.$store.state.account.role+'/home');}
        else{
          this.$router.push('/login');}
      }
      this.$store.dispatch("GetPlanfiedjobs")
      },
    mounted() {
      this.fetchLeaderboardData();
    },
    computed: {
      Challenge() {
        const challengeId = this.$route.params.challengeId;
        return this.$store.state.Planfiedjobs.find(challenge => challenge.id == challengeId);
      },
    },
    methods: {
      fetchChallengeData() {
        axios
          .get('http://127.0.0.1:8000/getplanifiedJob/')
          .then((response) => {
            const chs=response.data
            const chId = this.$route.params.challengeId;
            this.Challenge =chs.find(challenge => challenge.id == chId);
          }
          )
        
      },
      fetchLeaderboardData() {
        axios
          .get('http://127.0.0.1:8000/getplanifiedJob/')
          .then((response) => {
            const chs=response.data
            const chId = this.$route.params.challengeId;
            this.Challenge =chs.find(challenge => challenge.id == chId);
            
            console.log( this.Challenge, this.$store.state.Planfiedjobs)
            this.participants=this.Challenge.participate
          }
          )
      },
      getRankClass(index) {
        if (index === 0) {
          return 'gold-rank';
        } else if (index === 1) {
          return 'silver-rank';
        } else if (index === 2) {
          return 'bronze-rank';
        } else {
          return '';
        }
      },
      openPopup(user) {
        this.selectedUser = user;
        this.isPopupOpen = true;
      },

      //popup
      closePopup() {
        this.isPopupOpen = false;
        this.selectedUser = null;
        this.message = '';
      },
      // Send the message
      sendMessage() {
        // Perform the logic to send the message to the selected user
        console.log('Sending message:', this.message);
        
        // Clear the popup and selected user
        this.closePopup();
      },
      openInterviewPopup() {
        this.isPopupOpen = false;
        this.isInterviewPopupOpen = true;
      },
      closeInterviewPopup() {
        this.isInterviewPopupOpen = false;
        // Reset interview input fields
        this.interviewDate = '';
        this.interviewLink = '';
        this.interviewNotes = '';
      },
      sendInterview() {
        // Perform logic to send interview details
        console.log('Sending interview details:');
        console.log('Interview Date:', this.interviewDate);
        console.log('Interview Time:', this.interviewLink);
        console.log('Interview Notes:', this.interviewNotes);
        
        const formData={
          "email":this.selectedUser.user_detail.email,
          "interviewlink":this.interviewDate,
          "interviewdate":this.interviewLink,
          "descreption":this.interviewNotes
          }
          console.log(formData)
        
        axios.post("http://127.0.0.1:8000/sendinterview/",formData).then(() => {
          console.log("sended")
        }).catch((error) => {
          console.error(error.response.data.message);
        });
            

        // Close the interview popup and reset input fields
        this.closeInterviewPopup();
      },
      timeof(tme){

        const startDateTime = new Date(this.Challenge.start_date);
        const endDateTime = new Date(tme);

        // Calculate the time difference in milliseconds
        const timeDiffInMs = endDateTime.getTime() - startDateTime.getTime();

        // Convert milliseconds to days, hours, minutes, and seconds
        const seconds = Math.floor(timeDiffInMs / 1000) % 60;
        const minutes = Math.floor(timeDiffInMs / (1000 * 60)) % 60;
        const hours = Math.floor(timeDiffInMs / (1000 * 60 * 60)) % 24;
        const days = Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24));
        return (`${days}d:${hours}h:${minutes}m:${seconds}s`);
        
        
        
      }
    },
    
  };
  </script>
  
  <style scoped>
  #leadetboard{
  color: #fff;
}
.btn {
  margin-top: 5px;
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
  z-index: 5; /* Increase the z-index value */
}

  .leaderboard {
    margin-top: 25px;
    background-color: #f7f7f7b1;
    padding: 20px;
    border-radius: 4px;
  }
  .leaderboard h1 {
    text-align: center;
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
  
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    text-align: left;
    background-color: #212121;
    color: #fff;
    padding: 12px;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  td {
    padding: 12px;
  }
  
  .gold-rank {
    display: flex;
    align-items: center;
    gap: 10px;
    color: gold;
    font-weight: bold;
  }
  
  .silver-rank {
    display: flex;
    align-items: center;
    gap: 10px;
    color: silver;
    font-weight: bold;
  }
  
  .bronze-rank {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #cd7f32;
    font-weight: bold;
  }
  .badge {
    display: inline-block;
    padding: 2px 6px;
    background-color: red; /* Customize the background color of the badge */
    color: white; /* Customize the text color of the badge */
    font-size: 12px; /* Customize the font size of the badge */
    border-radius: 4px; /* Customize the border radius of the badge */
    margin-left: 5px; /* Adjust the spacing between the badge and the trophy icon */
  }
  
  .avatar {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .avatar img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  
  .avatar span {
    font-weight: bold;
  }
  
  .trophy-icon {
    font-size: 20px;
    margin-left: 5px;
  }
 .popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; /* Increase the z-index value */
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  z-index: 11; /* Increase the z-index value */
}








.popup h2 {
  margin-top: 0;
}

.popup textarea {
  width: 100%;
  resize: vertical;
}

.popup button {
  margin-right: 10px;
}

  
  
  </style>
  