import {inject, Injectable} from '@angular/core';
import {StorageService} from "../../storage/storage.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = false;
  private _storageService = inject(StorageService);

  constructor() {
    this.getCurrentUser().then((user) => {
      this.isLogged = !!user;
    });
  }


  async createUser(user: any): Promise<boolean> {
    const users = (await this._storageService.get('users')) || [];
    const userExists = users.some((u: any) => u.email === user.email || u.username === user.username);

    if (userExists) {
      return false;
    }
    users.push(user);
    this._storageService.set('users', users);
    return true;
  }

  async login(username: string, password: string): Promise<boolean> {
    const users = (await this._storageService.get('users')) || [];
    const user = users.find((u: any) => u.nombreUsuario === username && u.password === password);
    if (user) {
      this.setCurrentUser(user);
      this.isLogged = true;
      return true
    }
    return false;
  }

  async resetPassword(username: string, password: string): Promise<boolean> {
    const users = (await this._storageService.get('users')) || [];
    const user = users.find((u: any) => u.nombreUsuario === username);

    if (user) {
      user.password = password
      this._storageService.set('users', users);
      return true;
    }
    return false;
  }

  async logout(): Promise<void> {
    this._storageService.remove('currentUser');
    this.isLogged = false;
  }


  setCurrentUser(user: any) {
    this._storageService.set('currentUser', user);
  }

  async getCurrentUser(): Promise<any> {
    const user = (await this._storageService.get('currentUser')) || {};
    console.log(user, 'user');
    return user;
  }


  private _generateTempPassword(): string {
    return Math.random().toString(36).slice(-8); // Ejemplo simple
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this.isLogged) {
      return of(true);
    }
    return of(false);
  }


}
