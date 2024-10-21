import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; // Importa AlertController
import { AuthService } from '../servicios/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  nombreUsuario: string = ''; // Cambiado de email a nombreUsuario
  password: string = ''; // Cambiado de password a contraseña para mantener la coherencia
  showPassword: boolean = false; // Variable para mostrar/ocultar la contraseña

  constructor(
    private navCtrl: NavController,
    private authService: AuthService, // Inyecta el servicio de autenticación
    private alertController: AlertController // Inyecta AlertController para mostrar errores
  ) {}

  ngOnInit() {}

  // Lógica de inicio de sesión
  async login() {
    if (this.nombreUsuario && this.password) {
      try {
        const response = await this.authService.loginUser({
          nombre_usuario: this.nombreUsuario,
          contraseña: this.password
        });

        // Verificar el mensaje de respuesta
        if (response.message === 'Ingreso exitoso') { // Cambia 'Login exitoso' a 'Ingreso exitoso'
          console.log('Login exitoso');
          this.navCtrl.navigateForward('/home'); // Redirige a la página home
        } else {
          this.mostrarError('Usuario o contraseña incorrecta'); // Muestra mensaje genérico
        }
      } catch (error) {
        console.error('Error en el login:', error);
        this.mostrarError('Usuario o contraseña incorrecta'); // Mensaje de error genérico
      }
    } else {
      this.mostrarError('Por favor ingrese su nombre de usuario y contraseña.');
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

  // Método para cambiar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Cambia el estado de visibilidad
  }
}
