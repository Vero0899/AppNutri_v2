import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init().finally();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this._storage = await this.storage.create();
  }


  set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  get(key: string) {
    return this._storage?.get(key);
  }

  remove(key: string) {
    this._storage?.remove(key);
  }
}
