export interface SendMail {
  send (input: SendMail.Input): Promise<void>
}

export namespace SendMail {
  export type Input = {
    to: {
      name: string
      address: string
    }
    from: {
      name: string
      address: string
    }
    subject: string
    html: string
  }
}
