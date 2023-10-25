import 'dotenv/config'
import fastify, { FastifyInstance } from 'fastify'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import { AppAdapter } from '../app-adapter'
import { createOrderRoute } from '../../../application/input-adapters/routes/order/create-order-route'
import { createItemRoute } from '../../../application/input-adapters/routes/items/create-item-route'
import { getItemRoute } from '../../../application/input-adapters/routes/items/get-item-route'
import { getOrderRoute } from '../../../application/input-adapters/routes/order/get-order-route'

export class FastifyAppAdapter implements AppAdapter {
  private readonly app: FastifyInstance
  private readonly port = Number(process.env.APP_PORT)
  private readonly host = process.env.APP_HOST

  constructor() {
    this.app = fastify({
      logger: true,
      requestTimeout: 30000,
    })
  }

  public async init(): Promise<void> {
    this.app.register(multipart)
    this.app.register(cors, {
      origin: [`http://localhost:3333`],
    })
    this.app.register(createOrderRoute, { prefix: '/api/v1' }) // http://localhost:3000/api/v1/orders
    this.app.register(getOrderRoute, { prefix: '/api/v1' }) // http://localhost:3000/api/v1/orders/:id
    this.app.register(createItemRoute, { prefix: '/api/v1' }) // http://localhost:3000/api/v1/items
    this.app.register(getItemRoute, { prefix: '/api/v1' }) // http://localhost:3000/api/v1/items/:id

    await this.app
      .listen({ host: this.host, port: this.port })
      .then(() => {
        console.log(`🚀 HTTP server running on http://localhost:${this.port}`)
      })
      .catch((error) => {
        console.error('Error starting the server:', error)
        throw error
      })
  }
}
