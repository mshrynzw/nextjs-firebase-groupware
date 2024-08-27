import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export async function middleware(request : NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pathname", request.nextUrl.pathname)

  return NextResponse.next({
    request : {
      headers : requestHeaders
    }
  })
}

