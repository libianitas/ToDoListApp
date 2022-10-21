import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';
import { TaskModel } from '../models//task.models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
private url = "/to-do-list";
  constructor(private http: HttpClient) { }

  crearTask(task : TaskModel){
          return this.http.post<number>(`${this.url}/add`, task);
  }
  actualizarTask(task: TaskModel)
  {
     return this.http.put(`${this.url}/update`,task);
  }

  updateState( newStatus : String, task: TaskModel )
  {
     return this.http.put<TaskModel[]>(`${this.url}/updateStatus/${newStatus}`,task);
  }

  getTask(id: string){
    return this.http.get<TaskModel>(`${this.url}/task/${id}`);
  }
  getTaskTitle(title: string){
    return this.http.get<TaskModel[]>(`${this.url}/taskTitle/${title}`);
  }
  borrarTask(id: number )
  {
      return this.http.delete<TaskModel>(`${this.url}/delete/${id}`)
  }
   getTasks(){
     return this.http.get<TaskModel[]>(this.url)
 
   }
}
