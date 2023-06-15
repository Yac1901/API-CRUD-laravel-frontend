<template>
    <div class="card bg-success text-white w-50 mx-auto mt-5">
        <div class="card-header">
            <h5 class="card-title"><i class="fas fa-user"></i> Update</h5>
        </div>
        <div class="card-body">
            <form v-on:submit="save">
                <div class="mb-3">
                    <label for="name" class="form-label"><i class="fas fa-user"></i>Name</label>
                    <input type="text" v-model="name" class="form-control" id="name" name="name" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label"><i class="fas fa-envelope"></i> E-mail</label>
                    <input type="email" v-model="email" class="form-control" id="email" name="email" required>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label"><i class="fas fa-phone"></i> Phone</label>
                    <input type="tel" v-model="phone" class="form-control" maxlength="10" id="phone" name="phone" required>
                </div>
                <div class="mb-3">
                    <label for="course" class="form-label"><i class="fas fa-comment"></i> Course</label>
                    <input class="form-control" v-model="course" id="message" name="course" rows="3" required>
                </div>
                <button type="submit" class="btn btn-light"><i class="fas fa-paper-plane"></i>Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import { show_alert, sendRequest } from '../functions';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
    data() {
        return {
            id: 0,
            name: '',
            email: '',
            phone: '',
            course: '',
            urlUpdate: '',
            url: 'http://localhost:8000/api/students',

        }
    }, mounted() {
        const route = useRoute();
        this.id = route.params.id;
        this.urlUpdate = this.url + '/edit/' + this.id;
        this.url = this.url + '/' + this.id;
        this.getStudentUpdated();
    },
    methods: {
        getStudentUpdated() {
            axios.get(this.url).then(

                response => (
                    this.name = response.data.student['name'],
                    this.email = response.data.student['email'],
                    this.phone = response.data.student['phone'],
                    this.course = response.data.student['course']
                )
            );
        },
        save() {
            event.preventDefault();
            if (this.name.trim() === '') {
                show_alert('Write the name', 'warning', 'name');
            }
            else if (this.email.trim() === '') {
                show_alert('Write the email', 'warning', 'email');
            } else if (this.phone.trim() === '') {
                show_alert('Write the email', 'warning', 'phone');
            } else if (this.phone.length != 10) {
                show_alert('the number phone must have 10 digits', 'warning', 'phone');
            } else {
                var parameters = { name: this.name.trim(), email: this.email.trim(), phone: this.phone.trim(), course: this.course.trim() }
                sendRequest('PUT', parameters, this.urlUpdate, 'Student Updated');
            }
        }
    }
}
</script>