import {Component, OnInit} from '@angular/core';
import {NavController, AlertController} from '@ionic/angular';
import {Router} from "@angular/router";
import {AuthService} from "../core/auth/auth.service";

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
  nombreUsuario: string = ''; // Acepta null

  // Opciones para el carrusel de imágenes
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 10,
    slidesPerView: 1,
  };

  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private _router: Router
  ) {
  }

  // Este método se ejecuta cada vez que la vista Home está a punto de ser cargada
  async ionViewDidEnter() {
    const currentUser = await this.authService.getCurrentUser(); // Obtiene el usuario actual
    console.log('Usuario actual:', currentUser); // Depura el usuario actual
    this.nombreUsuario = currentUser.nombreUsuario || ''; // Obtiene el nombre de usuario
  }

  // Método para abrir el modal
  openModal(image: string, title: string, content: string) {
    this.modalImage = image;
    this.modalTitle = title;
    this.modalContent = content;
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Confirmación de cierre de sesión
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
            this.authService.logout(); // Llama al método de cerrar sesión
            this.navCtrl.navigateRoot('/ingreso'); // Navega a la página de ingreso
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para navegar al módulo recetaFav
  navigateToRecetaFav() {
    this._router.navigate(['/receta-fav']);
  }

  // Método para navegar a la página de "ingreso" cuando se haga clic en "Iniciar sesión"
  navigateToLogin() {
    this._router.navigate(['/ingreso']);
  }
}
