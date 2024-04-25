import react, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const List = () => {


    const [company, setCompany] = useState([]);


        const fetchCompany = async () => {
        try {
            const response = await fetch('https://api.acmdevday.com/getCompany', {
                method: "get",
                mode: 'no-cors',
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
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#9BD7E6] h-screen overflow-hidden border-0">
            <div className="w-full h-full border py-12">
                <div className="flex items-center flex-col w-screen h-full gap-y-8 overflow-y-auto">
                    <h1 className="font-bold text-7xl text-[#23B6DF] text-center">Developer's Day 2024</h1>
                    {/* add something here */}
                    {company.map((company) => {
                        return (
                            <Link to={`/job/${company.id}`} key={company.id} className="w-[40vw]">
                                <button type="submit" className="w-full py-2 bg-white text-[#23B6DF] text-3xl font-bold rounded-full hover:bg-gray-100">
                                    {company.company}
                                    {/* <h2>{company.location}</h2> */}
                                </button>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
    
}

export default List