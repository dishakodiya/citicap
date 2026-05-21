import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      voltage: body.voltage,
      capacity: body.capacity,
      category: body.category,
      imageUrl: body.imageUrl,
      featured: Boolean(body.featured),
    },
  });

  return NextResponse.json(product, { status: 201 });
}
