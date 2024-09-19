import { NextResponse } from "next/server";

export class ResponseAPI {
  static success<T>(data: T, message: string, meta?: object): NextResponse {
    return NextResponse.json({
      status: 200,
      status_message: message,
      data: data,
      meta: meta || {},
    });
  }

  static error(
    message: string,
    status: number = 400,
    errors?: any
  ): NextResponse {
    return NextResponse.json(
      {
        status,
        status_message: message,
        data: null,
        errors: errors || {},
      },
      { status }
    );
  }

  static created<T>(
    data: T,
    message: string = "Resource created successfully"
  ): NextResponse {
    return NextResponse.json(
      {
        status: 201,
        status_message: message,
        data: data,
      },
      { status: 201 }
    );
  }

  static noContent(message: string = "No content"): NextResponse {
    return new NextResponse(null, {
      status: 204,
      statusText: message,
    });
  }

  static badRequest(
    message: string = "Bad request",
    errors?: any
  ): NextResponse {
    return this.error(message, 400, errors);
  }

  static unauthorized(message: string = "Unauthorized"): NextResponse {
    return this.error(message, 401);
  }

  static forbidden(message: string = "Forbidden"): NextResponse {
    return this.error(message, 403);
  }

  static notFound(message: string = "Not found"): NextResponse {
    return this.error(message, 404);
  }

  static serverError(message: string = "Internal server error"): NextResponse {
    return this.error(message, 500);
  }
}
