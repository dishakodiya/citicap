import { NextRequest, NextResponse } from "next/server";
import { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();
  const category = searchParams.get("category") as Category | null;
  const featured = searchParams.get("featured");

  const products = await prisma.product.findMany({
    where: {
      ...(category && Object.values(Category).includes(category)
        ? { category }
        : {}),
      ...(featured === "true" ? { featured: true } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
              { voltage: { contains: search } },
              { capacity: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

