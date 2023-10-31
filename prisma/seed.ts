// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'adam@gmail.com' },
    update: {},
    create: {
      userId: '123456789',
      email: 'adam@gmail.com',
      firstName: 'Adam',
      lastName: 'Cool',
      picture:
        'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528',
      isBanned: false,
    },
  });
  console.log('user 1 created');

  const user2 = await prisma.user.upsert({
    where: { email: 'eva@gmail.com' },
    update: {},
    create: {
      userId: '123456788',
      email: 'eva@gmail.com',
      firstName: 'Eva',
      lastName: 'Sexy',
      picture:
        'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528',
      isBanned: false,
    },
  });
  console.log('user 2 created');

  const battle = await prisma.battle.create({
    data: {
      name: 'Battle 1',
      users: { connect: [{ email: user1.email }, { email: user2.email }] },
    },
  });

  const battleResult = [
    {
      change: 25,
      placement: 1,
      userEmail: user1.email,
    },
    {
      change: -25,
      placement: 2,
      userEmail: user2.email,
    },
  ];

  for (const item of battleResult) {
    await prisma.ratingChange.create({
      data: {
        change: item.change,
        placement: item.placement,
        user: { connect: { email: item.userEmail } },
        battle: { connect: { battle_id: battle.battle_id } },
      },
    });

    console.log('battle result created', item);
  }

  console.log('seeded successfully');
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
