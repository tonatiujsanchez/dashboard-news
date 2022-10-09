import { useEffect, useRef, useState } from "react"

import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'

import { LoadingAdmin, LoadingCircle } from "../../../components/admin/ui"
import { TitlePage } from "../../../components/admin/ui"
import { AdminLayout } from "../../../components/layouts/AdminLayout"

import { ImageList } from "../../../components/admin/images"

import { useData } from "../../../hooks/useData"


const buttonsNav = [
    {
        title: 'Artículos',
        id: 'articles'
    },
    {
        title: 'Autores',
        id: 'authors'
    },
    {
        title: 'Usuarios',
        id: 'users'
    },
]

const section_active_storage = 'images_section_active_UD3EZGXun367'



const ImagenesPage = () => {

    const [loading, setLoading] = useState(false)
    const [loadingUploadImages, setLoadingUploadImages] = useState(false)

    const [sectionActive, setSectionActive] = useState(null)
    const [actualPage, setActualPage] = useState(null)
    const [imagesList, setImagesList] = useState([])


    const [files, setFiles] = useState([])
    const fileInputRef = useRef(null)



    const { refreshImages, addNewImage, images } = useData()



    const notifySuccess = (msg) => toast.success(msg, {
        theme: "colored",
        autoClose: 1000
    })

    const notifyError = (msg) => toast.error(msg, {
        theme: "colored",
        autoClose: 3000
    })


    // Load images
    const loadImages = async () => {
        setLoading(true)
        setFiles([])
        await refreshImages(sectionActive, actualPage)
        setImagesList(images[sectionActive].data)
        setLoading(false)
    }


    useEffect(()=>{
        const imagesSectionActive = localStorage.getItem(section_active_storage) || buttonsNav[0].id
        const imagesPageActive = Number(localStorage.getItem(`section_page_storage_${imagesSectionActive}_UD3EZGXun367`)) || 0

        setSectionActive(imagesSectionActive)
        setActualPage(imagesPageActive)
    },[])



    useEffect(() => {

        if(!sectionActive || (!actualPage && actualPage !== 0)){ return }

        if (images[sectionActive].data.length <= 0) {
            loadImages()
        } else {
            setImagesList(images[sectionActive].data)
        }

    }, [sectionActive, images])


    const updateSection = (section) => {
        setSectionActive(section)
        const imagesPageActive = Number(localStorage.getItem(`section_page_storage_${section}_UD3EZGXun367`)) || 0
        setActualPage(imagesPageActive)
    }


    // Image select and preview 
    const handleFilesChange = (e) => {

        if (!e.target.files || e.target.files.length === 0) {
            setFiles([])
            return
        }
        setFiles([...e.target.files])
    }


    const uploadImages = async () => {
        
        if (files.length === 0) {
            notifyError('No hay archivos seleccionados para subir')
            return
        }
        setLoadingUploadImages(true)

        const imagesFormData = files.map(file => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('section', sectionActive)

            return addNewImage(formData)
        })

        try {
            await Promise.all(imagesFormData)
            setFiles([])
            setLoadingUploadImages(false)
            fileInputRef.current.value = ''
            notifySuccess('Imagenes subidas correctamente')

        } catch (error) {

            setFiles([])
            setLoadingUploadImages(false)
            fileInputRef.current.value = ''
            notifyError('Hubo un error al intentar subir la imagen')
        }

    }

    const handlePageClick = async(event) => {
        setActualPage(event.selected)
        await refreshImages(sectionActive, event.selected)
    }


    return (
        <AdminLayout title="- Imagenes" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Imagenes" />
                <button
                    className="text-3xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-2 px-3 rounded-full active:scale-95"
                    onClick={() => loadImages()}>
                    <i className='bx bx-revision'></i>
                </button>
            </div>
            {
                loading
                    ? <div className="flex justify-center mt-96">
                        <LoadingAdmin />
                    </div>
                    : <section>
                        <div className="mb-5">
                            <input
                                type="file"
                                disabled={loadingUploadImages}
                                ref={fileInputRef}
                                accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                                multiple
                                onChange={handleFilesChange}
                            />
                        </div>
                        <div className="w-full mb-5 flex flex-col gap-5 sm:flex-row sm:justify-between">
                            <div>
                                <button
                                    className={`bg-sky-500 hover:bg-sky-600 px-8 py-5 font-semibold rounded-md color-admin w-full sm:w-auto ml-auto flex justify-center min-w-[200px] gap-1 ${ loadingUploadImages ? 'disabled:bg-sky-400' : 'disabled:bg-sky-200' }`}
                                    onClick={uploadImages}
                                    disabled={files.length === 0 || loadingUploadImages}
                                >
                                    {
                                        loadingUploadImages
                                            ? <>
                                                <LoadingCircle />
                                                <span className="ml-2">Subiendo...</span>
                                            </>
                                            : <>
                                                <i className='bx bx-plus text-4xl'></i>
                                                Subir imagenes
                                            </>
                                    }
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-2 lg:gap-5">
                                {
                                    buttonsNav.map(btn => {
                                        return (
                                            <button
                                                key={btn.id}
                                                disabled={loadingUploadImages}
                                                onClick={() => updateSection(btn.id)}
                                                className={`${sectionActive === btn.id ? 'bg-slate-100 shadow-md border-b-4 border-b-sky-500' : 'border-b-4 bg-white'} rounded-lg py-3 px-6 sm:px-10 lg:px-16 font-semibold border flex-1 hover:bg-slate-100 disabled:opacity-50 hover:disabled:bg-white`}
                                            >
                                                {btn.title}
                                            </button>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="py-10 relative">
                            <ImageList images={imagesList} />
                            
                            {
                                loadingUploadImages &&
                                <div className="bg-admin absolute left-0 right-0 top-0 bottom-0 flex justify-center py-80 opacity-95">
                                    <LoadingAdmin/>
                                </div>
                            }
                            
                        </div>
                        {
                            sectionActive &&
                            <div className="flex justify-end mt-16">
                                {
                                    images[sectionActive].pageCount > 1 &&
                                    <ReactPaginate
                                        previousLabel="<"
                                        breakLabel="..."
                                        nextLabel=">"
                                        onPageChange={handlePageClick}
                                        pageCount={ images[sectionActive].pageCount }
                                        forcePage={actualPage}
                                        className="flex justify-end gap-2"
                                        pageLinkClassName="border-2 border-transparent opacity-50 px-5 hover:border-b-sky-500 hover:opacity-100 py-2 font-semibold"
                                        activeLinkClassName="border-2 border-sky-500 opacity-100 py-2 rounded"
                                    />
                                }
                            </div>
                        }
                    </section>
            }

        </AdminLayout>
    )
}

export default ImagenesPage