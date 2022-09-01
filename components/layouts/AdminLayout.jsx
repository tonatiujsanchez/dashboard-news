import Head from 'next/head'


import styled from '@emotion/styled'

import { useUI } from '../../hooks/useUI'
import { SideMenu } from "../admin/shared"



export const AdminLayout = ({ children, title = '' }) => {

    const { showSideMenu, toggleSideMenu } = useUI()

    return (
        <>
            <Head>
                <title>{`Admin ${title}`}</title>
            </Head>
            <AdminLayoutContainer className='bg-admin'>
                <SideMenu showMenu={showSideMenu} setShowMenu={toggleSideMenu} />
                <main className={`container-admin section ${showSideMenu ? 'container-show-sidemenu' : ''}`}>
                    {children}
                </main>
            </AdminLayoutContainer>
        </>
    )
}


const AdminLayoutContainer = styled.div`
    position: relative;
    
    .container-admin {
        margin-left: 1rem;
        margin-right: 1rem;
        margin-bottom: 10rem;
    }
    .section {
        padding: 2rem 1rem;
        transition: 0.3s;
    }
    
    @media screen and (min-width: 767px) {
        .section {
            padding: 3rem 2rem;
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