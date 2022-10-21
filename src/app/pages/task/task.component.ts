import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormsModule, Validators } from '@angular/forms';

import { TaskService } from '../../services/tasks.service';
import Swal from "sweetalert2";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/models/task.models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  forma!: FormGroup;
  task = new TaskModel ();
  constructor(private formBuilder : FormBuilder,
              private tasksService : TaskService,
              private route : ActivatedRoute) {
                this.crearFormulario();
            }
  //Creación de formulario reactivo
  crearFormulario (){
      this.forma = this.formBuilder.group({
        id: ['', [Validators.required]],
        title :['', [Validators.required,Validators.minLength(5)]],
        description : ['', [Validators.required, Validators.minLength(5)]],
        status : ['']
        
      });
      this.forma.get('id')?.disable();
      this.forma.get('status')?.setValue('INCOMPLETE');
  }
  ngOnInit(): void {
    
    const id  = this.route.snapshot.paramMap.get('id');
    //Verifica si ID tiene dato para obtener la información completa de la tarea y editarla
    if(id !== 'nuevo')
    {
      if(id == null) {return;}
      this.tasksService.getTask(id).subscribe((resp:TaskModel) =>
        {
         this.task = resp;
         this.task.id = parseInt(id);
         this.taskFormulario();
        });
    }
    
  }
  //Paso los datos de la tarea para visualizarlo en el formulario
  taskFormulario(){
    this.forma.get('id')!.setValue(this.task.id);
    this.forma.get('title')?.setValue(this.task.title);
    this.forma.get('description')?.setValue(this.task.description);
    this.forma.get('status')?.setValue(this.task.status);
   }
   //Paso los datos del formulario a una tarea para poder enviarlos al web services 
  formularioTask(){
   this.task.id= this.forma.get('id')?.getRawValue();
   this.task.title=this.forma.get('title')?.getRawValue();
   this.task.description=this.forma.get('description')?.getRawValue();
   this.task.status=this.forma.get('status')?.getRawValue();
  }
  //Verifico si el texto del titulo es válido
  get titleNoValido(){
    return this.forma.get('title')?.invalid && this.forma.get('title')?.touched;
  }
   //Verifico si el texto de la descrición es válida
  get descriptionNoValido(){
    return this.forma.get('description')?.invalid && this.forma.get('description')?.touched;
  }
 //Guarda una tarea nueva o editada verificando si el ID existió o no 
  guardar (){
   this.formularioTask();
    if (this.forma.invalid)
    {
      console.log("Formulario no válido");
      return;
    }
   Swal.fire({
    title: 'Espere',
    text: 'Guardando información',
    icon: 'info',
    allowOutsideClick: false
  }); 
  Swal.showLoading();

  let peticion: Observable<any>;
  if (this.task.status == '')
  {
    this.task.status = 'INCOMPLETE';
  }
  if (this.task.id)
  {
    peticion = this.tasksService.actualizarTask(this.task)
  }else{
    peticion = this.tasksService.crearTask(this.task)
  }
  peticion.subscribe(rest =>{
    if (!this.task.id)
    { 
      this.forma.get('id')!.setValue(rest);
    }  
    Swal.fire({
      title: this.task.title,
      text: 'Se actualizó correctamente',
      icon: 'success'
    });
  });
 }

}
