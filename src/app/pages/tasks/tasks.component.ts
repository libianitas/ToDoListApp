import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { TaskModel } from '../../models/task.models';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks : TaskModel[]=[];
  cargando = false;
  task2!: TaskModel;
  searchText: string = '';

  constructor( private  tasksService : TaskService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.listarTasks()
  };
//Elimina una tarea por su ID
  borrarTask(task:TaskModel){
    Swal.fire({
      title: "Pregunta",
      text: `Desea eliminar a ${task.title}`,
      icon: 'question',
      showConfirmButton : true,
      showCancelButton : true
    }).then(resp0 =>{
      if(resp0.value)
      {
        this.tasksService.borrarTask(task.id).subscribe(
        rest=>{
          this.cargando = true;
          this.listarTasks();
        }
      );
      }
    }); 
   
   }
//Lista todas las tareas 
   listarTasks(){
    this.searchText = "";
    this.tasksService.getTasks().subscribe((resp: TaskModel[]) =>
      {this.tasks = resp;
        this.cargando = false;}
    )
   }
//Actualiza el estado de una tarea según su ID
   updateStatus(newStatus : String, task : TaskModel, ){
        this.tasksService.updateState(newStatus, task).subscribe((resp: TaskModel[]) =>
        {this.tasks = resp;
          this.cargando = false;
          this.listarTasks();
        }
          
      )
   }
   //Busca el listado de tareas que coincide con el texto de busqueda
   searchTitle(title: string){ 
    if(!title)
    { 
      this.listarTasks();
      return;
    }
       this.tasksService.getTaskTitle(title).subscribe((resp: TaskModel[]) => 
        {
         this.tasks = resp;
        this.cargando = false;
      } )
   }


}
