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
    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    },
    {
        id: "2",
        name: "Facebook",
        location: "USA",
    },

]

const List = () => {
    // return (
    //     <div className="bg-gradient-to-b from-[#FFFFFF] to-[#9BD7E6]  my-8">
    //     <div className="w-full h-full border">
    //         <div className="flex justify-center items-center flex-col w-screen h-screen gap-y-8 ">
    //             <h1 className="font-bold text-7xl text-[#23B6DF] text-center">Developer's Day 2024</h1>
    //         {/* add somethign here */}
    //         {Company.map((company) => {
    //             return (
                    
    //                 <Link to={`/job/${company.id}`} key={company.id} className="">
                        
    //                     <div className="w-[40vw] justify-center items-center">
    //                         <button type="submit"  className="w-full py-2 bg-white text-[#23B6DF]  text-3xl font-bold rounded-full hover:bg-gray-100">
    //                         {company.name}
    //                     {/* <h2>{company.location}</h2> */}
    //                         </button>
    //                     </div>
    //                 </Link>
    //             )
    //         })}
    //         </div>
    //     </div>
    //     </div>
    // )
    return (
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#9BD7E6] h-screen overflow-hidden border-0">
            <div className="w-full h-full border py-12">
                <div className="flex items-center flex-col w-screen h-full gap-y-8 overflow-y-auto">
                    <h1 className="font-bold text-7xl text-[#23B6DF] text-center">Developer's Day 2024</h1>
                    {/* add something here */}
                    {Company.map((company) => {
                        return (
                            <Link to={`/job/${company.id}`} key={company.id} className="w-[40vw]">
                                <button type="submit" className="w-full py-2 bg-white text-[#23B6DF] text-3xl font-bold rounded-full hover:bg-gray-100">
                                    {company.name}
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