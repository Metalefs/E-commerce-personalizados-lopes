import { CategoriaRouter } from './categoria.controller';
import { InformacoesContatoRouter } from './informacoescontato.controller';
import { OrcamentoRouter } from './orcamento.controller';
import { PedidoRouter } from './pedido.controller';
import { FeedbackRouter } from './feedback.controller';
import { ProdutoRouter } from './produto.controller';
import { ServicoRouter } from './servico.controller';
import { SobreRouter } from './sobre.controller';
import { TemaRouter } from './tema.controller';
import { EmailNotificacaoRouter } from './email-notificacao.controller';
import { ClienteRouter } from './cliente.controller';
import { MensagemRouter } from './mensagem.controller';
import { ImagemRouter } from './imagem.controller';
import { ItemCarouselRouter } from './itemcarousel.controller';
import { CarrouselRouter } from './carousel.controller';
import { MercadoPagoController } from './checkout/mercadopago.controller';
import { IntegracoesRouter } from './integracoes.controller';
import { EstampaRouter } from './estampa.controller';
import { TamanhoProdutoRouter } from './tamanho-produto.controller';
import { CorProdutoRouter } from './cor-produto.controller';
import { FornecedorProdutoRouter } from './fornecedor-produto.controller';

export let Routers = [
  CategoriaRouter,

  InformacoesContatoRouter,

  OrcamentoRouter,

  ProdutoRouter,

  ClienteRouter,

  ServicoRouter,

  SobreRouter,

  TemaRouter,

  EmailNotificacaoRouter,

  MensagemRouter,

  ImagemRouter,

  ItemCarouselRouter,

  EstampaRouter,

  CarrouselRouter,

  MercadoPagoController,

  IntegracoesRouter,

  TamanhoProdutoRouter,

  CorProdutoRouter,

  FornecedorProdutoRouter,

  PedidoRouter,

  FeedbackRouter,
];
