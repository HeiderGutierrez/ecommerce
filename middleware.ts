import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    if(req.nextUrl.pathname.startsWith('/api/admin/')){
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const validRoles = ['admin'];
  if(req.nextUrl.pathname.startsWith('/admin')){
    if(!validRoles.includes(session.user.role)){
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};