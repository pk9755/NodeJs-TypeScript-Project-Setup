import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("varchar", { length: 500, nullable: true })
  name: string | null = null;

  @Column("varchar", { length: 500, nullable: true })
  author_name: string | null = null;

  @Column("varchar", { length: 500, nullable: true })
  category: string | null = null;

  @Column("decimal")
  price: number;

  @Column()
  total_page: number;
}
