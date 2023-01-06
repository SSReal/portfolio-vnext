interface Link {
    type: string,
    link: string
}

interface Project {
    title: string,
    description: string,
    dateRange?: string,
    demoLink?: string,
    githubLink?: string
}

interface Experience {
    title: string,
    company: string,
    description: string, 
    dateRange: string
}

interface Contact {
    phone?: string,
    email: string,
    location?: string,
}

interface HomeProps {
    name: string, 
    shortDesignation: string,
    designationLine: string,
    links: Link[],
    description: string,
    profilePhotoPath?: string,
    skills: string[],
    projects: Project[],
    experience :Experience[],
    contact?: Contact,
}

export default HomeProps;

export type {Project, Experience};

