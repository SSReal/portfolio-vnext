import Project from "./project";

function ProjectDisplay({ proj }: {
    proj: Project
}) {
    return (
        <div className="max-w-sm mx-5 my-10">
            <h1 className="text-white py-2 px-2 mb-2 text-xl font-bold bg-sky-500">[ {proj.title} ]</h1>
            <h2 className="px-2 font-bold text-sm pb-2">{proj.dateRange}</h2>
            <p className="px-4">{proj.description}</p>
            <div className = "py-2 px-2 font-semibold text-sm flex w-1/2 gap-3">
                {
                    (proj.githubLink) &&
                    <a href={proj.githubLink} target="_blank" rel="noreferrer">Github Repository</a>
                }
                {
                    (proj.demoLink) &&
                    <a href={proj.demoLink} target="_blank" rel="noreferrer">Live Demo</a>
                }
            </div>
            <hr />
        </div>
    )
}

export default ProjectDisplay;