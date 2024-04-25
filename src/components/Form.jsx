import react, { useState } from "react"
import { useParams, useLocation } from "react-router-dom";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from './ui/card'
import { useDropzone } from 'react-dropzone'

import { RxCross2 } from "react-icons/rx";

function UploadCloudIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
        </svg>
    )
}

const Form = () => {
    const { id } = useParams();
    // console.log(id)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const company = queryParams.get('company');
    const post = queryParams.get('post');

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/png, image/jpeg',
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0])
        },
    })

    const formData = {
        firstName: "",
        lastName: "",
        email: "",
        github: "",
        batch: 2021,
    }

    const errorData = {
        firstName: false,
        lastName: false,
        email: false,
        github: false,
        batch: false,
        file: false
    }

    const [form, setForm] = useState(formData)
    const [error, setError] = useState(errorData)

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })

        console.log(form)
    }

    const handlePost = async () => {
    if (form.firstName == "" || form.lastName == "" || form.email == "" || form.github == "" || form.batch == "") {
        alert("Please enter all fields");
        return;
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            firstName: form.firstName,	
            lastName: form.lastName,
            email: form.email,
            github: form.github,
            batch: form.batch,
            position: post,
            file: file
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });

    const responseData = await response.json();

    if (responseData.success) {
        alert("Success");
    } else {
        // Handle failure
    }
}



    return (
        <div className="flex justify-center item-center flex-col">
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" className="border" onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" className="border" onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" className="border" onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="github">github</label>
                <input type="text" id="github" className="border" onChange={handleChange} />
            </div>

            <div>
                <select name="batch" id="batch" onChange={handleChange}>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
            </div>


            <Card className="bg-gray-900 border-gray-700  md:w-4/6 m-5">
                <CardHeader>
                    <CardTitle className="text-[#23B6DF] mx-auto mb-3">
                        Upload Payment Receipt
                        <span className="text-red-700">
                            {error.file && ' *'}{' '}
                        </span>
                    </CardTitle>
                    <CardDescription>
                        Drag and drop your image or click the button below
                        to select file.
                    </CardDescription>
                </CardHeader>
                <CardContent
                    {...getRootProps()}
                    className={`flex flex-col items-center justify-center border-2 m-1  ${isDragActive
                            ? 'border-blue-500'
                            : 'border-zinc-500 dark:border-zinc-800'
                        } border-dashed rounded-lg space-y-3`}
                >
                    <input {...getInputProps()} />

                    {isDragActive ? (
                        <p className="text-blue-500">
                            Drop the file here...
                        </p>
                    ) : (
                        <>
                            <UploadCloudIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400 " />
                            <p className="text-gray-500 ">
                                Drag & drop image here, or click to
                                select image
                            </p>
                        </>
                    )}

                    {file && file.type && file.name && (
                        <div className="relative h-44 md:h-72 overflow-hidden round-md">
                            <img
                                src={
                                    file.type === 'application/pdf'
                                        ? URL.createObjectURL(file)
                                        : ''
                                }
                                alt={file.name}
                                className="rounded-lg"
                            />
                            <div
                                className="border absolute top-2 right-2 m-1 rounded-full p-2 z-1000"
                                style={{ transition: 'background-color 0.3s ease' }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2e4f7cdb')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    setFile(null)
                                }}
                            >
                                <RxCross2 className="text-white text-xl" />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
            <button type="submit" onClick={handlePost}>Upload</button>
        </div>
    )
}

export default Form