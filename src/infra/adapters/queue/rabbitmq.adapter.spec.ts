import { RabbitmqAdapter } from './rabbitmq.adapter'
import amqplib from 'amqplib'

const createChannelMock = jest.fn()
jest.mock('amqplib', () => ({
  connect: jest.fn().mockImplementation(() => ({
    createChannel: createChannelMock
  }))
}))

describe('RabbitmqAdapter', () => {
  let uri: string
  beforeAll(() => {
    uri = 'anyUri'
  })
  test('should call connect and createChannel on instanciation', async () => {
    const sut = new RabbitmqAdapter(uri)
    const spy = jest.spyOn(amqplib, 'connect')

    await sut.start()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(uri)

    expect(createChannelMock).toHaveBeenCalledTimes(1)
  })
})
