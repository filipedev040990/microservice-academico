import { RabbitmqAdapter } from '@/infra/adapters/queue/rabbitmq.adapter'
import config from '@/infra/config'
import { makeEnrollmentUseCaseFactory } from '../factories/enrollent-usecase'
import crypto from 'crypto'
import { EnrollmentUseCase } from '@/application/usecases/enrollment'

export const ConsumeQueueProcessedPayments = async (): Promise<void> => {
  try {
    const queue = new RabbitmqAdapter(config.rabbitmq.uri)
    await queue.start()
    await queue.consume('academic_payments_processed', async (message: any) => {
      const response = JSON.parse(message.content.toString())

      if (response.status === 'confirmed') {
        const enrollmentUsecase = makeEnrollmentUseCaseFactory()
        const payload = makePayload(response)
        await enrollmentUsecase.execute(payload)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const makePayload = (input: any): EnrollmentUseCase.Input => {
  const studentId = crypto.randomUUID()
  const { name, email, document, phone } = input.client
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
      cep: input.client.address.cep,
      street: input.client.address.street,
      number: input.client.address.number,
      complement: input.client.address.complement,
      district: input.client.address.district,
      city: input.client.address.city,
      state: input.client.address.state
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
