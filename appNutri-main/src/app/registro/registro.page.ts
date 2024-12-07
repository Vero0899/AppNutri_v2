import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, AlertController} from '@ionic/angular';
import {rutValidator} from '../validaciones/rut-validador';
import {AuthService} from "../core/auth/auth.service"; // Importar Axios

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController,
  ) {
    this.registroForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      rut: ['', [Validators.required, rutValidator()]],
      email: ['', [Validators.required, Validators.email]],
      nombreUsuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], // Validación de longitud
    });
  }

  register(): void {
    this.authService.createUser(this.registroForm.value).then((response) => {
      if (response) {
        this.navCtrl.navigateForward('/home');
      } else {
        this.mostrarError('El usuario o email ya existe');
      }
    });
  }

  // Método para mostrar mensajes de error en un popup
  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }



  // Método para redirigir al ingreso
  goToHome() {
    this.navCtrl.navigateBack('/ingreso'); // Ajusta la ruta según sea necesario
  }
}
