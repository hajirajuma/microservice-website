import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('register')
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string | undefined;

  @Column({ unique: true })
  email: string | undefined;

  @Column()
  password: string | undefined;
}