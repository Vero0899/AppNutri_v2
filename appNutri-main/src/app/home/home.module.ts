import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Asegúrate de que IonicModule esté aquí
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Este es el módulo que permite trabajar con los componentes de Ionic, incluidos los modales.
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Si lo necesitas, pero no es obligatorio
})
export class HomePageModule {}
