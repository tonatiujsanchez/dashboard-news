import { useRouter } from 'next/router'
import NextLink from 'next/link'

import styled from '@emotion/styled'
import { useUI } from '../../hooks/useUI'


export const SideMenu = () => {

    const { pathname } = useRouter()
    const { showSideMenu, toggleSideMenu } = useUI()

    return (
        <SidebarConatiner>
            <div className={`nav ${showSideMenu ? 'show-menu' : ''}`}>
                <nav className="nav__content">
                    <button
                        onClick={() => toggleSideMenu()}
                        className={`nav__toggle ${showSideMenu ? 'rotate-icon' : ''}`}>
                        <i className='bx bx-chevron-right'></i>
                    </button>
                    <NextLink href="/admin" passHref>
                        <a className="nav__logo">
                            <i className='bx bxs-dashboard'></i>
                            <span className="nav__logo-name">ADMIN</span>
                        </a>
                    </NextLink>
                    <div className="nav__list">
                        <NextLink href="/admin/nuevo" passHref>
                            <a className={`nav__link ${ pathname === '/admin/nuevo' ? 'active-link' : '' }`}>
                                <i className='bx bxs-plus-square' ></i>
                                <span className="nav__name">Nuevo artículo</span>
                            </a>
                        </NextLink>
                        <NextLink href="/admin/articulos" passHref>
                            <a className={`nav__link ${ pathname === '/admin/articulos' ? 'active-link' : '' }`}>
                                <i className='bx bx-list-ul' ></i>
                                <span className="nav__name">Artículos</span>
                            </a>
                        </NextLink>
                        <NextLink href="/admin/multimedia" passHref>
                            <a className={`nav__link ${ pathname === '/admin/multimedia' ? 'active-link' : '' }`}>
                                <i className='bx bx-image' ></i>
                                <span className="nav__name">Multimedia</span>
                            </a>
                        </NextLink>
                        <NextLink href="/admin/categorias" passHref>
                            <a className={`nav__link ${ pathname === '/admin/categorias' ? 'active-link' : '' }`}>
                                <i className='bx bx-category-alt' ></i>
                                <span className="nav__name">Categorías</span>
                            </a>
                        </NextLink>
                        <NextLink href="/admin/autores" passHref>
                            <a className={`nav__link ${ pathname === '/admin/autores' ? 'active-link' : '' }`}>
                                <i className='bx bxs-user-circle' ></i>
                                <span className="nav__name">Autores</span>
                            </a>
                        </NextLink>
                    </div>
                </nav>
            </div>

        </SidebarConatiner>
    )
}


const SidebarConatiner = styled.div`

    @media screen and (max-width: 767px) {
        .nav__logo,
        .nav__toggle,
        .nav__name {
            display: none;
        }

        .nav__list {
            position: fixed;
            bottom: 3rem;
            box-shadow: 0 8px 24px hsla(228, 81%, 24%, 0.15);
            width: 90%;
            padding: 25px 40px;
            border-radius: 1rem;
            margin: 0 auto;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            column-gap: 36px;
            transition: 0.4s;
            background-color: var(--white-color);
            z-index: 99;
        }
    }

    .nav__link {
        display: flex;
        font-size: 1.7rem;
        font-weight: 500;
        transition: 0.3s;
        color: var(--slate-color-600);
    }

    .nav__link i {
        font-size: 2rem;
    }

    .nav__link:hover {
        color: var(--primary-color);
    }

    /* Active link */
    .active-link {
        color: var(--primary-color);
    }


    @media screen and (max-width: 320px) {
        .nav__list {
            column-gap: 20px;
        }    
    }

    /* For medium devices */
    @media screen and (min-width: 576px) {
        .nav__list {
            width: 33.2rem;
        }    
    }

    @media screen and (min-width: 767px) {
    
        .nav {
            position: fixed;
            left: 0;
            box-shadow: 1px 0 4px hsla(228, 81%, 24%, 0.15);
            width: 8.4rem;
            height: 100vh;
            padding: 3rem;
            transition: 0.3s;
            background-color: #FFF;
        }

        .nav__logo {
            display: flex;
        }

        .nav__logo i {
            font-size: 2rem;
            color: var(--first-color);
        }

        .nav__logo-name {
            color: var(--title-color);
            font-weight: 600;
        }

        .nav__logo,
        .nav__link {
            align-items: center;
            column-gap: 2rem;
        }

        .nav__list {
            display: grid;
            row-gap: 4rem;
            margin-top: 10.5rem;
        }

        .nav__content {
            overflow: hidden;
            height: 100%;
        }

        .nav__toggle {
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: black;
            color: #FFF;
            border-radius: 50%;
            font-size: 1.2rem;
            display: grid;
            place-items: center;
            top: 3rem;
            right: -10px;
            cursor: pointer;
            transition: .4s;
        }
    }

    /* Show menu */
    .show-menu {
        width: 25.5rem;
    }

    /* Rotate toggle icon */
    .rotate-icon {
        transform: rotate(180deg);
    }
`
