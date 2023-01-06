import Experience from "./experience";

function ExpDisplay({ exp }: {
    exp: Experience
}) {
    return (
        <div className="flex flex-col bg-white overflow-hidden rounded-xl justify-start max-w-sm sm:mx-5 my-10 flex-grow-0 flex-shrink-0 hover:scale-105 transition-transform">
            <h1 className=" text-white py-4 px-2 mb-2 text-xl font-bold bg-sky-500"> {exp.title}</h1>
            <h2 className="px-2 mb-2 text-md italic"> {exp.company}</h2>
            <h2 className="px-4 font-bold text-sm py-3">{exp.dateRange}</h2>
            <p className="px-6 py-2 pb-10">{exp.description}</p>
        </div>
    )
}

export default ExpDisplay;