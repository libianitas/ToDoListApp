# ToDoListApp
App Frontend ara administrar un listado de tareas 

## App frontend Angular 14
   Bootstrap 5 cargado por link en  el index 
   Dependencias:
   Ejecutar npm install para obtener todas las dependencias 
   En el caso de tener problemas con las dependencias puede hacerlo también:
   Ejecutar npm install sweetalert2 , de ser necesario
   Ejecutar npm install --save @fortawesome/fontawesome-free , 
   Debe digitar en el archivo angular.json el style y el script el siguiente texto:
 
                         "styles": [
                            "src/styles.css",
                            "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
                            "node_modules/animate.css/animate.min.css"
                        ],
                        "scripts": ["node_modules/@fortawesome/fontawesome-free/js/all.min.js"]
   
    Para evitar problemas de cors editar el archivo proxy.conf.json en la línea:
    "target": "http://localhost:8081", digitar el puerto por que esta saliendo el backend
     y en el archivo package.json editar la línea  "start": "ng serve --proxy-config proxy.cong.json",
    para que el backend salga por el mismo puerto del Frontend, esto es solo para desarrollo
   

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
