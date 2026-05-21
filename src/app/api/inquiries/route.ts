import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name?.trim() || !body.phone?.trim() || !body.message?.trim()) {
    return NextResponse.json(
      { error: "Name, phone, and message are required" },
      { status: 400 }
    );
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      name: body.name.trim(),
      phone: body.phone.trim(),
      message: body.message.trim(),
    },
  });

  return NextResponse.json(inquiry, { status: 201 });
}
