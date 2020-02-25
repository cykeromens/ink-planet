import { Default, Email, Format, MaxLength, MinLength, Pattern, Property, Required } from '@tsed/common';

import * as bcrypt from 'bcrypt';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Property()
  @Required()
  @Column()
  username: string;

  @Property()
  @Required()
  @Column()
  @MinLength(6)
  password: string;

  @Property()
  @Required()
  @Pattern(/[a-zA-Z]/)
  @Column()
  firstName: string;

  @Property()
  @Required()
  @Email()
  @Column()
  email: string;

  @Property()
  @MinLength(10)
  @MaxLength(14)
  @Column()
  phone: string;

  @Property()
  @Required()
  @Pattern(/[a-zA-Z]/)
  @Column()
  lastName: string;

  @Property()
  @Column()
  picture?: string;

  @Format('date-time')
  @Default(Date.now)
  @Property()
  @Column()
  dateCreation: Date = new Date();

  matchPassword(candidatePassword: string) {
    return new Promise((resolve) => {
      bcrypt.compare(String(candidatePassword), this.password, (err, isMatch) => {
        if (err || !isMatch) {
          return resolve(false);
        }

        resolve(true);
      });
    });
  }
}
