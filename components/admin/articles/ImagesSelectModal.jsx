import { useEffect, useState } from "react"

import { useData } from "../../../hooks/useData"
import { ImagesSelectModalList } from "./ImagesSelectModalList"
import styled from "@emotion/styled"


const section_active_storage = 'images_section_active_UD3EZGXun367'
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


    useEffect(() => {

        if (!actualPage && actualPage !== 0) { return }

        if (images[sectionImages].data.length <= 0) {
            loadImages()
        } else {
            setImagesList(images[sectionImages].data)
        }

    }, [images])

    // TODO: Implementar paginación


    const onSelectedImage = async() =>{
        if(!imageSelected){
            return null
        }
        return imageSelected.url
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
            <ModalContent className="relative max-w-[700px] max-h-[65vh]">
                <ImagesSelectModalList
                    images={imagesList}
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                />
                <div className="flex items-center justify-end gap-2 mt-5">
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
        </div>
    )
}


const ModalContent = styled.div`
    /* z-index: 999; */

`