import { useEffect, useState } from "react"
import Image from "next/image"


export const SelectImage = ({ image = null }) => {

    const [showOptions, setShowOptions] = useState(false)
    const [photo, setPhoto] = useState(null)

    useEffect(()=>{
        console.log(image);
        if(image){
            setPhoto(image)
        }
    },[image])

    return (
        <div className={`rounded-lg w-full min-w-[320px] max-w-[400px]`}>
            <div className={`w-full rounded-lg mb-5 relative ${photo ? '' : 'px-40 border-2 border-dotted'}`}>
                <div className={`rounded-lg overflow-hidden h-72 relative w-full ${photo ? '' : 'opacity-40'}`}>
                    <Image
                        priority="true"
                        layout='fill'
                        blurDataURL={"/assets/admin/imgs/drop-image.png"}
                        placeholder="blur"
                        width={100}
                        height={70}
                        objectFit="cover"
                        src={photo || "/assets/admin/imgs/drop-image.png"}
                        alt={'Imagen para el artículo'}
                        title={'Imagen para el artículo'}
                    />
                </div>
                <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="flex justify-center items-center absolute right-[-10px] bottom-[-10px] text-3xl bg-admin text-sky-700 py-2 px-2 rounded-full shadow border hover:bg-sky-600 hover:text-white hover:border-sky-600">
                    <i className='bx bxs-camera'></i>
                </button>
                {
                    showOptions &&
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                        <div className="py-2" role="none">
                            <button
                                // onClick={openImagesModal}
                                className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-3 text-xl hover:bg-gray-100 hover:text-gray-900">
                                <i className='bx bx-image-alt text-3xl'></i>
                                <span>Actualizar foto</span>
                            </button>
                            <button
                                // onClick={removePhoto}
                                className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-3 text-xl hover:bg-gray-100 hover:text-gray-900">
                                <i className='bx bx-trash text-red-600 text-3xl'></i>
                                <span>Quitar foto</span>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
