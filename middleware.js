import { NextResponse } from 'next/server'
import * as jose from 'jose'

export async function middleware(req) {

    const token = req.cookies.get('news_session_UD3EZGXun367')
    const { protocol, host } = req.nextUrl



    if (
        req.nextUrl.pathname.startsWith('/admin/autores') || 
        req.nextUrl.pathname.startsWith('/admin/categorias') ||
        req.nextUrl.pathname.startsWith('/admin/usuarios')
    ) {

        if (!token) {            
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)
        }
        
        try {
            const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED))
            
            
            if(payload.role !== 'admin'){
                return NextResponse.redirect(`${protocol}//${host}/admin`)
            } 
    
            return NextResponse.next()
            
        } catch (error) {
            console.log(error)
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)
        }
        
    }



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

    // ===== ===== ===== API ===== ===== =====

    if (req.nextUrl.pathname.startsWith('/api/admin')) {

        if (!token) {            
            return NextResponse.redirect(new URL('/api/unauthorized', req.url))
        }

        try {
            
            const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED))

            if(payload.role !== 'admin'){
                return NextResponse.redirect(new URL('/api/unauthorized', req.url))
            }

            return NextResponse.next()

        } catch (error) {
            return NextResponse.redirect(new URL('/api/unauthorized', req.url))
        }
    }

}


export const config = {
    matcher: [
        '/admin/:path*',
        '/admin/autores/:path*',
        '/admin/categorias/:path*',
        '/iniciar-sesion',
        // api
        '/api/admin/:path*',
    ]
}