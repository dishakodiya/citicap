import { PrismaClient, Category } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: "MLCC Ceramic Capacitor 104",
    description:
      "High-stability multilayer ceramic capacitor for decoupling and filtering in consumer electronics.",
    voltage: "50V",
    capacity: "100nF",
    category: Category.CERAMIC,
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-463619ab8de3?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    name: "X7R Ceramic Capacitor 225",
    description:
      "Temperature-stable ceramic capacitor ideal for power supplies and industrial control boards.",
    voltage: "100V",
    capacity: "2.2µF",
    category: Category.CERAMIC,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "Aluminum Electrolytic 470µF",
    description:
      "Low-ESR electrolytic capacitor for audio amplifiers, inverters, and DC power filtering.",
    voltage: "25V",
    capacity: "470µF",
    category: Category.ELECTROLYTIC,
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    name: "Radial Electrolytic 1000µF",
    description:
      "Long-life radial electrolytic capacitor for SMPS and motor drive applications.",
    voltage: "63V",
    capacity: "1000µF",
    category: Category.ELECTROLYTIC,
    imageUrl:
      "https://images.unsplash.com/photo-1555668318-22d2c545e5b7?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "Mylar Polyester Film 333",
    description:
      "Low-loss polyester film capacitor for timing circuits and snubber networks.",
    voltage: "400V",
    capacity: "33nF",
    category: Category.POLYESTER,
    imageUrl:
      "https://images.unsplash.com/photo-1517077303845-6ae8c68ca194?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "Box Type Polyester 105",
    description:
      "General-purpose polyester capacitor for lighting ballasts and power electronics.",
    voltage: "630V",
    capacity: "1µF",
    category: Category.POLYESTER,
    imageUrl:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "SMD Ceramic 0603 104",
    description:
      "Compact surface-mount ceramic capacitor for PCB assemblies and IoT devices.",
    voltage: "16V",
    capacity: "100nF",
    category: Category.SMD,
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    name: "SMD Tantalum 107",
    description:
      "High-capacity SMD tantalum capacitor for portable electronics and wearables.",
    voltage: "10V",
    capacity: "100µF",
    category: Category.SMD,
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "Oil-Filled Paper Capacitor",
    description:
      "Classic paper dielectric capacitor for vintage audio equipment and high-voltage filtering.",
    voltage: "600V",
    capacity: "0.47µF",
    category: Category.PAPER,
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "MP Paper Capacitor 224",
    description:
      "Metallized paper capacitor for motor run and power factor correction circuits.",
    voltage: "440V",
    capacity: "220nF",
    category: Category.PAPER,
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "Power Factor Correction Capacitor",
    description:
      "Heavy-duty industrial capacitor for three-phase motor and transformer PFC systems.",
    voltage: "440V AC",
    capacity: "25µF",
    category: Category.INDUSTRIAL,
    imageUrl: "/images/product-sample.png",
    featured: true,
  },
  {
    name: "DC Link Industrial Capacitor",
    description:
      "High-ripple current capacitor for solar inverters, VFDs, and industrial drives.",
    voltage: "800V DC",
    capacity: "470µF",
    category: Category.INDUSTRIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
    featured: false,
  },
];

async function main() {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await hash(password, 12);

  await prisma.admin.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({ data: sampleProducts });
    console.log(`Seeded ${sampleProducts.length} products`);
  }

  await prisma.product.updateMany({
    where: { name: "Power Factor Correction Capacitor" },
    data: { imageUrl: "/images/product-sample.png" },
  });

  console.log("Database seeded successfully");
  console.log(`Admin login: ${username} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
