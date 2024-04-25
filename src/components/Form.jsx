import react, { useState, useEffect } from "react"
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

    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const response = await fetch('https://api.acmdevday.com/position', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors',
                body: JSON.stringify({ id: id })
            })
            const data = await response.json()
            console.log(data);
            setJobs(data.jobs)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

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
        linkedin: "",
        jobs: "",
        batch: 2021,
    }

    const errorData = {
        firstName: false,
        lastName: false,
        email: false,
        github: false,
        linkedin: false,
        batch: false,
        job: false,
        file: false
    }

    const [form, setForm] = useState(formData)
    const [error, setError] = useState(errorData)
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })

        console.log(form)
    }

    const handlePost = async () => {
        console.log(form)
        console.log(id)
    if (form.firstName == "" || form.lastName == "" || form.email == "" || form.github == "" || form.batch == "" || form.linkedin == "" || file == "" || form.jobs == "") {
        alert("Please enter all fields");
        return;
    }
        setLoading(true)
        try {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = async () => {
                const base64Image = reader.result
                const base64 = base64Image

                setLoading(true)
                
                const response = await fetch('https://api.acmdevday.com/apply', {
                    method: 'POST',
                    body: JSON.stringify({
                        firstName: form.firstName,	
                        lastName: form.lastName,
                        email: form.email,
                        github: form.github,
                        batch: form.batch,
                        linkedin: form.linkedin,
                        position: post,
                        file: base64,
                        company: id
                    }),
                    mode: 'no-cors',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                });

                
                const responseData = await response.json();
                
                if (responseData.success) {
                    alert("Submitted Successfully");
                }
                else {
                    alert("Error in submitting form, Please try again");
                }
            }
        } catch (error) {
            atert('Error is Submitting form, Please try again')
        } finally {
            setLoading(false)
        }

}



    return (
        // <div className="flex justify-center align-center mt-20">
        // <div className="flex justify-center item-center flex-col gap-y-8">
            
        //     <div className="flex justify-evenly align-center">
        //         <label htmlFor="firstName" className="text-2xl font-extrabold">First Name</label>
        //         <input type="text" id="firstName" className="border" onChange={handleChange} placeholder="First Name"/>
        //     </div>

        //     <div className="flex justify-evenly align-center">
        //         <label htmlFor="lastName" className="text-2xl font-extrabold">Last Name</label>
        //         <input type="text" id="lastName" className="border rounded-full" onChange={handleChange} placeholder="Last Name"/>
        //     </div>

        //     <div className="flex justify-evenly align-center">
        //         <label htmlFor="email" className="text-2xl font-extrabold">Email</label>
        //         <input type="text" id="email" className="border rounded-full" onChange={handleChange} placeholder="Email"/>
        //     </div>

        //     <div className="flex justify-evenly align-center">
        //         <label htmlFor="github" className="text-2xl font-extrabold ">Github</label>
        //         <input type="text" id="github" className="border rounded-full" onChange={handleChange} placeholder="Github"/>
        //     </div>

        //     <div className="flex justify-evenly align-center">
        //         <select name="batch" id="batch" onChange={handleChange} className="">
        //             <option value="2019">2019</option>
        //             <option value="2020">2020</option>
        //             <option value="2021">2021</option>
        //             <option value="2022">2022</option>
        //             <option value="2023">2023</option>
        //         </select>
        //     </div>
        //     <div className="w-screen flex justify-center align-center relative">
        //     <Card className="bg-gray-900 border-gray-700  md:w-4/6 m-5">
        //         <CardHeader>
        //             <CardTitle className="text-[#23B6DF] mx-auto mb-3">
        //                 Upload Payment Receipt
        //                 <span className="text-red-700">
        //                     {error.file && ' *'}{' '}
        //                 </span>
        //             </CardTitle>
        //             <CardDescription>
        //                 Drag and drop your image or click the button below
        //                 to select file.
        //             </CardDescription>
        //         </CardHeader>
        //         <CardContent
        //             {...getRootProps()}
        //             className={`flex flex-col items-center justify-center border-2 m-1  ${isDragActive
        //                     ? 'border-blue-500'
        //                     : 'border-zinc-500 dark:border-zinc-800'
        //                 } border-dashed rounded-lg space-y-3`}
        //         >
        //             <input {...getInputProps()} />

        //             {isDragActive ? (
        //                 <p className="text-blue-500">
        //                     Drop the file here...
        //                 </p>
        //             ) : (
        //                 <>
        //                     <UploadCloudIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400 " />
        //                     <p className="text-gray-500 ">
        //                         Drag & drop image here, or click to
        //                         select image
        //                     </p>
        //                 </>
        //             )}

        //             {file && file.type && file.name && (
        //                 <div className="relative h-44 md:h-72 overflow-hidden round-md">
        //                     <img
        //                         src={
        //                             file.type === 'application/pdf'
        //                                 ? URL.createObjectURL(file)
        //                                 : ''
        //                         }
        //                         alt={file.name}
        //                         className="rounded-lg"
        //                     />
        //                     <div
        //                         className="border absolute top-2 right-2 m-1 rounded-full p-2 z-1000"
        //                         style={{ transition: 'background-color 0.3s ease' }}
        //                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2e4f7cdb')}
        //                         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        //                         onClick={(e) => {
        //                             e.stopPropagation()
        //                             e.preventDefault()
        //                             setFile(null)
        //                         }}
        //                     >
        //                         <RxCross2 className="text-white text-xl" />
        //                     </div>
        //                 </div>
        //             )}
        //         </CardContent>
        //     </Card>
        //     </div>
        //     <button type="submit" onClick={handlePost}>Upload</button>


            




        // </div>
        // </div>

        <div className="flex justify-center mt-20 bg-gradient-to-b from-[#FFFFFF] to-[#9BD7E6] overflow-hidden">
    <div className="flex flex-col gap-y-8  items-center justify-center">
    <h1 className="font-bold text-7xl text-[#23B6DF] text-center">Developer's Day 2024</h1>
    <h2 className="font-bold text-5xl text-[#23B6DF] text-center">CV Portal</h2>
        <div className="flex flex-col gap-y-8 w-[80vw] ">
        <div className="flex flex-col gap-y-3">
            <label htmlFor="firstName" className="text-2xl font-extrabold pl-2">First Name</label>
            <input type="text" id="firstName" className="border rounded-full pl-4 py-4" onChange={handleChange} placeholder="First Name" />
        </div>

        <div className="flex flex-col gap-y-3">
            <label htmlFor="lastName" className="text-2xl font-extrabold pl-2">Last Name</label>
            <input type="text" id="lastName" className="border rounded-full pl-4 py-4" onChange={handleChange} placeholder="Last Name"/>
        </div>

        <div className="flex flex-col gap-y-3">
            <label htmlFor="email" className="text-2xl font-extrabold pl-2">Email</label>
            <input type="text" id="email" className="border rounded-full pl-4 py-4" onChange={handleChange} placeholder="Email"/>
        </div>

        <div className="flex flex-col gap-y-3">
            <label htmlFor="github" className="text-2xl font-extrabold pl-2">Github</label>
            <input type="text" id="github" className="border rounded-full pl-4 py-4" onChange={handleChange} placeholder="Github"/>
        </div>
        
        <div className="flex flex-col gap-y-3">
            <label htmlFor="linkedin" className="text-2xl font-extrabold pl-2">LinkedIn</label>
            <input type="text" id="linkedin" className="border rounded-full pl-4 py-4" onChange={handleChange} placeholder="LinkedIn"/>
        </div>

        <div className="flex flex-col gap-y-3">
            <label htmlFor="batch" className="text-2xl font-extrabold pl-2">Batch</label>
            <select name="batch" id="batch" onChange={handleChange} className="border rounded-full pl-4 py-4">
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
            </select>
        </div>

        <div className="flex flex-col gap-y-3">
            <label htmlFor="jobs" className="text-2xl font-extrabold pl-2">Available Position</label>
                    <select name="jobs" id="jobs" onChange={handleChange} className="border rounded-full pl-4 py-4">
                        {jobs.map((job) => (
                            <option value={job}>{job}</option>
                        ))}
                    </select>
        </div>
        </div>



        <div className="w-screen">
            <div className="w-full flex justify-center ">
            <div className=" md:w-4/6 m-5 |">
                <div className="text-[#23B6DF] mx-auto mb-3">
                    <h2 className="text-2xl font-extrabold">Upload Your CV</h2>
                    <span className="text-red-700">{error.file && ' *'}</span>
                </div>
                <div className="text-black-500 p-3">
                    Drag and drop your CV or click the button below to select file.
                </div>
                <div
                    {...getRootProps()}
                    className={`flex flex-col items-center justify-center border-2 m-1 ${isDragActive ? 'border-blue-500' : 'border-zinc-500 dark:border-zinc-800'} border-dashed rounded-lg space-y-3`}
                >
                    <input {...getInputProps()} />

                    {isDragActive ? (
                        <p className="text-blue-500">Drop the file here...</p>
                    ) : (
                        <>
                            <UploadCloudIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
                            <p className="text-gray-500">
                                Drag & drop CV here
                            </p>
                        </>
                    )}

                    {file && file.type && file.name && (
                        <div className="relative h-44 md:h-72 overflow-hidden round-md">
                            <img
                                src={
                                    file.type === 'application/pdf' ? URL.createObjectURL(file) : ''
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
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setFile(null);
                                }}
                            >
                                <RxCross2 className="text-white text-xl" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
        <div className="w-[40vw] justify-center items-center mb-12">
        <button type="submit" onClick={handlePost} className="w-full py-2 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600">
            Upload
        </button>
        </div>
        <div className="text-align pb-8 text-white text-xl font-semibold">
            <p>Made by Owais Rafiq, Sameer Ahmed, Syed M.Fasih and Abdullah Azhar Khan</p>
        </div>
    </div>
</div>

    )
}

export default Form