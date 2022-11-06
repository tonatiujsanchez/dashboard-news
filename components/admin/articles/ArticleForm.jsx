import { useState } from "react"

import slugify from "slugify"

import { useData } from "../../../hooks/useData"
import { SelectAuthors } from "./SelectAuthors"
import { SelectCategories } from "./SelectCategories"
import { SelectImage } from "./SelectImage"
import { QuillEditor } from "./QuillEditor"



export const ArticleForm = () => {

    
    const { article, setArticle, createNewEntry } = useData()

    const [content, setContent] = useState("")

    const handleSetName = ({ target }) => {
        const slug = slugify(target.value, { replacement: '-', lower: true })
        setArticle({
            ...article,
            title: target.value,
            slug
        })
    }
    
    const handleSetSlug = ({ target }) => {
        const slug = slugify(target.value, { replacement: '-', lower: true })
        setArticle({
            ...article,
            slug
        })
    }

    const handleSetImagePrincipal = (imageUrl) => {
        setArticle({
            ...article,
            image: imageUrl
        })
    }

    const handleSetImageSocial = (imageUrl) => {
        setArticle({
            ...article,
            imageSocial: imageUrl
        })
    }

    // Quill-Editor methods
    const onEditorChange = ( html ) => {
        setArticle({
            ...article,
            content: html
        })
    }





    return (
        <div className="bg-white p-5 sm:p-10 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <label htmlFor="title" className="mb-1">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={article.title}
                        onChange={handleSetName}
                        className="bg-admin rounded-md border p-5" />
                </div>
                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <label htmlFor="slug" className="mb-1">Url</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={article.slug}
                        onChange={handleSetSlug}
                        className="bg-admin rounded-md border p-5 text-slate-400 focus:text-black" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-20 sm:items-start">
                <div className="flex-1 flex flex-col gap-4 mb-4 sm:order-2">
                    <SelectCategories />
                    <SelectAuthors />
                </div>
                <div className="flex-1 mb-4 sm:order-1">
                    <div className="flex justify-center flex-col sm:flex-row gap-10">
                        <SelectImage
                            image={article.image}
                            label="Foto principal"
                            heightContentImage='h-64'
                            handleSetImage={handleSetImagePrincipal}
                        />
                        <SelectImage
                            image={article.imageSocial} 
                            heightContentImage='h-56'
                            label="Redes sociales"
                            handleSetImage={handleSetImageSocial}
                        />
                    </div>
                </div>
            </div>
            <div className="">
                <QuillEditor
                    placeholder={"Contenido del artículo"}
                    onEditorChange={onEditorChange}
                    content={ article.content }
                />    
            </div>
            {/* Buttons  */}
            <div className="flex items-center justify-between flex-col sm:flex-row mt-10">
                <button
                    // onClick={ createNewEntry }
                    // disabled={!imageSelected}
                    className="border-2 border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500 font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors disabled:bg-sky-300 mb-10 sm:mb-0">
                    Guardar
                </button>
                <div className="flex items-center justify-center flex-col sm:flex-row w-full sm:w-auto gap-5 sm:gap-10">
                    <button
                        onClick={()=> console.log('Cancelado...') }
                        className="py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors bg-slate-100 hover:bg-slate-300">
                        Cancelar
                    </button>
                    <button
                        onClick={ createNewEntry }
                        // disabled={!imageSelected}
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors border-2 border-sky-500 hover:border-sky-600 disabled:bg-sky-300">
                        Guardar y publicar
                    </button>
                </div>
            </div>
        </div>
    )
}
