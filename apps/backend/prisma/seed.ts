import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail: string = 'admin@admin.com';
  const adminPassword: string = 'admin1234';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword: string = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
      },
    });

    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
