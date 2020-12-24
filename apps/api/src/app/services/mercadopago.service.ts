import { IntegracoesService } from './integracoes.service';

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
(async function configure(){
  let integracoesService = new IntegracoesService();
  let MP_AT = await integracoesService.Ler();
  mercadopago.configure({
    access_token: MP_AT.MP_access_token
  });
})();

export class MercadoPagoService{
  // Agrega credenciales
  makecheckout = (preference) => {
    console.log(preference);
    return mercadopago.preferences.create(preference);
  }
  async checkout(preference) {
    return this.makecheckout(preference).then(response => {
      // Este es el checkout generado o link al que nos vamos a posicionar para pagar
      console.log(response.body);
      let init_point = response.body.init_point
      let id = response.body.id;
      return { result: init_point, id };
    }).catch(error => {
      console.log(error);
      return error
    });
  }
}