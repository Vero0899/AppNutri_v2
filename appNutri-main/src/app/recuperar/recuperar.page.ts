import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, AlertController} from '@ionic/angular';
import {AuthService} from "../core/auth/auth.service";


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  form: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Cambia el estado de visibilidad
  }

  recover(): void {
    this.authService.resetPassword(this.form.value.username, this.form.value.password).then((response) => {
      if (response) {
        this.showMessage({
          header: 'Contraseña Actualizada',
          message: 'Tu contraseña ha sido actualizada con éxito. Por favor, inicia sesión con tu nueva contraseña.'
        })
      } else {
        this.showMessage({
          header: 'Error',
          message: 'No se pudo recuperar la contraseña'
        });
      }
    });
  }

  // Método para mostrar mensajes de error en un popup
  async showMessage(options: { header: string, message: string }) {
    const alert = await this.alertController.create({
      header: options.header,
      message: options.message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToLogin() {
    this.navCtrl.navigateBack('/ingreso'); // Ajusta la ruta según sea necesario
  }
}
