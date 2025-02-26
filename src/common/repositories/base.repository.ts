import { DataSource, DeepPartial, EntityTarget, FindOneOptions, Repository } from 'typeorm';
import { responsePaginate } from 'src/common/helper';

export class BaseRepository<T> {
  //<T> là generic type, cho phép class làm việc với bất kỳ class nào 
  //Constructor nhận vào entity và dataSource để khởi tạo repository
  protected repository: Repository<T>;

  constructor(entity: EntityTarget<T>, private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(entity);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async show(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }
  
  async update(id: string | number, data: Partial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return this.show({ where: { id: id as any } } as FindOneOptions<T>) as Promise<T>;
  }

  async delete(id: string | number): Promise<void> {
    await this.repository.delete(id);
  }

  async paginate(conditions = {}, limit = 10, page = 1, populate = []) {
    limit = +limit;
    page = +page;
    const [data, total] = await Promise.all([
      this.repository.find({ where: conditions, take: limit, skip: (page - 1) * limit, relations: populate }),
      this.repository.count(conditions),
    ]);
    return responsePaginate(data, total, limit, page);
  }
}