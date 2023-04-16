import { SendMail } from '@/application/contracts/mail'
import Mail from 'nodemailer/lib/mailer'
import nodemailer from 'nodemailer'
import constants from '@/shared/constants'

export class MailService implements SendMail {
  private readonly transporter: Mail

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST ?? constants.mailConfig.server.host,
      port: +process.env.MAILTRAP_PORT ?? constants.mailConfig.server.port,
      auth: {
        user: process.env.MAILTRAP_USER ?? constants.mailConfig.auth.user,
        pass: process.env.MAILTRAP_PASS ?? constants.mailConfig.auth.pass
      }
    })
  }

  async send (input: SendMail.Input): Promise<void> {
    try {
      await this.transporter.sendMail({
        to: {
          name: input.to.name,
          address: input.to.address
        },
        from: {
          name: input.from.name,
          address: input.from.address
        },
        subject: input.subject,
        html: input.html
      })
    } catch (error) {
      throw Error(error)
    }
  }
}
