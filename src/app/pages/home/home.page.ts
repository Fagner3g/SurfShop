import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public products = new Array<Product>();
  private productsSubscription: Subscription;

  constructor(private productsService: ProductService, private authService: AuthService, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  async deleteProduct(id: string) {
    try {
      this.productsService.deleteProduct(id);
    } catch (error) {
      this.presentToast('Erro ao tentar salvar');
      console.error(error);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 4000 });
    toast.present();
  }
}
