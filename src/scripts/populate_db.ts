import { User } from '../shared/entities/user.entity';
import { Admin } from '../shared/entities/admin.entity';
import { createConnection } from 'typeorm';
import { products, users } from './data';
import { Product } from '../shared/entities/product.entity';

(async () => {
  const conn = await createConnection();
  conn.createQueryBuilder().insert().into(User).values(users).execute();

  console.log('Criado usuários com senha "password"');
  users.forEach((element) => {
    console.log(element.email);
  });

  conn
    .createQueryBuilder()
    .insert()
    .into(Admin)
    .values([{ user: users[0] }])
    .execute();

  console.log('Usuário admin@mail.com cadastrado como Administrador');

  conn.createQueryBuilder().insert().into(Product).values(products).execute();

  console.log('6 Produtos cadastrados');
})();
