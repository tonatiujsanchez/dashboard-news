import { Fragment, useEffect, useMemo } from "react"
import { useData } from "../../../hooks/useData"
import { SelectCategories } from "./SelectCategories"



export const ArticleForm = () => {

    const {
        categories,
        refreshCategories,
    } = useData()


    const categoriesMemo = useMemo(() => {
        return (
            categories.filter(category => {
                category.subcategories = categories.filter(
                    subc => (subc.type === 'subcategory' && subc.category === category._id)
                )
                if (category.type === 'category') {
                    return category
                }
            })
        )
    }, [categories])

    useEffect(() => {
        console.log(categoriesMemo);
    }, [])


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
                <div className="flex items-end gap-2">
                    <label htmlFor="category" className="mb-1">Categoría</label>
                    <button
                        className="text-xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-2 px-2 rounded-full grid place-content-center active:scale-95"
                        onClick={() => refreshCategories()}>
                        <i className='bx bx-revision'></i>
                    </button>
                </div>
                <SelectCategories categories={categoriesMemo} />
                <div>
                    <p>Hola</p>
                    <p>Hola</p>
                    <p>Hola</p>
                    <p>Hola</p>
                    <p>Hola</p>
                </div>
            </div>
        </div>
    )
}
