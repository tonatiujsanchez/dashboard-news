import styled from '@emotion/styled'
import { useState } from 'react'

export const SideMenu = () => {

    const [showMenu, setShowMenu] = useState(true)

    return (
        <SidebarConatiner>
            <div className={`nav ${ showMenu ? 'show-menu' : ''}`}>
                <nav className="nav__content">
                    <button
                        onClick={()=> setShowMenu(!showMenu)}
                        className={`nav__toggle ${ showMenu ? 'rotate-icon' : ''}`}>
                        <i className='bx bx-chevron-right'></i>
                    </button>
                    <a href="#" className="nav__logo">
                        <i className='bx bxs-planet'></i>
                        <span className="nav__logo-name">Healthy</span>
                    </a>
                    <div className="nav__list">
                        <a href="#" className="nav__link active-link">
                            <i className='bx bxs-grid-alt'></i>
                            <span className="nav__name">Nuevo articulo</span>
                        </a>
                        <a href="#" className="nav__link">
                            <i className='bx bx-file'></i>
                            <span className="nav__name">Articulos</span>
                        </a>
                        <a href="#" className="nav__link">
                            <i className='bx bx-envelope' ></i>
                            <span className="nav__name">Multimedia</span>
                        </a>
                        <a href="#" className="nav__link">
                            <i className='bx bx-bar-chart-square' ></i>
                            <span className="nav__name">Categorias</span>
                        </a>
                        <a href="#" className="nav__link">
                            <i className='bx bx-cog' ></i>
                            <span className="nav__name">Autores</span>
                        </a>
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
            bottom: 2rem;
            background-color: var(--container-color);
            box-shadow: 0 8px 24px hsla(228, 81%, 24%, 0.15);
            width: 90%;
            padding: 30px 40px;
            border-radius: 1rem;
            margin: 0 auto;
            left: 0;
            right: 0;

            display: flex;
            justify-content: center;
            column-gap: 36px;
            transition: 0.4s;
        }
    }

    .nav__link {
        display: flex;
        color: var(--text-color);
        font-weight: 500;
        transition: 0.3s;
    }

    .nav__link i {
        font-size: 1.25rem;
    }

    .nav__link:hover {
        color: var(--first-color);
    }

    /* Active link */
    .active-link {
        color: var(--first-color);
    }


    @media screen and (max-width: 320px) {
        .nav__list {
            column-gap: 20px;
        }    
    }

    /* For medium devices */
    @media screen and (min-width: 576px) {
        .nav__list {
            width: 332px;
        }    
    }

    @media screen and (min-width: 767px) {
    
        .nav {
            position: fixed;
            left: 0;
            background-color: var(--container-color);
            box-shadow: 1px 0 4px hsla(228, 81%, 24%, 0.15);
            width: 84px;
            height: 100vh;
            padding: 2rem;
            transition: 0.3s;
        }

        .nav__logo {
            display: flex;
        }

        .nav__logo i {
            font-size: 1.25rem;
            color: var(--first-color);
        }

        .nav__logo-name {
            color: var(--title-color);
            font-weight: 600;
        }

        .nav__logo,
        .nav__link {
            align-items: center;
            column-gap: 1rem;
        }

        .nav__list {
            display: grid;
            row-gap: 2.5rem;
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
            background-color: red;
            color: #FFF;
            border-radius: 50%;
            font-size: 1.2rem;
            display: grid;
            place-items: center;
            top: 2rem;
            right: -10px;
            cursor: pointer;
            transition: .4s;
        }
    }

    /* Show menu */
    .show-menu {
        width: 255px;
    }

    /* Rotate toggle icon */
    .rotate-icon {
        transform: rotate(180deg);
    }
`
