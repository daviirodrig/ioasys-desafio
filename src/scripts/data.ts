import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const adminId = randomUUID();
export const users = [
  {
    id: adminId,
    displayName: 'Admin',
    email: 'admin@mail.com',
    passwordHash: bcrypt.hashSync('password'),
  },
  {
    displayName: 'Usuário 1',
    email: 'user1@mail.com',
    passwordHash: bcrypt.hashSync('password'),
  },
  {
    displayName: 'Usuário 2',
    email: 'user2@mail.com',
    passwordHash: bcrypt.hashSync('password'),
  },
];

export const products = [
  {
    admin_id: adminId,
    name: 'Bolsa',
    description: 'Descrição bolsa',
    price: Math.round(Math.random() * 100) + 1,
    storage: Math.round(Math.random() * 100) + 1,
  },
  {
    admin_id: adminId,
    name: 'Blusa',
    description: 'Descrição blusa',
    price: Math.round(Math.random() * 100) + 1,
    storage: Math.round(Math.random() * 100) + 1,
  },
  {
    admin_id: adminId,
    name: 'Camiseta',
    description: 'Descrição Camiseta',
    price: Math.round(Math.random() * 100) + 1,
    storage: Math.round(Math.random() * 100) + 1,
  },
  {
    admin_id: adminId,
    name: 'Moletom',
    description: 'Descrição Moletom',
    price: Math.round(Math.random() * 100) + 1,
    storage: Math.round(Math.random() * 100) + 1,
  },
  {
    admin_id: adminId,
    name: 'Calça',
    description: 'Descrição Calça',
    price: Math.round(Math.random() * 100) + 1,
    storage: Math.round(Math.random() * 100) + 1,
  },
  {
    admin_id: adminId,
    name: 'Tênis',
    description: 'Descrição Tênis',
    price: Math.round(Math.random() * 100) + 1,
    storage: Math.round(Math.random() * 100) + 1,
  },
];
