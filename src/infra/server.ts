import 'module-alias/register'
import { app } from './app'
import config from './config'
import { ConsumeQueueProcessedPayments } from './queue/consume-queue-payments-processed'

const start = async (): Promise<void> => {
  try {
    const port = config.server.port || 3002
    app.listen(port, () => console.log(`Server running at ${port}`))
    await ConsumeQueueProcessedPayments()
  } catch (error) {
    console.log(error)
  }
}

void start()
