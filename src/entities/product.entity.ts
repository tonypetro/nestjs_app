import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BasicEntity } from './basic.entity'

@Entity('products')
export class Product extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'company_name', type: 'varchar', nullable: true })
  companyName: string

  @Column({ name: 'product_type', type: 'varchar', nullable: true })
  productType: string

  @Column({ name: 'city', type: 'varchar', nullable: true })
  city: string

  @Column({ name: 'contact_method', type: 'varchar', nullable: true })
  contactMethod: string

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string
}
