import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersRepository{
  private readonly users = [
    {
      userId: 1,
      username: 'geovane',
      password: 'test',
      permissions: {
        eloan: {
          role: 'attorney_a',
          permissions: ['create', 'read', 'update', 'delete'],
        },
        efund: {
          role: 'admin'
        }
      }
    },
    {
      userId: 2,
      username: 'user2',
      password: 'test',
      permissions: {
        ecash: {
          role: 'guess',
          permissions: []
        }
      }
    },
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}