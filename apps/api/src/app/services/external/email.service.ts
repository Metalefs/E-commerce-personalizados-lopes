import { email } from '../../../config';
import { entities } from '@personalizados-lopes/data';
import { InformacoesContatoService } from '../domain/informacoescontato.service';
import { MensagemService } from '../domain/mensagem.service';
import { SobreService } from '../domain/sobre.service';
import { InformacoesContato, Produto, Sobre } from 'libs/data/src/lib/classes';

const nodemailer = require("nodemailer");

export class EmailService {

  ServicoInfoContato = new InformacoesContatoService();
  ServicoMensagens = new MensagemService();
  ServicoSobre = new SobreService();

  async SendRegistrationMessage(NovoUsuario: entities.Usuario) {
    const InfoContato = await this.ServicoInfoContato.LerPrimeiro() as InformacoesContato;
    const Sobre = await this.ServicoSobre.LerPrimeiro() as Sobre
    const Mensagens = await this.ServicoMensagens.Ler();
    let mensagem_registro = this.ServicoMensagens.SubstituirChaves(Mensagens[0].EmailCadadastroUsuario, NovoUsuario);
    await this.SendHtmlMessage({
      to: NovoUsuario.Email,
      toName: NovoUsuario.Nome,
      from: InfoContato.Email,
      fromName: Sobre.Nome,
      subject: 'Registro no Personalizados Lopes',
      text: mensagem_registro || '', //DEFAULT : Você se cadastrou no nosso serviço de entrega, acesse ao site para conferir as suas opções.
      html: mensagem_registro,
    });
  }

  async SendUpdatePasswordMessage(NovoUsuario: entities.Usuario, senha: string) {
    const InfoContato = await this.ServicoInfoContato.LerPrimeiro() as InformacoesContato;
    const Sobre = await this.ServicoSobre.LerPrimeiro() as Sobre
    const Mensagens = await this.ServicoMensagens.Ler();

    let mensagem_troca_senha = this.ServicoMensagens.SubstituirChavesTrocaSenha(Mensagens[0].EmailRecuperacaoSenha, NovoUsuario, senha);
    console.log(mensagem_troca_senha);
    await this.SendHtmlMessage({
      to: NovoUsuario.Email,
      toName: NovoUsuario.Nome,
      from: InfoContato.Email,
      fromName: Sobre.Nome,
      subject: 'Recuperação de Senha no Personalizados Lopes',
      text: mensagem_troca_senha || '', //DEFAULT : Recebemos um pedido de troca de senha para este e-mail partindo do site personalizadoslopes.com.br, caso não tenha conhecimento disso, ignore este email. Use a nova senha : {{SENHA}} para logar-se e altere-a em seguida.
      html: mensagem_troca_senha,
    });
  }

  async SendReestockEmail(email: string, produto: Produto, link: string) {
    const InfoContato = await this.ServicoInfoContato.LerPrimeiro() as InformacoesContato;
    const Sobre = await this.ServicoSobre.LerPrimeiro() as Sobre
    const Mensagens = await this.ServicoMensagens.Ler();

    let mensagem_reestoque = this.ServicoMensagens.SubstituirChavesReestoqueProduto(Mensagens[0].EmailProdutoReestocado, produto, link);
    console.log(mensagem_reestoque);
    await this.SendHtmlMessage({
      to: email,
      toName: '',
      from: InfoContato.Email,
      fromName: Sobre.Nome,
      subject: ` ${produto.Nome} disponível no Personalizados Lopes`,
      text: mensagem_reestoque || '', //DEFAULT : O Produto no qual você se interessou voltou ao estoque!           {{PRODUTO}}           Acesse a página do produto para conferir: {{LINKPRODUTO}}
      html: mensagem_reestoque,
    });
  }

  async SendHtmlMessage(EmailInfo: EmailInfo) {
    const InfoContato = await this.ServicoInfoContato.LerPrimeiro() as InformacoesContato;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.umbler.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: InfoContato.Email, // generated ethereal user
        pass: email.secret, // generated ethereal password
      },
      tls: { rejectUnauthorized: false } // true para 465, falso para outras portas
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"${EmailInfo.fromName}" <${EmailInfo.from}>'`, // sender address
      to: `"${EmailInfo.toName}" <${EmailInfo.to}>'`, // list of receivers
      subject: EmailInfo.subject, // Subject line
      text: EmailInfo.text, // plain text body
      html: EmailInfo.html, // html body
      cc: EmailInfo.from
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return info;
  }
}
export interface EmailInfo {
  to: string;
  toName: string;
  from: string;
  fromName: string;
  subject: string;
  text: string;
  html: string;
}

