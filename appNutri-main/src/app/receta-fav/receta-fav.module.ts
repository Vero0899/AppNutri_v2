import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetaFavPageRoutingModule } from './receta-fav-routing.module';

import { RecetaFavPage } from './receta-fav.page';
import { FooterComponent } from '../footer/footer.component'; 






@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetaFavPageRoutingModule
  ],
  declarations: [RecetaFavPage, FooterComponent]
})
export class RecetaFavPageModule {}
