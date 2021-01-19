import { Component, OnInit } from '@angular/core';
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

  constructor(private productsService: ProductService, private authService: AuthService) {}

  ngOnInit() {
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: string) {}

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
