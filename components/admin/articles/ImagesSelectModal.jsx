import { useEffect, useState } from "react"

import ReactPaginate from 'react-paginate'
import styled from "@emotion/styled"

import { LoadingAdmin } from "../ui/LoadingAdmin"

import { ImagesSelectModalList } from "./ImagesSelectModalList"
import { useData } from "../../../hooks/useData"


const sectionImages = 'articles'

export const ImagesSelectModal = ({ hiddenImagesModal, handleSelectedImage }) => {

    const [loading, setLoading] = useState(false)
    const [imagesList, setImagesList] = useState([])
    const [actualPage, setActualPage] = useState(0)

    const [imageSelected, setImageSelected] = useState(null)

    const { images, refreshImages } = useData()



    const loadImages = async () => {
        setLoading(true)
        await refreshImages(sectionImages, actualPage)
        setImagesList(images[sectionImages].data)
        setLoading(false)
    }

    useEffect(()=>{
        const imagesPageActive = Number(localStorage.getItem(`section_page_storage_articles_UD3EZGXun367`)) || 0
        setActualPage(imagesPageActive)
    },[])


    useEffect(() => {

        if (!actualPage && actualPage !== 0) { return }

        if (images[sectionImages].data.length <= 0) {
            loadImages()
        } else {
            setImagesList(images[sectionImages].data)
        }

    }, [images])


    const onSelectedImage = async() =>{
        if(!imageSelected){
            return null
        }
        return imageSelected.url
    }

    const handlePageClick = async(event) => {
        setActualPage(event.selected)
        await refreshImages(sectionImages, event.selected)
    }

    return (
        <div className="relative">
            <header className="sticky top-0 bg-white z-50 flex justify-between items-center min-w-[300px] sm:w-[700px] mb-5 py-5 border-b">
                <div></div>
                <p className="text-3xl font-bold py-3 flex-1 text-center">Seleccionar foto</p>
                <button
                    onClick={hiddenImagesModal}
                    className="bg-slate-200 rounded-full w-14 h-14 text-gray-500 flex items-center justify-center hover:text-gray-700 hover:bg-slate-300 transition-all">
                    <i className='bx bx-x text-5xl'></i>
                </button>
            </header>
            {
                loading
                ? <div className="flex justify-center items-center pt-52 pb-60">
                    <LoadingAdmin />
                </div>
                :<ModalContent className="relative max-w-[700px] max-h-[65vh]">
                    <ImagesSelectModalList
                        images={imagesList}
                        imageSelected={imageSelected}
                        setImageSelected={setImageSelected}
                    />
                    <div className="flex justify-end mt-16">
                        {
                            images[sectionImages].pageCount > 1 &&
                            <ReactPaginate
                                previousLabel="<"
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageCount={ images[sectionImages].pageCount }
                                forcePage={actualPage}
                                className="flex justify-end gap-2"
                                pageLinkClassName="border-2 border-transparent opacity-50 px-5 hover:border-b-sky-500 hover:opacity-100 py-2 font-semibold"
                                activeLinkClassName="border-2 border-sky-500 opacity-100 py-2 rounded"
                            />
                        }
                    </div>
                    <div className="flex items-center justify-end gap-10 mt-5">
                        <button
                            onClick={hiddenImagesModal}
                            className="py-3 px-5 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                            Cancelar
                        </button>
                        <button
                            onClick={()=>handleSelectedImage(onSelectedImage)}
                            disabled={!imageSelected}
                            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors disabled:bg-sky-300">
                            Seleccionar
                        </button>
                    </div>
                </ModalContent>
            }
        </div>
    )
}


const ModalContent = styled.div`
    /* z-index: 999; */

`