let rota_user = '/usuario';
let rota_produto = '/produtos';
export let RouteDictionary = {
    Produtos: {
      Produto:rota_produto,
      Filtrar:rota_produto+"/filtrar/",
      Gostar:rota_produto+"/gostar/",
      Rate:rota_produto+"/rate/",
      IncrementarVendas:rota_produto+"/incrementarVenda/",
      IncrementarVisualizacoes:rota_produto+"/incrementarVisualizacoes/",
      EmDestaque: rota_produto+"/destaques/",
      Semelhantes: rota_produto+"/semelhantes/",
    },

    InformacoesContato:"/informacoesContato/",
    Cliente:"/cliente/",
    Sobre:"/sobre/",
    Servico:"/servico/",

    Orcamento: {
      Padrao:"/orcamento/",
      Pedidos:"/pedido/",
    },

    Categoria:"/categoria/",
    Feedback:"/feedback/",
    Tema:"/tema/",

    EmailNotificacao : "/emailNotificacao/",
    Mensagem : "/mensagem/",
    Imagem : "/imagem/",

    Carousel: '/carousel/',
    ItemCarousel: '/itemcarousel/',

    Seed:"/seed/",

    Usuario: {
      Usuario: rota_user,
      DeletarConta: "/deletarConta/",
      AtualizarConta:"/atualizarConta/",
      Login:"/login/",
      Registro:"/registro/",
      RegistroTemporario:"/registroTemporario/",
      RecuperarSenha:"/recuperarSenha/",
      TrocarSenha:"/trocarSenha/",
    },

    Gerenciamento:"/gerenciamento/",
    Integracoes: {
      Raiz: "/integracoes/",
      ChavePublicaMercadoPago: "/mercadoPagoPublicKey/"
    },

    Checkout: '/checkout/',
    Refund: '/refund/',
    ListPayments: '/listPayments/'
};
