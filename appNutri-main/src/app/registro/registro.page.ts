import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { rutValidator } from '../validaciones/rut-validador';
import { AuthService } from '../servicios/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import axios, { AxiosError } from 'axios'; // Importar Axios

interface ErrorResponse {
  msg: string; // Asume que 'msg' es el campo que contiene el mensaje de error
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.registroForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      rut: ['', [Validators.required, rutValidator()]],
      email: ['', [Validators.required, Validators.email]],
      nombreUsuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], // Validación de longitud
    });
  }

  ngOnInit() {}

  // Método para registrar el usuario
  async registrar() {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;

      try {
        await this.authService.registerUser({
          nombre_completo: formData.nombreCompleto,
          nombre_usuario: formData.nombreUsuario,
          rut_completo: formData.rut,
          correo: formData.email,
          contraseña: formData.password,
        });

        console.log('Usuario registrado exitosamente');
        this.goToHome();
      } catch (error: unknown) {
        console.error('Error en el registro:', error); // Log del error para ver detalles en la consola
        
        // Manejo de errores
        let errorMessage = 'Error desconocido';

        if (axios.isAxiosError(error)) { // Verificamos si el error es de Axios
          if (error.response) {
            // Si el servidor respondió con un error
            if (error.response.status === 409) {
              errorMessage = 'El RUT ingresado ya está registrado. Por favor, ingrese un RUT diferente.';
            } else if (error.response.data?.message) {
              errorMessage = error.response.data.message; // Mensaje del backend
            } else if (error.response.data?.errors) {
              // Concatenar todos los mensajes de error si existen
              errorMessage = error.response.data.errors
                .map((err: ErrorResponse) => err.msg) // Especifica el tipo de err
                .join('<br/>'); // Asegúrate de que 'msg' es el campo correcto del mensaje
            }
          } else {
            errorMessage = error.message; // Error relacionado con la solicitud
          }
        }

        this.mostrarError(errorMessage); // Llamamos al método para mostrar la alerta
      }
    } else {
      this.mostrarError('Por favor, complete todos los campos correctamente.'); // Mensaje de validación local
    }
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
