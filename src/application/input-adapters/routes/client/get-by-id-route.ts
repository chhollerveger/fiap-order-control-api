import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { GetByIdClientUseCaseImpl } from '../../../use-cases/client/get-by-id-client-use-case'
import { GetByIdClientController } from '../../controllers/clients/get-by-id-client-controller'
import { getByIdClientSwagger } from '../../../output-adapters/swagger'

export const getByIdRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/client/getById',
    getByIdClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new GetByIdClientUseCaseImpl(repository)
      const controller = new GetByIdClientController(usecase)
      await controller.execute(request, reply)
    },
  )
}