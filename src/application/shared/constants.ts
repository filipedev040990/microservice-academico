export default {
  mailConfig: {
    from: {
      name: 'Sistema de Matrículas',
      address: 'sistema@mail.com'
    },
    enrollment: {
      subject: 'Acesso liberado.',
      html: 'Seu pagamento foi confirmado e o acesso ao nosso liberado. Para acessar, acesse este <a href= "localhost:8080/acesso">link</a>. Seus login e senha são seu CPF'
    },
    auth: {
      user: '7618da334575c0',
      pass: '53e14bb87f9207'
    },
    server: {
      host: 'smtp.mailtrap.io',
      port: 2525
    }
  }
}
