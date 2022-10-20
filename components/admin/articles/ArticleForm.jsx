import { Fragment, useEffect, useMemo, useState } from "react"
import { useData } from "../../../hooks/useData"
import { SelectCategories } from "./SelectCategories"



export const ArticleForm = () => {

    const { article, setArticle } = useData()



    return (
        <div className="bg-white p-5 sm:p-10 rounded-xl">
            <div className="flex flex-col gap-2 mb-4 w-full">
                <label htmlFor="title" className="mb-1">Título</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="bg-admin rounded-md flex-1 border p-5" />
            </div>
            <div className="flex flex-col gap-2 mb-4 w-full">
                <SelectCategories />
            </div>
            <div>
                <p>Hola</p>
                <p>Hola</p>
                <p>Hola</p>
                <p>Hola</p>
                <p>Hola</p>
            </div>
        </div>
    )
}
