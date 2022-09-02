import Head from 'next/head'


import styled from '@emotion/styled'

import { useUI } from '../../hooks/useUI'
import { SideMenu, Profile } from "../admin/shared"



export const AdminLayout = ({ children, title = '' }) => {

    const { showSideMenu, toggleSideMenu } = useUI()

    return (
        <>
            <Head>
                <title>{`Admin ${title}`}</title>
            </Head>
            <AdminLayoutContainer className='bg-admin min-h-screen'>
                <SideMenu showMenu={showSideMenu} setShowMenu={toggleSideMenu} />
                <Profile />
                <main className={`container-admin section ${showSideMenu ? 'container-show-sidemenu' : ''}`}>
                    {children}
                </main>
            </AdminLayoutContainer>
        </>
    )
}


const AdminLayoutContainer = styled.div`
    position: relative;
    background-color: rgb(250, 250, 255);
    padding-bottom: 12rem;

    .container-admin {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    
    .section {
        padding-top: 1rem;
        padding-bottom: 2rem;
        padding-right: 1rem;
        padding-left: 1rem;        
        transition: 0.3s;
    }
    
    @media screen and (min-width: 767px) {
        padding-bottom: 4rem;

        .section {
            padding-top: 2rem;
            padding-bottom: 3rem;
            padding-right: 2rem;
            padding-left: 2rem;
            transition: 0.3s;
        }
        .container-admin{
            margin-left: 9rem;
            margin-right: 1.5rem;
        }

        .container-show-sidemenu {
            margin-left: 26rem;
        }
    }
`