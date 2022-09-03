import { NextResponse } from 'next/server'
import * as jose from 'jose'

export async function middleware(req) {

    const token = req.cookies.get('news_token')
    const { protocol, host } = req.nextUrl

    if (req.nextUrl.pathname.startsWith('/admin')) {

        if (!token) {            
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)
        }

        try {
            
            await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED))
            return NextResponse.next()

        } catch (error) {

            console.log(error)
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)
        }

    }
    

    if (req.nextUrl.pathname.startsWith('/iniciar-sesion')) {
        try {
            
            await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED))
            return NextResponse.redirect(`${protocol}//${host}/admin`)
            
        } catch (error) {

            return NextResponse.next()
        }
    }

}


export const config = {
    matcher: [
        '/admin/:path*',
        '/iniciar-sesion',
    ]
}