import { useEffect } from 'react';

import styled from '@emotion/styled';

import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

const modules = {
    toolbar: '#toolbar'
};

const formats = [
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'list', 'list',
    'link', "code-block", "video", "blockquote", "clean"
];

const colors = ['#000055', '#FF7600', '#222222', '#18222b', '#238633', '#0284c7']


export const QuillEditorLite = ({ placeholder, onEditorChange, content, label="Descripción" }) => {

    const { quill , quillRef } = useQuill({ modules, formats, placeholder })

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                // onEditorChange(quill.root.innerHTML)                
            })
        }
    }, [quill])


    useEffect(()=>{
        if(content){
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(content);
            }
        }
    },[quill])

    return (
        <>
            <p className="mb-2 font-bold">{ label }</p>
            <EditorContent>
                <div id="toolbar">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />

                    <select className="ql-color" defaultValue={"black"} onChange={e => e.persist()}>
                        <option value="black" />
                        <option value="white" />
                        {
                            colors.map( color => (<option key={color} value={color} />) )
                        }
                    </select>
                    <select className="ql-background" defaultValue={"black"} onChange={e => e.persist()}>
                        <option value="black" />
                        <option value="white" />
                        {
                            colors.map( color => (<option key={color} value={color} />) )
                        }
                    </select>

                    <select className="ql-align" defaultValue={""} onChange={e => e.persist()}>
                        <option value="" />
                        <option value="center" />
                        <option value="right" />
                        <option value="justify" />
                    </select>

                    <button className="ql-list" value="bullet" />
                    <button className="ql-list" value="ordered" />

                    <button className="ql-link" />
                    <button className="ql-code-block" />
                    <button className="ql-blockquote" />
                    <button className="ql-clean" />

                </div>
                <div ref={quillRef} />
                <div id="editors" />
            </EditorContent>
        </>
    )
}


const EditorContent = styled.div`
    width: 100%;
    height: 18rem;
    margin-bottom: 2rem;
    padding-bottom: 5rem;
    border-radius: 0.8rem;
    border: 1.5px solid rgba(229, 231, 235, 1);

    .ql-toolbar {
        border-radius: 0.8rem;
        border: none;
        border-bottom: 1.5px solid rgba(229, 231, 235, 1);
        background-color: rgb(250, 250, 255);
        padding-top: 1.2rem;
        padding-bottom: 1.2rem;
    }
    .ql-container{
        border: none;
        font-size: 1.6rem;
    }
    
    .ql-editor{
        line-height: 2.5rem;
    }

    .ql-editor::-webkit-scrollbar {
        -webkit-appearance: none;
    }

    .ql-editor::-webkit-scrollbar:vertical {
        width:8px;
    }

    .ql-editor::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button {
        display: none;
    } 

    .ql-editor::-webkit-scrollbar:horizontal {
        height: 8px;
    }

    .ql-editor::-webkit-scrollbar-thumb {
        background-color: #dbdbdb;
        border-radius: 20px;
        border: 2px solid #f1f2f3;
    }

    .ql-editor::-webkit-scrollbar-track {
        border-radius: 8px;  
    }
`