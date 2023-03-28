export default {
  mailConfig: {
    from: {
      name: 'Sistema de Matrículas',
      address: 'sistema@mail.com'
    },
    enrollment: {
      subject: 'Acesso liberado.',
      html: 'Seu pagamento foi confirmado e o acesso ao nosso liberado. Para acessar, acesse este <a href= "localhost:8080/acesso">link</a>. Seus login e senha são seu CPF'
    }
  }
}
