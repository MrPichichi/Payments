# payments
Para ejecutar correctamente CRUD  en este proyecto
se debe:
- Tecnologias utilizadas mongodb, morgan, express, nodejs, angular 
- iniciar el servidor mongo en su ruta \payment\server con el comando "npm run dev" 
- iniciar angular en su ruta \payment\frontend con el comando ng serve

## Como CREAR un payment ##
 1.- ingresar los campos: 
    * Name
    * Last Name
    * Description 
    * Service hour
    * Date
    
1.1.- Poteriormente se debe solicitar el valor de la uf dando click al boton "Uf segun fecha"
   (esperar que los datos se carguen en el formulario)

1.2.- Una vez obtenido el valor de la UF dar click en boton "calcular", esto cargara el 
      resultado al formulario.

1.3.- * En caso de querer reiniciar el formulario, hacer click en el boton clear "X"
      * En caso de querer guardar el payment, hacer click en el boton save con "forma de disquete"
         * Si la cantidad es menor al limite (10), se desplegara un mensaje confirmando la operacion (algunas operaciones usan mas de un servicio a la vez)
         * Si la cantidad supera el limite, se desplegara un aviso para aceptar el reinicio de los payments

## Como ELIMINAR un payment ##
   2.- Dentro del listado desplegado, seleccionar el payment a eliminar haciendo click en el icono "delete"
         * Se desplegara un mensaje confirmando la operacion

## Como EDITAR un payment ##
   3.- Dentro del listado desplegado, seleccionar el payment a modificar haciendo click en el icono "edit"
      * El payment seleccionado se cargara en el fomulario de la pagina
      * Editar campos deseados. Para el correcto ensamblaje del formulario y sus datos, asegurarse de obtener   el valor de UF y  calcular el total antes de guardar los cambios. (no se permite resetear formulario cuando se esta editando)
      * Se desplegara un mensaje confirmando la operacion


   
      

   



   
 

# Tools
- ![Rest Client for VSCODE](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)