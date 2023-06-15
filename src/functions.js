import Swal from "sweetalert2";
import axios from "axios";

export function show_alert(message, logo, focus = '') {
    if (focus !== '') {
        document.getElementById(focus).focus();
    }
    Swal.fire({
        title: message,
        icon: logo,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoomIn ' },
        buttonsStyling: false
    });
}

export function confirmation(id, name) {

    var url = `http://localhost:8000/api/students/${id}/delete`;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' },
        buttonsStyling: false

    });
    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to delete the student ' + name + '?',
        text: 'You will lose the information of student',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class= "fa-solid fa-check"></i> Yes, delete',
        cancelButtonText: '<i class= "fa-solid fa-ban"></i> Cancel',
    }).then((ressult) => {

        if (ressult.isConfirmed) {
            sendRequest('delete', { id: id }, url, 'Student Eliminated')

        } else {
            show_alert('Cancel operation', 'info')
        }
    })
}

export function sendRequest(selectedMethod, parameters, url, message) {
    axios({ method: selectedMethod, url: url, data: parameters }).then(function () {
        show_alert(message, 'success');
        window.setTimeout(function () {
        window.location.href = "/";
        }, 1000);

    }).catch(function (error) {
        show_alert('Request failed', 'error')
    });
}