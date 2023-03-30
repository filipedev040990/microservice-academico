import { RabbitmqAdapter } from '@/infra/adapters/queue/rabbitmq.adapter'
import config from '@/infra/config'
import { makeEnrollmentUseCaseFactory } from '../factories/enrollent-usecase'
import crypto from 'crypto'
import { EnrollmentUseCase } from '@/application/usecases/enrollment'

export const ConsumeQueueProcessedPayments = async (): Promise<void> => {
  try {
    const queue = new RabbitmqAdapter(config.rabbitmq.uri)
    await queue.start()
    await queue.consume('financeiro_payments_processed', async (message: any) => {
      const response = JSON.parse(message.content.toString())
      const enrollmentUsecase = makeEnrollmentUseCaseFactory()
      const payload = makePayload(response)
      await enrollmentUsecase.execute(payload)
    })
  } catch (error) {
    console.log(error)
  }
}

const makePayload = (input: any): EnrollmentUseCase.Input => {
  const studentId = crypto.randomUUID()
  const { name, email, document, phone } = input
  const status = 'active'

  return {
    student: {
      id: studentId,
      name,
      email,
      document,
      phone
    },
    address: {
      id: crypto.randomUUID(),
      studentId,
      cep: input.address.cep,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      district: input.address.district,
      city: input.address.city,
      state: input.address.state
    },
    enrollment: {
      id: crypto.randomUUID(),
      studentId,
      status
    },
    accessData: {
      id: crypto.randomUUID(),
      email,
      password: document,
      status
    }
  }
}
