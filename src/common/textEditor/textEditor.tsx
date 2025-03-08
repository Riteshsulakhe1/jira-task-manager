import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
    data: string;
    isViewMode?: boolean;
    onDataChange?: (data: string) => void;
}
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];
const TextEditor = ({ data, isViewMode, onDataChange }: TextEditorProps) => {

    return (
        <ReactQuill
            theme="snow"
            placeholder={'Enter description...'}
            readOnly={isViewMode}
            value={data}
            modules={{
                toolbar: toolbarOptions
            }}
            onChange={onDataChange}
        />
    );
};

export default TextEditor;