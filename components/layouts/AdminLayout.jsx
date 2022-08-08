import styled from '@emotion/styled'
import Head from 'next/head'
import { useUI } from '../../hook/useUI'

import { SideMenu } from "../admin"


export const AdminLayout = ({ children, title = '' }) => {

    const { showSideMenu, toggleSideMenu } = useUI()

    return (
        <>
            <Head>
                <title>{`Admin ${ title }`}</title>
            </Head>
            <AdminLayoutContainer>
                <SideMenu showMenu={showSideMenu} setShowMenu={toggleSideMenu} />
                <main className={`container section ${showSideMenu ? 'container-show-sidemenu' : ''}`}>
                    {children}
                </main>
            </AdminLayoutContainer>
        </>
    )
}


const AdminLayoutContainer = styled.div`
    position: relative;

    .container {
        margin-left: 1rem;
        margin-right: 1rem;
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
        .container{
            margin-left: 9rem;
            margin-right: 1.5rem;
        }

        .container-show-sidemenu {
            margin-left: 26rem;
        }
    }
`