import { RabbitmqAdapter } from './rabbitmq.adapter'
import amqplib from 'amqplib'

const assertQueueMock = jest.fn()
const assertExchangeMock = jest.fn()
const consumeMock = jest.fn()
const publishMock = jest.fn()
const createChannelMock = jest.fn().mockImplementation(() => ({
  assertQueue: assertQueueMock,
  assertExchange: assertExchangeMock,
  consume: consumeMock,
  publish: publishMock
}))

jest.mock('amqplib', () => ({
  connect: jest.fn().mockImplementation(() => ({
    createChannel: createChannelMock
  }))
}))

describe('RabbitmqAdapter', () => {
  let uri: string
  let sut: RabbitmqAdapter
  beforeAll(() => {
    uri = 'anyUri'
    sut = new RabbitmqAdapter(uri)
  })
  test('should call connect and createChannel on instanciation', async () => {
    const spy = jest.spyOn(amqplib, 'connect')

    await sut.start()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(uri)

    expect(createChannelMock).toHaveBeenCalledTimes(1)
  })

  test('should call assertQueue and consume with correct values', async () => {
    await sut.start()
    await sut.consume('anyQueue', async (message: any) => {})

    expect(assertQueueMock).toHaveBeenCalledTimes(1)
    expect(assertQueueMock).toHaveBeenCalledWith('anyQueue', { durable: true })

    expect(consumeMock).toHaveBeenCalledTimes(1)
    expect(consumeMock).toHaveBeenCalledWith('anyQueue', expect.any(Function))
  })

  test('should call assertExchange and publish with correct values', async () => {
    await sut.start()
    await sut.publish('anyExchange', 'anyRoutingKey', 'anyMessage')

    expect(assertExchangeMock).toHaveBeenCalledTimes(1)
    expect(assertExchangeMock).toHaveBeenCalledWith('anyExchange', 'direct', { durable: true })

    expect(publishMock).toHaveBeenCalledTimes(1)
    expect(publishMock).toHaveBeenCalledWith('anyExchange', 'anyRoutingKey', Buffer.from('anyMessage'))
  })
})
