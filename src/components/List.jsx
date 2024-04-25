import react from "react"

const Company =[
        {
        id: "something",
        name: "Google",
        location: "USA",

    },
    {
        id: "hello worn",
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
                    <a href={`\\job\\${company.id}`} key={company.id} className="border">
                        <h1>{company.name}</h1>
                        <h2>{company.location}</h2>
                    </a>
                )
            })}
        </div>
    )
}

export default List