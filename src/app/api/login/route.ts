import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { lucia } from "@/lucia/auth";
import { db } from "@/drizzle/drizzle";
import { users } from "@/drizzle/schema";
import bcrypt from "bcrypt";
import { z } from "zod";
import { ResponseAPI } from "@/utils/ResponseUtils";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginRequest = z.infer<typeof LoginSchema>;

interface MenuItem {
  menu_id: number;
  name: string;
  parent: number | null;
  url_menu: string;
  children: MenuItem[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = LoginSchema.parse(body);

    // Check if the user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length === 0) {
      return ResponseAPI.error("Incorrect email or password", 400);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser[0].password
    );

    if (!isPasswordValid) {
      return ResponseAPI.error("Internal Server Error", 500);
    }

    // Create a new session for the user
    const session = await lucia.createSession(existingUser[0].id, {
      role_id: existingUser[0].role_id,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);

    const response = NextResponse.json(
      {
        status: 200,
        status_message: "User logged in successfully",
        data: {
          email: existingUser[0].email,
          username: existingUser[0].username,
          phone: existingUser[0].phone,
          token: sessionCookie.value,
        },
      },
      { status: 200 }
    );

    response.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ResponseAPI.error(
        "Invalid input: " + error.errors.map((e) => e.message).join(", "),
        400
      );
    }
    console.error("Error logging in user:", error);
    return ResponseAPI.error("Failed to log in", 500);
  }
}
