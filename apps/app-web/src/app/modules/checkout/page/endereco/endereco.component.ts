import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { cardFlip } from 'apps/app-web/src/app/animations';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { Estado } from 'apps/app-web/src/app/shared/models/interfaces';
import { PageScrollService } from 'apps/app-web/src/app/shared/services/page-scroll.service';
import { EditarOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { CEPService, EstadoService } from '../../../../shared/services';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'personalizados-lopes-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
  animations: [cardFlip]
})
export class EnderecoComponent implements OnInit {

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Orcamento: Orcamento;
  registerForm: FormGroup;
  enderecoForm: FormGroup;

  state = 'flipped';

  Finalizado: boolean = false;
  Loading: boolean = false;

  Pagar: boolean = false;
  ErroCadastro: boolean = false;

  estados: Estado[];
  user: Usuario;
  _init_point: {};

  constructor(
    @Inject(PLATFORM_ID) private platform: object,
    private store: Store,
    private CEPService: CEPService,
    private EstadoService: EstadoService,
    private snack: MatSnackBar,
    public checkoutService: CheckoutService,
    private auth: AuthenticationService,
    private router: Router,
    private scrollService: PageScrollService,
    private fb: FormBuilder, private pageScroll: PageScrollService
  ) {

  }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x => {
      this.Orcamento = x;
      if (this.Orcamento.Status == StatusOrcamento.enviado)
        this.Finalizado = true;
      this.enderecoForm = this.fb.group({
        cep: [this.Orcamento.Usuario.EnderecoEntrega.CEP, [Validators.required]],
        rua: [this.Orcamento.Usuario.EnderecoEntrega.Rua, { disabled: true }, [Validators.required]],
        numero: [this.Orcamento.Usuario.EnderecoEntrega.Numero, [Validators.required]],
        complemento: [this.Orcamento.Usuario.EnderecoEntrega.Complemento, []],
        bairro: [this.Orcamento.Usuario.EnderecoEntrega.Bairro, { disabled: true }, [Validators.required]],
        cidade: [this.Orcamento.Usuario.EnderecoEntrega.Cidade, { disabled: true }, [Validators.required]],
        estado: [this.Orcamento.Usuario.EnderecoEntrega.Estado, { disabled: true }, [Validators.required]],
      })
      this.enderecoForm.valueChanges.subscribe(data => {
        this.BindFormToModel();
      })
    })
    this.EstadoService.Listar().subscribe(estados => {
      this.estados = estados;
    })
    this.pageScroll.scrollTop();
    this.auth.currentUser.subscribe(usr => { this.user = usr });
    CheckoutService.DadosCompleto = true;
    CheckoutService.EnderecoCompleto = true;
    setTimeout(() => {
      this.flip()
    }, 0);
  }

  goCheckout() {
    this.ErroCadastro = true;
    this.BindFormToModel();
    this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento)).subscribe(() => {
      this.CheckoutSeDadosValidos();
    })
  }

  private CheckoutSeDadosValidos() {
    if (this.ValidarDados()) {
      this.ErroCadastro = false;
      this.Orcamento$.subscribe(orcamento => {
        this.Loading = true;
        this.checkoutService.goCheckout(orcamento).then(result => {
          this.cadastroTemporario();
          this._init_point = result;
          this.Loading = false;
          this.Pagar = true;
          if (isPlatformBrowser(this.platform))
            this.scrollService.scrollTop()
          CheckoutService.DadosCompleto = true;
          CheckoutService.EnderecoCompleto = true;
          CheckoutService.PagamentoCompleto = true;
        });
      });
    } else {
      this.ErroCadastro = true;
      if (!this.Orcamento.Usuario.CPF)
        this.router.navigateByUrl('/checkout/dados');
    }
  }

  cadastroTemporario() {
    this.auth.currentUser.subscribe(usr => {
      if (!usr) {
        this.auth.signup(this.Orcamento.Usuario)
          .pipe(first())
          .subscribe(
            data => {
              console.log(data);
            },
            error => {
              this.snack.open('Erro ao cadastrar com senha temporária: ' + error, 'fechar', { duration: 5000 })
            });
      }
    })
  }

  ngOnDestroy() {
    this.flip()
  }

  flip() {
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

  CarregarDetalhesCEP() {
    this.CEPService.ObterDetalhes(this.Orcamento.Usuario.EnderecoEntrega.CEP.replace('-', '')).subscribe(x => {
      this.enderecoForm.get("rua").patchValue(x.logradouro);
      this.enderecoForm.get("bairro").patchValue(x.bairro);
      this.enderecoForm.get("cidade").patchValue(x.localidade);
      this.enderecoForm.get("estado").patchValue(x.uf);

      if (!x.localidade)
        this.enderecoForm.get("cidade").enable()
      if (!x.bairro)
        this.enderecoForm.get("bairro").enable()
      if (!x.uf)
        this.enderecoForm.get("estado").enable()
      if (!x.logradouro)
        this.enderecoForm.get("rua").enable()

      this.enderecoForm.updateValueAndValidity();
      this.BindFormToModel()
    });
  }

  ValidarDados() {
    if (this.enderecoForm.valid &&
      this.Orcamento.Usuario.CPF)
      return true;
    return false;
  }

  BindFormToModel() {
    let form = this.enderecoForm.getRawValue();
    this.Orcamento.Usuario.EnderecoEntrega.CEP = form.cep;
    this.Orcamento.Usuario.EnderecoEntrega.Rua = form.rua;
    this.Orcamento.Usuario.EnderecoEntrega.Numero = form.numero;
    this.Orcamento.Usuario.EnderecoEntrega.Complemento = form.complemento;
    this.Orcamento.Usuario.EnderecoEntrega.Bairro = form.bairro;
    this.Orcamento.Usuario.EnderecoEntrega.Cidade = form.cidade;
    this.Orcamento.Usuario.EnderecoEntrega.Estado = form.estado;
  }

}

