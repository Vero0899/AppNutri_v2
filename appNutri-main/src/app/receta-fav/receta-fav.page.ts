import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../servicios/receta.service'; 
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-receta-fav',
  templateUrl: './receta-fav.page.html',
  styleUrls: ['./receta-fav.page.scss'],
})
export class RecetaFavPage implements OnInit {
  meal: any; // Variable para almacenar la receta

  constructor(private recetaService: RecetaService, private navController: NavController) {} // Inyecta NavController

  ngOnInit() {
    this.getRandomMeal(); // Obtiene una receta aleatoria al iniciar
  }

  getRandomMeal() {
    this.recetaService.getRandomMeal().subscribe(
      (response: { meals: any[] }) => {
        this.meal = response.meals[0]; // Almacena la primera (y única) receta
        console.log(this.meal); // Muestra la receta en la consola para depuración
      },
      (error: any) => {
        console.error('Error al obtener la receta:', error);
      }
    );
  }

  navigateToHome() {
    this.navController.navigateBack('/home'); // Cambia '/home' a la ruta de tu módulo home
  }

  saveRecipe() {
    if (this.meal) {
      const recipe = {
        name: this.meal.strMeal,
        image: this.meal.strMealThumb,
        instructions: this.meal.strInstructions,
      };
  
      // Crear contenido HTML para el archivo
      const fileContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${recipe.name}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            text-align: center; /* Centra el texto */
          }
          h1 { 
            color: #4b2a00; 
          }
          img { 
            max-width: 100%; 
            height: auto; 
            border-radius: 10px; 
            display: block; /* Asegura que la imagen se comporte como un bloque */
            margin: 0 auto; /* Centra la imagen */
          }
          h2 { 
            margin-top: 20px; 
          }
        </style>
      </head>
      <body>
        <h1>${recipe.name}</h1>
        <img src="${recipe.image}" alt="${recipe.name}">
        <h2>Instrucciones</h2>
        <p>${recipe.instructions}</p>
      </body>
      </html>`;
  
      const blob = new Blob([fileContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
  
      // Crear un enlace para descargar el archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = `${recipe.name}.html`; // Nombre del archivo a descargar
      document.body.appendChild(a);
      a.click(); // Simula el clic en el enlace
      document.body.removeChild(a); // Remueve el enlace del DOM
      window.URL.revokeObjectURL(url); // Libera el objeto URL
  
      console.log('Receta guardada como archivo HTML:', recipe);
    } else {
      console.error('No hay receta para guardar.');
    }
  }
  
}
