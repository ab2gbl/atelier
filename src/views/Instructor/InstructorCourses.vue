<template>
    <div>
        <GamifiedCourses />
        <div class="hero">
            <button href="Form" @click="CreateCourse" class="btn">
            <span>Add</span>
            </button>
        </div>
        
    </div>
</template>
<script>
import GamifiedCourses from '../GamifiedCourses.vue';
export default {
    components:{
        GamifiedCourses
    }, 
    methods:{
        CreateCourse(){
           // this.$router.push({name: })
        }
    }
}
</script>