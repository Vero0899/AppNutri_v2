import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';


import {RecuperarPage} from './recuperar.page';
import {RecuperarPageRoutingModule} from "./recuperar-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agregar ReactiveFormsModule aquí
    IonicModule,
    RecuperarPageRoutingModule,
    NgOptimizedImage
  ],
  declarations: [RecuperarPage]
})
export class RecuperarPageModule {
}
