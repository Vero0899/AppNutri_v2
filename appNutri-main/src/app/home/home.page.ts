import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { NavController, AlertController } from '@ionic/angular'; // Asegúrate de importar estos módulos

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isModalOpen = false;
  modalTitle = '';
  modalContent = '';
  modalImage = '';
  nombreUsuario: string = '';

  // Opciones para el carrusel de imágenes
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 10,
    slidesPerView: 1,
  };

  constructor(
    private authService: AuthService, 
    private navCtrl: NavController, 
    private alertController: AlertController
  ) {
    this.nombreUsuario = this.authService.getUserName();
  }

  openModal(image: string, title: string, content: string) { // Agregado el parámetro content
    this.modalImage = image;
    this.modalTitle = title;
    this.modalContent = content; // Asigna el contenido recibido
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.authService.cerrarSesion(); // Llama al método de cerrar sesión
            this.navCtrl.navigateRoot('/ingreso'); // Navega a la página de ingreso
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para navegar al módulo recetaFav
  navigateToRecetaFav() {
    this.navCtrl.navigateForward('/receta-fav');
  }
}
