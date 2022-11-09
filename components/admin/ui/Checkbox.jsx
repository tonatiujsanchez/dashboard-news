import React from 'react'

export const Checkbox = ( {value, onCheckChange, label} ) => {


    return (
        <div className="flex flex-col items-start">
            <span className="font-medium text-gray-900 dark:text-gray-300 mb-2">{ label }</span>
            <div className="border p-2 rounded-lg flex items-center py-4 px-5">
                <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id="default-toggle"
                        value={value}
                        onChange={onCheckChange}
                        className="sr-only peer"
                        checked={value}
                    />
                    <div
                        className={`w-[6rem] h-12 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-11 after:w-11 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600`}
                    >
                    </div>
                </label>
            </div>
        </div>
    )
}
