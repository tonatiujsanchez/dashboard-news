import { Fragment, useEffect, useState } from "react"

import styled from "@emotion/styled"
import { useData } from "../../../hooks/useData"

export const SelectAuthors = () => {

    const [loadingAuthors, setLoadingAuthors] = useState(false)
    const [showSelect, setShowSelect] = useState(false)
    const [authorActive, setAuthorActive] = useState(null)

    const { article, setArticle, authors, refreshAuthors } = useData()

    const LoadAuthors = async () => {
        setLoadingAuthors(true)
        await refreshAuthors()
        setLoadingAuthors(false)
    }

    useEffect(() => {
        if (authors.length === 0) {
            LoadAuthors()
        }
    }, [])

    useEffect(()=>{
        if(!article.author){
            setAuthorActive(authors[0])
            return
        }
        setAuthorActive(article.author)
    },[article, authors])

    const handleSelectAuthor = (author) => {
        setArticle({
            ...article,
            author: author,
        })
    }

    return (
        <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-end gap-2 mb-1">
                <label htmlFor="author" className="mb-1">Autor</label>
                <button
                    className="text-xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-2 px-2 rounded-full grid place-content-center active:scale-95"
                    onClick={() => LoadAuthors()}>
                    <i className='bx bx-revision'></i>
                </button>
            </div>
            {
                loadingAuthors || !authorActive
                    ? <div className="animate-pulse space-x-4 rounded-md bg-slate-300 h-20 w-full"></div>
                    : <ContenedorSelect
                        onClick={() => setShowSelect(!showSelect)}
                        className="border border-gray-200"
                    >
                        <OpcionSeleccionada>
                            {authorActive.name} <i className={`bx bxs-down-arrow transition-all duration-300 ${showSelect ? 'rotate-180' : ''}`}></i>
                        </OpcionSeleccionada>
                        {showSelect &&
                            <Opciones className={`border border-gray-200 shadow-lg`}>
                                {authors.map(author => (
                                        <Opcion
                                            key={author._id}
                                            onClick={() => handleSelectAuthor(author)}
                                        >
                                            {author.name}
                                        </Opcion>
                                ))
                                }
                            </Opciones>
                        }
                    </ContenedorSelect>
            }
        </div>
    )
}


const ContenedorSelect = styled.div`
    background-color: rgb(250, 250, 255);
	cursor: pointer;
	border-radius: 0.625rem; /* 10px */
	position: relative;
	height: 5rem; /* 80px */
	width: 100%;
	padding: 0px 1.25rem; /* 20px */
	font-size: 1.5rem; /* 24px */
	text-align: center;
	display: flex;
	align-items: center;
	transition: .5s ease all;
    /* z-index: 10; */
	&:hover {
		background-color: #E8EFF1;
	}
`;

const OpcionSeleccionada = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
    /* z-index: 10; */
`;

const Opciones = styled.div`
    background-color: white;
	position: absolute;
	top: 4.8rem; /* 90px */
	left: 0;
	width: 100%;
	border-radius: 0.625rem; /* 10px */
	max-height: 28rem; /* 300px */
	overflow-y: auto;
    z-index: 10;
`;

const Opcion = styled.div`
	display: flex;
    padding: ${(props) => props.subcategory ? '1rem 1.25rem 1rem 3rem' : '1.25rem'};
    font-weight: ${(props) => props.subcategory ? 'normal' : 'bold'};
    /* z-index: 10; */
	&:hover {
		background-color: #CBDDE2;
	}
`;

