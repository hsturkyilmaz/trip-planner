<template>
  <div class="table">
    <input type="text" v-model="newTask"/>
    <input type="button" @click="addTask" value="Add Task"/>
    <p v-for="(t, index)  in tasks" @click="removeTask(index)" v-bind:key="(t, index)">{{t}}</p>
  </div>
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      tasks: [],
      newTask: ''
    };
  },
  methods: {
    addTask(){
      this.tasks.push(this.newTask);
      this.newTask = "";
    },
    removeTask(index){
      this.tasks.splice(index, 1);
    }
  },
};
</script>

<style scoped>



</style>
