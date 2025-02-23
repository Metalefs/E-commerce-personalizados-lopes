import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';

import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { QuestionBase, DynFormQuestions } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';

import { entities } from '@personalizados-lopes/data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicoState } from 'apps/app-web/src/app/data/store/state';
import { Select, Store } from '@ngxs/store';
import { Servico } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { EditarServico, RemoverServico } from 'apps/app-web/src/app/data/store/actions/servico.actions';
import { EmailMessageQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-email-message';
import { FileQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-file';

@Component({
  selector: 'personalizados-lopes-editar-servico',
  templateUrl: './editar-servico.component.html',
  styleUrls: ['./editar-servico.component.scss']
})
export class EditarServicoComponent implements OnInit {
  @Select(ServicoState.ObterServico) Servico$: Observable<Servico[]>;
  ServicoTable:MaterialTable;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) {

  }
  AtualizarTabela(){
    this.Servico$.subscribe(x=>{
      this.ServicoTable.dataSource = x;
    })
  }

  Editar(Servico:entities.Servico){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "Serviço";
    let id = Servico._id;
    if(!Servico.FileList)
    Object.assign(Servico, {FileList: null});
    Object.entries(Servico).forEach(([key, value]) => {
      if(key != "_id" && key !="FileList" && key != "Imagem")
      questions.push(
        new EmailMessageQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"textarea",
          order: 1
        })
      )
      else if(key === "Imagem")
      questions.push(
        new TextboxQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"textarea",
          order: 1
        })
      )
      else if(key === ("FileList" as string))
      questions.push(
        new FileQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"textarea",
          order: 1
        })
      )
    })

    let Data = new DynFormQuestions(questions,method,name);
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '90%',
      data: Data
    });

    dialogRef.afterClosed().subscribe((result :TextboxQuestion[]) => {
      if(result == undefined)
      return;
      let Servico = new entities.Servico(
        result[0].value,
        result[1].value,
        new entities.Categoria(result[2].value,result[2].value),
        result[3].value,
        result[4].value as any as FileList,
      )
      Servico._id = id;
      this.store.dispatch(new EditarServico(Servico, Servico._id)).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Serviço alterado com sucesso", "Fechar", {

        });
      });
    });
  }

  Remover(Servico:entities.Servico){
    let confirmation = confirm("Deletar?");
    if(confirmation){
      this.store.dispatch(new RemoverServico(Servico._id)).subscribe(x=>{
        this.AtualizarTabela();
        this._snackBar.open("Serviço " +Servico.Nome+ " removido com sucesso", "Fechar", {

        });
      });
    }
  }

  ngOnInit(): void {
    this.ServicoTable = new MaterialTable();
    this.AtualizarTabela();

    this.ServicoTable.displayedColumns = [
        "Nome",
        "Descricao",
        // "Categoria",
        "Imagem",
        "Acoes",
    ];
  }

}
