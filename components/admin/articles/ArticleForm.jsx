import { useEffect, useState } from "react"

import slugify from "slugify"

import { useData } from "../../../hooks/useData"
import { SelectAuthors } from "./SelectAuthors"
import { SelectCategories } from "./SelectCategories"
import { SelectImage } from "./SelectImage"
import { QuillEditor } from "./QuillEditor"
import { QuillEditorLite } from "./QuillEditorLite"
import { Checkbox, DTPicker } from "../ui"
import { useRouter } from "next/router"



export const ArticleForm = ({ articleEdit = null }) => {

    
    const [contentEditor, setContentEditor] = useState(null)
    const { article, setArticle, createNewEntry } = useData()

    const  router = useRouter()

    // Starting article in provider
    useEffect(()=>{
        if(articleEdit){
            setArticle({ ...articleEdit })
            return
        }
        setArticle({
            ...article,
        })
    },[articleEdit])
    

    useEffect(()=>{

        if( !contentEditor ){ return }

        const desc = contentEditor.split('<p><br></p>')

        setArticle({
            ...article,
            content: contentEditor,
            description: desc[0] !== '' ? desc[0] : null
        })

    },[contentEditor])

    const handleSetName = ({ target }) => {
        const slug = slugify(target.value, { replacement: '-', lower: true })
        setArticle({
            ...article,
            title: target.value,
            slug
        })
    }

    const handleSetCategory = ( category, subcategory = null ) => {

        if( !category ){
            return
        }

        setArticle({
            ...article,
            category: {
                _id : category?._id,
                title : category?.title,
                slug : category?.slug,
                tag : category?.tag,
            },
            subcategory: subcategory 
                ? {
                    _id: subcategory?._id,
                    title: subcategory?.title,
                    slug: subcategory?.slug,
                    tag: subcategory?.tag,
                } 
                : null
        })
    }
    
    const handleSetAuthor = ( author ) => {
        setArticle({
            ...article,
            author: author ? {
                _id: author?._id,
                name: author?.name,
                slug: author?.slug,
                photo: author?.photo,
                occupation: author?.occupation,
            } : null
            
        })
    }

    const handleSetPublishedAt = ( dateTime ) => {
        setArticle({
            ...article,
            publishedAt: dateTime,
        })
    }
    
    const handleSetImagePrincipal = ( imageUrl ) => {
        setArticle({
            ...article,
            image: imageUrl
        })
    }

    const handleSetImageSocial = ( imageUrl ) => {

        setArticle({
            ...article,
            imageSocial: imageUrl
        })
    }

    const onEditorChange = ( html ) => {
        if(!html){ return }
        setContentEditor(html)
    }

    
    const handleSetSlug = ({ target }) => {
        const slug = slugify(target.value, { replacement: '-', lower: true })
        setArticle({
            ...article,
            slug
        })
    }

    const handleSetInFrontPage = () => {
        setArticle({
            ...article,
            inFrontPage: !article.inFrontPage
        })
    }


    // TODO: Save entry
    const saveEntry = () => {
        
    }


    const onCancelArticle = () => {
        setArticle(null)
        router.replace('/admin/articulos')
    }
    

    if( !article ){
        return <></>
    }

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
                    <SelectCategories
                        category={ article.category }
                        subcategory={ article.subcategory }
                        handleSelectCategory={handleSetCategory}
                    />
                    <SelectAuthors
                        author={ article.author }
                        handleSelectAuthor = { handleSetAuthor }
                    />
                    <DTPicker
                        value={article.publishedAt}
                        onChangePublishedAt={handleSetPublishedAt}
                        label="Fecha de publicación"
                    />
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
                <Checkbox 
                    value={article.inFrontPage} 
                    onCheckChange={handleSetInFrontPage}
                    label="Destacado"    
                />
            </div>
            {/* Buttons  */}
            <div className="flex items-center justify-between flex-col sm:flex-row mt-10">
                <button
                    onClick={ ()=> createNewEntry(false) }
                    className="border-2 border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500 font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors disabled:bg-sky-300 mb-10 sm:mb-0">
                    Guardar
                </button>
                <div className="flex items-center justify-center flex-col sm:flex-row w-full sm:w-auto gap-5 sm:gap-10">
                    <button
                        onClick={ onCancelArticle }
                        className="py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors bg-slate-100 hover:bg-slate-300">
                        Cancelar
                    </button>
                    <button
                        onClick={ ()=> createNewEntry(true) }
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors border-2 border-sky-500 hover:border-sky-600 disabled:bg-sky-300">
                        Guardar y publicar
                    </button>
                </div>
            </div>
        </div>
    )
}
