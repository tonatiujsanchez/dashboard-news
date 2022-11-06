import { useEffect, useState } from "react"
import Image from "next/image"
import Modal from 'react-modal'
import { ImagesSelectModal } from "./ImagesSelectModal"


const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    content: {
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '99',
        paddingTop: '0'
    },
}
Modal.setAppElement('#__next')



export const SelectImage = ({ image = null, heightContentImage='h-80', label="Foto", handleSetImage }) => {

    const [photo, setPhoto] = useState(null)
    const [showImagesModal, setShowImagesModal] = useState(false)

    useEffect(()=>{
        if(image){
            setPhoto(image)
        }
    },[image])

    const hiddenImagesModal = () => {
        const body = document.querySelector('body')
        body.classList.remove('fixed-body')
        setShowImagesModal(false)
    }

    const openImagesModal = () => {
        const body = document.querySelector('body')
        body.classList.add('fixed-body')
        setShowImagesModal(true)
    }

    const removePhoto = () => {
        setPhoto(null)
    }


    const handleSelectedImage = async( fnSelectedImage ) => {
        const image = await fnSelectedImage()
        if(image){
            handleSetImage(image)
            setPhoto(image)
            hiddenImagesModal()
        }
    }


    return (
        <>
            <div 
                className={`rounded-lg flex flex-col sm:flex-1 gap-2 mb-4`}
            >
                <p className="mb-1">{ label }</p>
                <div className={`w-full rounded-lg mb-5 relative ${photo ? '' : 'px-40 border-2 border-dotted'}`}>
                    <div className={`rounded-lg overflow-hidden ${heightContentImage} relative w-full ${photo ? '' : 'opacity-40'}`}>
                        <Image
                            priority="true"
                            layout='fill'
                            blurDataURL={"/assets/admin/imgs/drop-image.png"}
                            placeholder="blur"
                            objectFit="cover"
                            src={photo || "/assets/admin/imgs/drop-image.png"}
                            alt={'Imagen para el artículo'}
                            title={'Imagen para el artículo'}
                        />
                    </div>
                    {
                        !photo
                        ? <div
                            onClick={openImagesModal} 
                            className="absolute right-0 top-0 left-0 bottom-0 bg-slate-200/40 flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer">
                            <i className='bx bx-plus-circle text-9xl text-emerald-600'></i>
                         </div>
                        : <button
                            onClick={removePhoto} 
                            className="absolute -right-5 -top-5 flex justify-center items-center text-4xl py-1 px-1 rounded-full shadow text-white bg-red-500 hover:bg-red-600 ">
                            <i className='bx bx-x'></i>
                        </button>
                    }
                    
                </div>
            </div>

            <Modal
                isOpen={showImagesModal}
                style={customStyles}
            >
                <ImagesSelectModal 
                    hiddenImagesModal={hiddenImagesModal}
                    handleSelectedImage={handleSelectedImage}
                />
            </Modal>
        </>
    )
}
