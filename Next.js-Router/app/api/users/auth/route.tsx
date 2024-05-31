//
// API for list all users and user login authentication
//
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.password)
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );

    // using zod's validation
    const validation = schema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );

    // check if user existed
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user)
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );

    // check hashed password
    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch)
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );

    const jwtKey = process.env.JWT_KEY || "jwt secret key";
    const jwtToken = jwt.sign({ userId: user.id }, jwtKey, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token: jwtToken }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
