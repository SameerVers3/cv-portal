import react from "react"
import {Link} from "react-router-dom"
const Company = [
    {
        id: "1",
        name: "Google",
        location: "USA",

    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    }


]

const List = () => {
    return (
        <div>
            <div className="flex justify-center items-center flex-col w-screen h-screen gap-y-8 bg-gradient-to-b from-[#FFFFFF] to-[#9BD7E6]">
                <h1 className="font-bold text-7xl text-[#23B6DF] text-center">Developer's Day 2024</h1>
            {/* add somethign here */}
            {Company.map((company) => {
                return (
                    
                    <Link to={`/job/${company.id}`} key={company.id} className="border">
                        
                        <div className="w-[40vw] justify-center items-center">
                            <button type="submit"  className="w-full py-2 bg-white text-[#23B6DF]  text-3xl font-bold rounded-full hover:bg-gray-100">
                            {company.name}
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