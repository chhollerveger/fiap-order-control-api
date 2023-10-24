import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Order } from '../../../domain/entitites/order'
import { Item } from '../../../domain/entitites/item'
import { DatabaseAdapter } from '../database-adapter'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env

export class SingletonOrmDatabaseAdapter implements DatabaseAdapter {
  private static instance: SingletonOrmDatabaseAdapter | undefined // eslint-disable-line no-use-before-define
  public database!: DataSource

  public static getInstance(): SingletonOrmDatabaseAdapter {
    if (!SingletonOrmDatabaseAdapter.instance) {
      SingletonOrmDatabaseAdapter.instance = new SingletonOrmDatabaseAdapter()
    }

    return SingletonOrmDatabaseAdapter.instance
  }

  public async init(): Promise<void> {
    this.database = this.databaseConnection()

    if (this.database.isInitialized) {
      console.log('Database already connected')
    }
    await this.database
      .initialize()
      .then(() => {
        console.log('🚀 Connected to the database')
      })
      .catch((error) => {
        console.error('Error initialize to the database:', error)
        throw error
      })
  }

  private databaseConnection() {
    return new DataSource({
      type: 'mysql',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: true,
      logging: false,
      entities: [Order, Item],
      migrations: [],
      subscribers: [],
    })
  }
}
