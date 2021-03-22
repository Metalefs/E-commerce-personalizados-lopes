import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'personalizados-lopes-mercadopago-button',
  templateUrl: './mercadopago-button.component.html',
  styleUrls: ['./mercadopago-button.component.scss']
})
export class MercadopagoButtonComponent implements OnInit {
  @Input() init_point;

  constructor() { }

  ngOnInit(): void {
    if(isPlatformBrowser(PLATFORM_ID))
    this.loadScript();
  }
  loadScript() {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";
    node.type = 'text/javascript';
    node.async = true;
    node.id = "mercadopago-script";
    node.charset = 'utf-8';
    node.setAttribute('data-button-label',"Comprar com MercadoPago");
    node.setAttribute('data-preference-id',this.init_point.id);
    document.getElementById('setup-script-mp').appendChild(node);
  }
}
