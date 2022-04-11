import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BasicEntity } from './basic.entity'

@Entity('users')
export class User extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'parent', type: 'int', nullable: true })
  parent: number

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password: string

  @Column({ name: 'role', type: 'varchar', nullable: true, default: 'root' })
  role?: string

  @Column({ name: 'status', type: 'varchar', nullable: true })
  status: string

  @Column({ name: 'phone', type: 'varchar', nullable: true })
  phone: string

  @Column({ name: 'image', type: 'varchar', nullable: true })
  image: string

  @Column({ type: 'varchar', nullable: true })
  verificationToken: string

  @Column({ type: 'boolean', nullable: true })
  emailVerified: boolean

  @Column({ type: 'date', nullable: true })
  lastLogin: Date
}
