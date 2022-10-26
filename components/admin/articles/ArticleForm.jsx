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
            <div>
                <div className="flex justify-center flex-wrap gap-10">
                    <SelectImage image='https://res.cloudinary.com/ton/image/upload/v1665207011/phgtovidqrjyajceejsh.jpg' />
                    <SelectImage />
                </div>
            </div>
        </div>
    )
}
