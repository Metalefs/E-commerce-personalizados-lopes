import { Injectable } from '@angular/core';
import { CategoriaService, EstampaService } from 'apps/app-web/src/app/data/service';
import { Estampa } from 'libs/data/src/lib/classes';

@Injectable({
  providedIn: 'root'
})
export class EditarEstampaService {

  constructor(private servicoEstampa:EstampaService, private servicoCategoria:CategoriaService) { }

  Ler(){
    return this.servicoEstampa.Ler();
  }

  CarregarCategorias(){
    return this.servicoCategoria.Ler();
  }

  UploadFile(files, Estampa:Estampa, fileNames:string){
    Estampa.Files = files.target.files;
    fileNames = '';

    for(let i =0; i < Estampa.Files.length; i++)
      fileNames+=Estampa.Files[i].name+',';
  }

  async CriarEstampa(estampa:Estampa){
    console.log(estampa);
    let estampaComImagem = await this.servicoEstampa.SalvarImagem(estampa);
    console.log(estampaComImagem);
    return this.servicoEstampa.Incluir(estampaComImagem);
  }

  async EditarEstampa(estampa:Estampa){
    return (await (await this.servicoEstampa.Editar(estampa)));
  }

  async RemoverEstampa(estampa:Estampa){
    return this.servicoEstampa.Remover(estampa._id);
  }
}
