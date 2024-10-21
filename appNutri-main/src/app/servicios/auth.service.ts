import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Aquí va la URL de tu backend
  private userName: string = ''; // Propiedad para almacenar el nombre de usuario

  constructor() {}

  // Método para registrar un usuario
  async registerUser(userData: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/registro`, userData);
      return response.data;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  // Método para iniciar sesión
  async loginUser(loginData: { nombre_usuario: string; contraseña: string }) {
    try {
      const response = await axios.post(`${this.apiUrl}/ingreso`, loginData);
      
      // Verifica si la respuesta es exitosa y almacena el nombre de usuario
      if (response.data.success) {
        this.userName = loginData.nombre_usuario; // Guarda el nombre de usuario al iniciar sesión
      }

      return response.data; // Devuelve los datos de la respuesta (p. ej., { success: true, message: 'Login exitoso' })
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  // Método para obtener el nombre de usuario
  getUserName() {
    return this.userName;
  }

  // Método para cerrar sesión
  cerrarSesion() {
    this.userName = ''; // Limpia el nombre de usuario
    // Aquí puedes agregar cualquier lógica adicional que necesites al cerrar sesión
  }
}
