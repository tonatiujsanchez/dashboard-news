import styled from '@emotion/styled'

import { SideMenu } from "../admin"


export const AdminLayout = ({ children }) => {
    return (
        <AdminLayoutContainer>
            <SideMenu />
            <main className='container section'>
                {children}
            </main>
        </AdminLayoutContainer>
    )
}


const AdminLayoutContainer = styled.div`
    position: relative;

    .container {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .section {
        padding: 2rem 0;
    }

    @media screen and (min-width: 767px) {
        .container{
            margin-left: 7rem;
            margin-right: 1.5rem;
        }
    }
`