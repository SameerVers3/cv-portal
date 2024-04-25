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
            {/* add somethign here */}
            {Company.map((company) => {
                return (
                    <Link to={`/job/${company.id}`} key={company.id} className="border">
                        <h1>{company.name}</h1>
                        <h2>{company.location}</h2>
                    </Link>
                )
            })}
        </div>
    )
}

export default List