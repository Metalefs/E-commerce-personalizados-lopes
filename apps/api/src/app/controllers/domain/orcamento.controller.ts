import * as Services from "../../services";
import * as express from 'express';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../_handlers/error-handler';
import { UsuarioLogado } from '../../_handlers/Authentication';

import BaseController from '../base.controller';
import { ensureIsAdmin } from "../../middleware/ensure-is-admin";

const OrcamentoRouter = express();

const OrcamentoService: Services.OrcamentoService = new Services.OrcamentoService();

export class OrcamentoController extends BaseController {
  constructor(service:Services.OrcamentoService) {
    super(service);
  }
}

const OrcamentoCtrl = new OrcamentoController(OrcamentoService)

OrcamentoRouter.get(RouteDictionary.Orcamento.Padrao,OrcamentoCtrl.Ler)
.get(RouteDictionary.Orcamento.PorUsuario, async (req: any, res) => {
  try {
    const usuario = await UsuarioLogado(req, res);
    const result = await OrcamentoService.FiltrarOrcamentosPorUsuario(usuario);
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Orcamento.Padrao, ensureIsAdmin, OrcamentoCtrl.Editar)
.post(RouteDictionary.Orcamento.Padrao, OrcamentoCtrl.Incluir)
.post(RouteDictionary.Orcamento.PadraoEmail, async (req,res) => {
  OrcamentoService.InserirOrcamentoEmail(req.body.item)
          .then(result => res.send(result))
          .catch(err => ErrorHandler.DefaultException(err, res))
})
.delete(RouteDictionary.Orcamento.Padrao + `:id`, ensureIsAdmin, OrcamentoCtrl.Remover);

export {
  OrcamentoRouter
}
