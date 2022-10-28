import { Fragment, useEffect, useMemo, useState } from "react"

import slugify from "slugify"

import { useData } from "../../../hooks/useData"
import { SelectAuthors } from "./SelectAuthors"
import { SelectCategories } from "./SelectCategories"
import { SelectImage } from "./SelectImage"



export const ArticleForm = () => {

    const { article, setArticle } = useData()

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
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <SelectCategories />
                <SelectAuthors />
            </div>
            <div className="mb-4">
                <div className="flex justify-center flex-wrap gap-10">
                    <SelectImage
                        image={article.image}
                        label="Foto principal"
                        heightContentImage='h-80'
                        handleSetImage={handleSetImagePrincipal}
                    />
                    <SelectImage
                        image={article.imageSocial} 
                        heightContentImage='h-72'
                        label="Redes sociales"
                        handleSetImage={handleSetImageSocial}
                    />
                </div>
            </div>
        </div>
    )
}
