import { useEffect, useRef, useState } from "react"
import { toast } from 'react-toastify'


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


const ImagenesPage = () => {


    const [loading, setLoading] = useState(false)
    const [loadingUploadImages, setLoadingUploadImages] = useState(false)

    const [buttonActive, setButtonActive] = useState(buttonsNav[0].id)
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



    const loadImages = async () => {
        setLoading(true)

        setFiles([])
        await refreshImages(buttonActive, '')
        const imagesTemp = images.filter(image => (image.section === buttonActive))
        setImagesList(imagesTemp)

        setLoading(false)
    }

    useEffect(() => {
        const imagesTemp = images.filter(image => (image.section === buttonActive))

        if (imagesTemp.length <= 0) {
            loadImages()
        } else {
            setImagesList(imagesTemp)
        }
        
    }, [buttonActive, images])


    // Image select and preview 
    const handleFilesChange = (e) => {

        if (!e.target.files || e.target.files.length === 0) {
            setFiles([])
            return
        }
        setFiles([...e.target.files])
    }


    const uploadImages = async() => {

        if(files.length === 0){
            notifyError('No hay archivos seleccionados para subir')
            return
        }

        setLoadingUploadImages(true)
        
        // files.forEach( async(file)=>{
            
        //     const formData = new FormData()
        //     formData.append('file', file)
        //     formData.append('section', buttonActive)

        //     const {hasError} = await addNewImage(formData)

        //     if(hasError){
        //         notifyError('Hubo un error al subir la imagen')
        //         setFiles([])
        //         return
        //     }

        //     notifySuccess('Imagen subida correctamente')
        //     console.log(loadingUploadImages);
        // })

        const imagesFormData = files.map( file => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('section', buttonActive)

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
                                ref={ fileInputRef }
                                accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                                multiple
                                onChange={handleFilesChange}
                            />
                        </div>
                        <div className="w-full mb-5 flex flex-col gap-5 sm:flex-row sm:justify-between">
                            <div>
                                <button
                                    className="bg-sky-500 hover:bg-sky-600 px-8 py-5 font-semibold rounded-md color-admin w-full sm:w-auto ml-auto flex justify-center min-w-[200px] gap-1 disabled:bg-sky-200"
                                    onClick={uploadImages}
                                    disabled={ files.length === 0 || loadingUploadImages}
                                >
                                    {
                                        loadingUploadImages
                                        ?<>
                                            <LoadingCircle />
                                            <span className="ml-2">Subiendo...</span>
                                         </>
                                        :<>
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
                                                onClick={() => setButtonActive(btn.id)}
                                                className={`${buttonActive === btn.id ? 'bg-slate-100 shadow-md border-b-4 border-b-sky-500' : 'border-b-4 bg-white'} rounded-lg py-3 px-6 sm:px-10 lg:px-16 font-semibold border flex-1 hover:bg-slate-100 disabled:opacity-50`}
                                            >
                                                {btn.title}
                                            </button>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="my-10">
                            <ImageList images={imagesList} />
                        </div>
                        <div className="flex justify-end">
                            <p>Paginación</p>
                        </div>
                    </section>
            }

        </AdminLayout>
    )
}

export default ImagenesPage