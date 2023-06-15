<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive"></div>
      <table class="table table-bordered table-hover">
        <thead>
          <th>Name</th>
          <th>Course</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
          <tr v-for="student in students" :key="student.id">
            <input type="hidden" value={{student.id}}>
            <td>{{ student.name }}</td>
            <td>{{ student.course }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phone }}</td>
            <td>
              <router-link :to="{ path: '/edit/' + student.id }" class="btn btn-warning">
                <i class="fa-solid fa-edit"></i>
              </router-link> &nbsp;
              <button class="btn btn-danger" v-on:click="deleted(student.id, student.name)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </thead>
        <tbody class="table-group-divider" id="content">
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { confirmation } from '../functions';
export default {
  data() {

    return { students: null };
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      axios.get('http://localhost:8000/api/students/all')
        .then(
          response => {
            this.students = response.data.students
          }
        ).catch(error => {
          console.log(error);
        });
    },
    deleted(id, name) {
      confirmation(id, name);
    }
  }
}
</script>


