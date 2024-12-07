import {Injectable} from '@angular/core';
import axios from 'axios';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userNameKey = 'userName'; // Clave para almacenar el nombre de usuario en el almacenamiento local
  isLogged = false; // Variable para verificar si el usuario está logueado
  private _apiUrl = 'http://localhost:3000'; // Aquí va la URL de tu backend
  constructor() {
  }

  // Método para registrar un usuario
  async registerUser(userData: any) {
    try {
      const response = await axios.post(`${this._apiUrl}/registro`, userData);
      return response.data; // Devuelve la respuesta del backend (por ejemplo: { success: true, message: 'Registro exitoso' })
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw new Error('No se pudo registrar el usuario.'); // Mejor manejo de error
    }
  }

  // Método para iniciar sesión
  async loginUser(loginData: { nombre_usuario: string; contraseña: string }) {
    try {
      console.log(loginData);
      const response = await axios.post(`${this._apiUrl}/ingreso`, loginData);
      console.log('Respuesta del backend:', response.data); // Depura la respuesta del backend
      // Verifica si la respuesta es exitosa (200 ok)
      if (response.status === 200) {
        this.setUserName(loginData.nombre_usuario); // Guarda el nombre de usuario al iniciar sesión
        this.isLogged = true; // Cambia el estado de logueo a verdadero
        console.log('Nombre de usuario guardado:', loginData.nombre_usuario); // Depura el nombre de usuario
        return {status: true, message: 'Login exitoso'};
      } else {
        this.isLogged = false; // Cambia el estado de logueo a falso
        return {status: false, message: 'Credenciales incorrectas'}; // Mensaje de error en caso de fallo en login
      }
    } catch (error) {
      this.isLogged = false;
      throw new Error('Error en la autenticación.'); // Mejor manejo de error
    }
  }

  // Método para obtener el nombre de usuario
  getUserName(): string {
    return localStorage.getItem(this.userNameKey) || '';
  }

  // Método para guardar el nombre de usuario en localStorage
  private setUserName(userName: string) {
    localStorage.setItem(this.userNameKey, userName); // Guarda el nombre de usuario en localStorage
  }

  // Método para cerrar sesión
  cerrarSesion() {
    localStorage.removeItem(this.userNameKey); // Elimina el nombre de usuario de localStorage
    console.log('Sesión cerrada.');
    this.isLogged = false;
  }

  isLoggedIn(): boolean {
    return this.getUserName() !== '';
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this.isLoggedIn()) {
      return of(true);
    }
    return of(false);
  }
}
