<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask">
                                <div class="form-group">
                                    <input type="text" v-model="task.title"
                                    placeholder="Insertar una Tarea"
                                    class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea cols="30" rows="10" class="form-control" 
                                    placeholder="Insertar una descripción" v-model="task.description"></textarea>
                                </div>
                                <button class="btn btn-primary btn-block">{{textEnviar}}</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Tarea</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" :key="task.title">
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">
                                        Borrar
                                    </button>
                                    <button @click="editTask(task._id)" class="btn btn-outline-secondary">
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>  
    </div>
</template>


<script>

    class Task{
        constructor(title, description){
            this.title = title
            this.description = description           
        }
    }

    export default {
        data() {
            return{
                task: new Task(),
                tasks: [],
                edit: false,
                textEnviar : 'Enviar',
                idTaskEliminar: ''
            }
        },
        created(){
            this.getTask()
        },
        methods:{
            getTask() {
                fetch('/api/tasks')
                .then(res => res.json())
                .then(data => {
                    this.tasks = data;
                })
            },
            sendTask() {
                if(!this.edit){ //crear
                    fetch('/api/tasks', {
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept' : 'application/json',
                            'Content-type' : 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTask()
                    })
                    this.task = new Task()
                } else{ //editar
                    fetch('/api/tasks/'+ this.idTaskEliminar, {
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept' : 'application/json',
                            'Content-type' : 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.idTaskEliminar = ''
                        this.edit = false
                        this.getTask()
                    })
                    this.task = new Task()
                }
                
            },
            deleteTask(id) {
                fetch('/api/tasks/'+ id, {
                    method: 'DELETE',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-type' : 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTask()
                })
            },
            editTask(id) {
                this.edit = true
                this.textEnviar = 'Editar'
                fetch('/api/tasks/'+id)
                .then(res => res.json())
                .then(data => {
                    this.idTaskEliminar = data._id
                    this.edit = true
                    this.task = new Task(data.title, data.description)
                })
            }
        }
    }
</script>
