import { SendMail } from '@/application/contracts/mail'
import { MailService } from './mailTrap'
import nodemailer from 'nodemailer'
import constants from '@/shared/constants'

const sendMailMock = jest.fn()
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: sendMailMock
  }))
}))

describe('MailService', () => {
  let input: SendMail.Input
  beforeEach(() => {
    jest.clearAllMocks()
  })
  beforeAll(() => {
    input = {
      to: {
        name: 'anyToName',
        address: 'anyToAddress'
      },
      from: {
        name: 'anyFromName',
        address: 'anyFromAddress'
      },
      subject: 'anySubject',
      html: 'anyHtml'
    }
  })
  test('should call nodemailer.createTransport once and with correct values', async () => {
    const sut = new MailService()
    const spy = jest.spyOn(nodemailer, 'createTransport')

    await sut.send(input)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      host: process.env.MAILTRAP_HOST ?? constants.mailConfig.server.host,
      port: +process.env.MAILTRAP_PORT ?? constants.mailConfig.server.port,
      auth: {
        user: process.env.MAILTRAP_USER ?? constants.mailConfig.auth.user,
        pass: process.env.MAILTRAP_PASS ?? constants.mailConfig.auth.pass
      }
    })
  })

  test('should call sendMail once and with correct values', async () => {
    const sut = new MailService()

    await sut.send(input)

    expect(sendMailMock).toHaveBeenCalledTimes(1)
    expect(sendMailMock).toHaveBeenCalledWith(input)
  })

  test('should throw if nodemailer throws', async () => {
    sendMailMock.mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new MailService()

    const promise = sut.send(input)

    await expect(promise).rejects.toThrowError()
  })
})
