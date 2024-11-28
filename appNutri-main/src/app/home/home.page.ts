import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { NavController, AlertController } from '@ionic/angular';

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
  nombreUsuario: string | null = null; // Acepta null

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
  ) {}

  // Este método se ejecuta cada vez que la vista Home está a punto de ser cargada
  ngOnInit() {
    const storedName = localStorage.getItem('userName');
    console.log('Nombre en localStorage:', storedName); // Verifica si el nombre se recupera correctamente
    this.nombreUsuario = storedName || ''; // Si no se encuentra, asigna una cadena vacía
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
            this.authService.cerrarSesion(); // Llama al método de cerrar sesión
            localStorage.removeItem('userName'); // Elimina el nombre del usuario de localStorage
            this.navCtrl.navigateRoot('/ingreso'); // Navega a la página de ingreso
            this.nombreUsuario = ''; // Limpia el estado del nombre del usuario
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

  // Método para navegar a la página de "ingreso" cuando se haga clic en "Iniciar sesión"
  navigateToLogin() {
    this.navCtrl.navigateRoot('/ingreso');  // Redirige a la página "ingreso"
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Verifica si el usuario está logueado
  }
}
