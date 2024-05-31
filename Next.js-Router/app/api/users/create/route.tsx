//
// API for create new user
//
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email)
      return NextResponse.json({ error: "Email is required" }, { status: 400 });

    // using zod's validation
    const validation = schema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // check if user existed before creation
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user)
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 400 }
      );

    // create hashed password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ email: newUser.email }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
