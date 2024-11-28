import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Aquí va la URL de tu backend
  private userNameKey = 'userName'; // Clave para almacenar el nombre de usuario en el almacenamiento local

  constructor() {}

  // Método para registrar un usuario
  async registerUser(userData: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/registro`, userData);
      return response.data; // Devuelve la respuesta del backend (por ejemplo: { success: true, message: 'Registro exitoso' })
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw new Error('No se pudo registrar el usuario.'); // Mejor manejo de error
    }
  }

  // Método para iniciar sesión
  async loginUser(loginData: { nombre_usuario: string; contraseña: string }) {
    try {
      const response = await axios.post(`${this.apiUrl}/ingreso`, loginData);

      // Verifica si la respuesta es exitosa
      if (response.data.success) {
        this.setUserName(loginData.nombre_usuario); // Guarda el nombre de usuario al iniciar sesión
        console.log('Nombre de usuario guardado:', loginData.nombre_usuario); // Depura el nombre de usuario
        return { success: true, message: 'Login exitoso' };
      } else {
        return { success: false, message: 'Credenciales incorrectas' }; // Mensaje de error en caso de fallo en login
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error en la autenticación.'); // Mejor manejo de error
    }
  }

  // Método para obtener el nombre de usuario
  getUserName(): string {
    const userName = localStorage.getItem(this.userNameKey); // Recupera el nombre de usuario del almacenamiento local
    return userName ? userName : ''; // Si no está en localStorage, devuelve una cadena vacía
  }

  // Método para guardar el nombre de usuario en localStorage
  private setUserName(userName: string) {
    localStorage.setItem(this.userNameKey, userName); // Guarda el nombre de usuario en localStorage
  }

  // Método para cerrar sesión
  cerrarSesion() {
    localStorage.removeItem(this.userNameKey); // Elimina el nombre de usuario de localStorage
    console.log('Sesión cerrada.');
    // Aquí puedes agregar cualquier lógica adicional que necesites al cerrar sesión
  }

  // Verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.getUserName() !== ''; // Si el nombre de usuario no es vacío, el usuario está logueado
  }
}
