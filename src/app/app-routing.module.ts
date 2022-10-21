import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './pages/task/task.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
  {path: 'tasks',  component: TasksComponent},
  {path: 'task/:id', component: TaskComponent},
  {path: '**' , pathMatch : 'full', redirectTo : 'tasks' },
  {path: '' , pathMatch : 'full', redirectTo : 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
