import {Project} from "./homeProps";

function ProjectDisplay({ proj }: {
    proj: Project
}) {
    return (
        <div className="flex text-white flex-col bg-slate-800 overflow-hidden rounded-xl justify-start max-w-xs md:max-w-md mx-5 my-10 flex-grow-0 flex-shrink-0 hover:scale-105 transition-transform">
            <h1 className="text-white py-4 px-2 mb-2 text-xl font-bold bg-sky-700">[ {proj.title} ]</h1>
            <h2 className="px-4 font-bold text-sm py-3">{proj.dateRange}</h2>
            <p className="px-6 py-2">{proj.description}</p>
            <div className = "py-3 px-4 font-semibold text-sm flex gap-10">
                {
                    (proj.githubLink) &&
                    <a href={proj.githubLink} target="_blank" rel="noreferrer">Github Repository</a>
                }
                {
                    (proj.demoLink) &&
                    <a href={proj.demoLink} target="_blank" rel="noreferrer">Live Demo</a>
                }
            </div>
        </div>
    )
}

export default ProjectDisplay;