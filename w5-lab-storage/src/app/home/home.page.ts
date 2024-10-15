import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  key: string = '';
  value: string = '';
  output: string = '';

  constructor(private storageService: StorageService) {}

  async setItem() {
    try {
      await this.storageService.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      this.output = `Error setting item: ${error}`;
    }
  }

  async getItem() {
    try {
      const value = await this.storageService.get(this.key);
      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      this.output = `Error getting item: ${error}`;
    }
  }

  async removeItem() {
    try {
      await this.storageService.remove(this.key);
      this.output = `Removed item with key: ${this.key}`;
    } catch (error) {
      this.output = `Error removing item: ${error}`;
    }
  }

  async clearStorage() {
    try {
      await this.storageService.clear();
      this.output = 'Storage cleared';
    } catch (error) {
      this.output = `Error clearing storage: ${error}`;
    }
  }

  async getAllKeys() {
    try {
      const keys = await this.storageService.keys();
      this.output = `Keys: ${keys.join(', ')}`;
    } catch (error) {
      this.output = `Error getting keys: ${error}`;
    }
  }

  async getStorageLength() {
    try {
      const length = await this.storageService.length();
      this.output = `Storage length: ${length}`;
    } catch (error) {
      this.output = `Error getting storage length: ${error}`;
    }
  }

  async iterateStorage() {
    try {
      let result: string = '';
      await this.storageService.forEach((value, key, index) => {
        result += `Key: ${key}, Value: ${value}, Index: ${index}\n`;
      });
      this.output = `Storage items:\n${result}`;
    } catch (error) {
      this.output = `Error iterating storage: ${error}`;
    }
  }
}
