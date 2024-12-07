import {Component, OnInit} from '@angular/core';
import {NavController, AlertController} from '@ionic/angular'; // Importa AlertController
import {RegistroPage} from "../registro/registro.page";
import {Router} from "@angular/router";
import {AuthService} from "../core/auth/auth.service"; // Importa el servicio de autenticación

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  registro = RegistroPage; // Cambiado de registro a RegistroPage
  nombreUsuario: string = ''; // Cambiado de email a nombreUsuario
  password: string = ''; // Cambiado de password a contraseña para mantener la coherencia
  showPassword: boolean = false; // Variable para mostrar/ocultar la contraseña
  isLoggedIn: boolean = false; // Variable para saber si el usuario está logueado

  constructor(
    private navCtrl: NavController,
    private authService: AuthService, // Inyecta el servicio de autenticación
    private alertController: AlertController, // Inyecta AlertController para mostrar errores,
    private _router: Router // Inyecta Router para navegar entre páginas
  ) {
  }

  ngOnInit() {
    // Verifica si el usuario ya está logueado al iniciar la página
    this.isLoggedIn = this.authService.isLogged; // Actualiza el estado de isLoggedIn
  }

  login() {
    if (this.nombreUsuario && this.password) {
      this.authService.login(this.nombreUsuario, this.password).then((response) => {
        console.log(response);
        if (response) {
          this.navCtrl.navigateForward('/home');
        } else {
          this.mostrarError('Usuario o contraseña incorrectos');
        }
      });
    }
  }

  // Método para mostrar mensajes de error
  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para navegar a la página de registro
  goToRegistro() {
    this.navCtrl.navigateForward('/registro');
  }

  goToRecuperar(): void {
    this.navCtrl.navigateForward('/recuperar');
    //this._router.navigate(['/recuperar']); // Navega a la página de recuperar contraseña
    //this.navCtrl.navigateForward('/recuperar');
  }

  // Método para cambiar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Cambia el estado de visibilidad
  }

  // Método para regresar a la página inicial
  goToInicio() {
    this._router.navigate(['/home']); // Navega a la página de inicio
    this.navCtrl.navigateBack('/'); // Navega de regreso a la página principal (home o raíz)
  }
}
