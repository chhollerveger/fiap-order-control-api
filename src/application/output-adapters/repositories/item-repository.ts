import { DataSource } from 'typeorm'
import { ItemRepository } from '../../../domain/ports/repositories/item-repository'
import { Item } from '../../../domain/entitites/item'
import { FindItemParams } from '../../../domain/dtos/find-item-params'

export class ItemRepositoryImpl implements ItemRepository {
  constructor(private readonly database: DataSource) { }

  async save(item: Item): Promise<Item> {
    const repository = this.database.getRepository(Item)
    return await repository.save(item)
  }

  async getById(itemId: number): Promise<Item | null> {
    const repository = this.database.getRepository(Item)
    return await repository.findOneBy({ id: itemId })
  }

  async findByParams(params: FindItemParams): Promise<Item[] | []> {
    const repository = this.database.getRepository(Item)
    return await repository.find({ where: params })
  }
}