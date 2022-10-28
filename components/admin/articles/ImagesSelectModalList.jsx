import { useState } from "react"
import Image from "next/image"


export const ImagesSelectModalList = ({ images, imageSelected, setImageSelected }) => {


    const selectImage = (image) => {

        if (image?._id === imageSelected?._id) {
            setImageSelected(null)
            return
        }

        setImageSelected(image)
    }


    return (
        <div>
            <div className="flex flex-wrap gap-x-4 gap-y-8 pb-16">
                {
                    images.map(image => {
                        return (
                            <div
                                key={image._id}
                                onClick={() => selectImage(image)}
                                className={`relative w-[48%] sm:w-[165px] cursor-pointer ${imageSelected && imageSelected._id === image._id ? 'opacity-30' : ''}`}
                            >
                                <div className="rounded-lg overflow-hidden border">
                                    <Image
                                        priority="true"
                                        layout='responsive'
                                        blurDataURL={image.url}
                                        placeholder="blur"
                                        width={100}
                                        height={70}
                                        objectFit="cover"
                                        src={image.url}
                                        alt={`Imagen ${image.name}`}
                                        title={`Imagen ${image.name}`}
                                    />
                                    <div className="pl-2 py-3">
                                        <p className="font-bold text-xl">{image.name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
