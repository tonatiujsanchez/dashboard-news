import { useEffect, useState } from "react"

import slugify from "slugify"

import { useData } from "../../../hooks/useData"
import { SelectAuthors } from "./SelectAuthors"
import { SelectCategories } from "./SelectCategories"
import { SelectImage } from "./SelectImage"
import { QuillEditor } from "./QuillEditor"
import { QuillEditorLite } from "./QuillEditorLite"



export const ArticleForm = () => {

    
    const { article, setArticle, createNewEntry } = useData()
    const [inFrontPage, setInFrontPage] = useState(true)


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


    const handleSetDescripction = ( html ) => {
        setArticle({
            ...article,
            description: html
        })
    }

    // Quill-Editor methods
    const onEditorChange = ( html ) => {
        setArticle({
            ...article,
            content: html
        })
    }
    
    // TODO: implementar el funcionamiento del Checkbox
    const handleSetInFrontPage = () => {
        setArticle({
            ...article,
            inFrontPage: !article.inFrontPage
        })
    }

    useEffect(()=>{
        console.log(article);
    },[article])




    return (
        <div className="bg-white p-5 sm:p-10 rounded-xl">
            <div className="flex flex-col gap-2 mb-4 sm:mb-10">
                <label htmlFor="title" className="mb-1 font-medium">Título</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={article.title}
                    onChange={handleSetName}
                    className="bg-admin rounded-md border p-5" />
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-20 sm:items-start mb-4 sm:mb-10">
                <div className="flex-1 flex flex-col gap-4 mb-4 sm:order-2">
                    <SelectCategories />
                    <SelectAuthors />
                </div>
                <div className="flex-1 mb-4 sm:order-1">
                    <div className="flex justify-center flex-col sm:flex-row gap-5 sm:gap-10">
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
            <div>
                {/* <QuillEditorLite
                    placeholder={"Resumen del artículo"}
                    onEditorChange={handleSetDescripction}
                    content={ article.description }
                    label='Resúmen'
                />     */}
            </div>
            <div className="mb-4 sm:mb-10">
                <QuillEditor
                    placeholder={"Contenido del artículo"}
                    onEditorChange={onEditorChange}
                    content={ article.content }
                    label="Contenido del artículo"
                />    
            </div>
            <div className="flex items-start gap-4">
                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <label htmlFor="slug" className="mb-1 font-medium">Url</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={article.slug}
                        onChange={handleSetSlug}
                        className="bg-admin rounded-md border p-5 text-slate-400 focus:text-black"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <span className="ml-3 font-medium text-gray-900 dark:text-gray-300 mb-4">Destacado</span>
                    <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            id="default-toggle" 
                            value={article.inFrontPage ? article.inFrontPage : true }
                            onChange={handleSetInFrontPage} 
                            className="sr-only peer"
                        />
                        <div className={`w-[6rem] h-12 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-11 after:w-11 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                        >
                        </div>
                    </label>
                </div>
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
