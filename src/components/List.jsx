import react, {useState, useEffect} from "react"
import {Link} from "react-router-dom"


const List = () => {

    const [company, setCompany] = useState([]);

        const fetchCompany = async () => {
        try {
            const response = await fetch('http://localhost:5000/getCompany', {
                method: "get",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log(data);
            setCompany(data)
        } catch (error) {
            console.log(error)
        }
        }

    useEffect(() => {
        fetchCompany()
    }, [])
    
    return (
        <div>
            <div className="flex justify-center items-center flex-col w-screen h-screen gap-y-8 bg-gradient-to-b from-[#FFFFFF] to-[#9BD7E6]">
                <h1 className="font-bold text-7xl text-[#23B6DF] text-center">Developer's Day 2024</h1>
            {/* add somethign here */}
                {company.map((company) => {
                console.log(company)
                return (
                    
                    <Link to={`/job/${company.id}`} key={company.id} className="border">
                        
                        <div className="w-[40vw] justify-center items-center">
                            <button type="submit"  className="w-full py-2 bg-white text-[#23B6DF]  text-3xl font-bold rounded-full hover:bg-gray-100">
                            {company.company}
                        {/* <h2>{company.location}</h2> */}
                            </button>
                        </div>
                    </Link>
                )
            })}
            </div>
        </div>
    )
}

export default List