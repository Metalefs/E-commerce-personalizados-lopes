import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { Servico } from 'libs/data/src/lib/classes';
import { tap } from 'rxjs/operators';
import { ServicoService } from '../../service';
import { LerServico, EditarServico, RemoverServico } from '../actions/servico.actions'

export class ServicoStateModel{
  Servico: entities.Servico[];
  ServicoLoaded: boolean;
}

@State<ServicoStateModel>({
  name:"Servico",
  defaults:{
    Servico: null,
    ServicoLoaded: false
  }
})
@Injectable()
export class ServicoState {

  constructor(private ServicoService:ServicoService){

  }

  @Selector()
  static ObterServico(state: ServicoStateModel) {
      return state.Servico;
  }

  @Selector()
  static IsServicoLoaded(state: ServicoStateModel) {
      return state.ServicoLoaded;
  }

  @Action(LerServico)
  LerServico({getState, setState}: StateContext<ServicoStateModel>){
      return this.ServicoService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Servico: result as any as Servico[],
            ServicoLoaded: true
          });
        }));
  }


  @Action(RemoverServico)
  async Remover({getState,setState}: StateContext<ServicoStateModel>, {id} : RemoverServico){
    return (await this.ServicoService.Remover(id)).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.Servico.filter(item => item._id !== id);
        setState({
          ...state,
          Servico: filteredArray,
        });
      })
    );
  }

  @Action(EditarServico)
  async Editar({getState,setState}: StateContext<ServicoStateModel>, {payload, id} : EditarServico){
    return (await (await this.ServicoService.EditarServico(payload)).subscribe(result => {
        const state = getState();
        const ListaServicos = [...state.Servico];
        const index = ListaServicos.findIndex(item => item._id === id);
        ListaServicos[index] = result;

        setState({
          ...state,
          Servico: ListaServicos,
        });
      })
    );
  }
}
