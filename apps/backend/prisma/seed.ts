// import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

async function main() {
  const adminName: string = 'Admin';
  const adminEmail: string = 'admin@admin.com';
  const adminPassword: string = 'admin1234';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword: string = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
      },
    });

    console.log(`✅ Admin user created: ${adminEmail}`);
  }

  const bookingCapKey: string = 'capacity';
  const bookingCapValue: string = '10';
  const existingBookingCapKey = await prisma.bookingConfig.findUnique({
    where: { key: bookingCapKey },
  });

  if (!existingBookingCapKey) {
    await prisma.bookingConfig.createMany({
      data: {
        key: bookingCapKey,
        value: bookingCapValue,
      },
    });

    console.log(
      `✅ Booking ${bookingCapValue} key created with value of ${bookingCapValue}`,
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
