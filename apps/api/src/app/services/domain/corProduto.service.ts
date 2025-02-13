import { entities } from '@personalizados-lopes/data';
import { CorProduto, Produto } from 'libs/data/src/lib/classes';
import { BaseService } from '../baseService';
import { ProdutoService } from './produto.service';

export class CorProdutoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.CorProduto.NomeID);

  }

  async Alterar(Usuario: entities.Usuario, CorProduto: CorProduto) {
    let result = await super.Alterar(Usuario,CorProduto);

    let servicoProduto = new ProdutoService();

    servicoProduto.Filtrar({"Cores._id": CorProduto._id})
    .then((produtos : Array<Produto>)=>{
      produtos.forEach(async(produto)=>{
        let idx = produto.Cores.findIndex(x=>x._id == CorProduto._id);
        produto.Cores[idx] = CorProduto;
        await servicoProduto.Alterar(Usuario,produto)
      })
    })
    return result;
  }
}
