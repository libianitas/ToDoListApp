//Modelo de una tarea
export class TaskModel{
    id: number =0;
    title: string = '';
    description: string = '';
    status : string = 'INCOMPLETE';
    constructor (){
        this.status = 'INCOMPLETE';
    }

}