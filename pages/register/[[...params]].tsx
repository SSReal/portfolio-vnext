import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import HomeProps, { Contact, Experience, Project } from "../../components/homeProps";
import profilePhoto from "../../public/profile.jpg";

import { getLinkIcon, getSkillIcon } from "../../data/utils";
import { AiFillDelete } from "react-icons/ai";
import { CgScrollH } from "react-icons/cg";
import ProjectDisplay from "../../components/ProjectDisplay";
import ExpDisplay from "../../components/ExperienceDisplay";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdCheckCircle, MdEmail } from "react-icons/md";
import { ImLocation } from "react-icons/im";

import loader from "../../public/loader.gif";

const defaultProject: Project = {
    title: "",
    description: "",
    dateRange: "",
    githubLink: "",
    demoLink: ""
}

const defaultExp: Experience = {
    title: "",
    company: "",
    description: "",
    dateRange: ""
}

const defaultContact: Contact = {
    phone: "",
    email: "",
    location: ""
}

const defaultRegData: HomeProps = {
    name: "",
    username: "",
    shortDesignation: "",
    designationLine: "",
    links: [],
    skills: [],
    projects: [],
    experience: [],
    description: "",
    contact: defaultContact
}

function showAlert(q: string) {
    alert(`${q} is mandatory, please enter it!`);
}

function Register() {
    async function submitFormHandler(e: any) {
        setIsLoading(true);
        const finalData = regData;

        if (regData.name === "") {
            showAlert("Name");
            setIsLoading(false);
            return;
        }
        else if (regData.username === "") {
            showAlert("Username");
            setIsLoading(false);
            return;
        }
        else if (regData.shortDesignation === "") {
            showAlert("Short Designation");
            setIsLoading(false);
            return;
        }
        else if (regData.designationLine === "") {
            showAlert("Designation Line");
            setIsLoading(false);
            return;
        }
        else if (regData.description === "") {
            showAlert("Description");
            setIsLoading(false);
            return;
        }

        if (finalData.contact) {
            if (finalData.contact.email === "" && finalData.contact.phone === "" && finalData.contact.location === "") {
                //entire contact section is left
                finalData.contact = undefined;
            }
            else if (finalData.contact.email === "") {
                alert("Email is mandatory for contact section, otherwise remove all entries from contact section");
                setIsLoading(false);
                return;
            }
            else {
                if (finalData.contact.phone === "") {
                    finalData.contact.phone = undefined;
                }
                if (finalData.contact.location === "") {
                    finalData.contact.location = undefined;
                }
            }
        }
        const userStr = JSON.stringify(finalData)
        console.log(userStr);
        const res = await fetch('/api/profile/create', {
            method: "POST",
            body: JSON.stringify(finalData)
        })

        if (res.status === 403) {
            //user already exists
            alert("This username already exists, please use another one");
            setIsLoading(false);
            return;
        }
        else if (res.status !== 200) {
            //some error
            alert("Something went wrong, please check the input and try again some time later");
            setIsLoading(false);
            return;
        }
        else {
            //ok
            alert(`User ${finalData.username} created successfully, redirecting to your portfolio`);
            await router.push(`/../${finalData.username}`);
            setIsLoading(false);
        }
    }

    function auto_height(e: any) {
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }

    function onChangeHandler(e: any) {

        if (e.target.name === "name") {
            setRegData({
                ...regData,
                name: e.target.value
            })
        }
        else if (e.target.name === "username") {
            setRegData({
                ...regData,
                username: e.target.value
            })
        }
        else if (e.target.name === "shortDesignation") {
            setRegData({
                ...regData,
                shortDesignation: e.target.value
            })
        }
        else if (e.target.name === "designationLine") {
            setRegData({
                ...regData,
                designationLine: e.target.value
            })
        }
        else if (e.target.name === "newSocialLink") {
            setNewSocialLink(e.target.value)
        }
        else if (e.target.name === "socialType") {
            setSocialType(e.target.value);
        }
        else if (e.target.name === "description") {
            setRegData({
                ...regData,
                description: e.target.value
            })
        }
        else if (e.target.name === "newSkill") {
            setNewSkill(e.target.value);
        }
        else if (e.target.name === "newProjectTitle") {
            setNewProject({
                ...newProject,
                title: e.target.value
            })
        }
        else if (e.target.name === "newProjectDescription") {
            setNewProject({
                ...newProject,
                description: e.target.value
            })
        }
        else if (e.target.name === "newProjectDateRange") {
            setNewProject({
                ...newProject,
                dateRange: e.target.value
            })
        }
        else if (e.target.name === "newProjectGithubLink") {
            setNewProject({
                ...newProject,
                githubLink: e.target.value
            })
        }
        else if (e.target.name === "newProjectDemoLink") {
            setNewProject({
                ...newProject,
                demoLink: e.target.value
            })
        }
        else if (e.target.name === "newExpTitle") {
            setNewExp({
                ...newExp,
                title: e.target.value
            })
        }
        else if (e.target.name === "newExpCompany") {
            setNewExp({
                ...newExp,
                company: e.target.value
            })
        }
        else if (e.target.name === "newExpDescription") {
            setNewExp({
                ...newExp,
                description: e.target.value
            })
        }
        else if (e.target.name === "newExpDateRange") {
            setNewExp({
                ...newExp,
                dateRange: e.target.value
            })
        }
        else if (e.target.name === "phone") {
            setRegData({
                ...regData,
                contact: {
                    ...regData.contact,
                    email: regData.contact?.email || "",
                    phone: e.target.value || "",
                }
            })
        }
        else if (e.target.name === "email") {
            setRegData({
                ...regData,
                contact: {
                    ...regData.contact,
                    email: e.target.value
                }
            })
        }
        else if (e.target.name === "location") {
            setRegData({
                ...regData,
                contact: {
                    ...regData.contact,
                    email: regData.contact?.email || "",
                    location: e.target.value || ""
                }
            })
        }
    }
    const [regData, setRegData] = useState(defaultRegData);
    const [newSocialLink, setNewSocialLink] = useState("");
    const [socialType, setSocialType] = useState("select");
    const [newSkill, setNewSkill] = useState("select");
    const [newProject, setNewProject] = useState(defaultProject);
    const [newExp, setNewExp] = useState(defaultExp);

    const router = useRouter();

    useEffect(() => {
        if(router.query.params?.length === 1) {
            //username given
            setRegData((reg) => {return {
                ...reg,
                username: router.query.params && router.query.params[0] || ""
            }})
        }
    }, [router.query.params])

    function addSocialLink() {
        if (newSocialLink === "") {
            alert("Please type in the link!");
            return;
        }
        else if (socialType === "select") {
            alert("Please select the type of link!");
        }
        setRegData({
            ...regData,
            links: [
                ...regData.links,
                {
                    type: socialType,
                    link: newSocialLink
                }]
        })
        setNewSocialLink("");
        setSocialType("select");
    }

    function deleteSocialLink(i: number) {
        setRegData({
            ...regData,
            links: regData.links.filter((val, idx) => idx != i)
        })
    }

    function addSkill() {
        if (newSkill === "") {
            alert("add skill string!");
            return;
        }
        setRegData({
            ...regData,
            skills: [
                ...regData.skills,
                newSkill
            ]
        })
        setNewSkill("select");
    }

    function deleteSkill(i: number) {
        setRegData({
            ...regData,
            skills: regData.skills.filter((val, idx) => idx != i)
        })
    }

    function addProject() {
        if (newProject.title === "") {
            alert("Please enter the title!");
            return;
        }
        else if (newProject.description === "") {
            alert("Pleasae enter the description!");
            return;
        }
        const proj: Project = {
            title: newProject.title,
            description: newProject.description
        }
        if (newProject.dateRange != "") {
            proj.dateRange = newProject.dateRange
        }
        if (newProject.githubLink != "") {
            proj.githubLink = newProject.githubLink
        }
        if (newProject.demoLink != "") {
            proj.demoLink = newProject.demoLink
        }
        setRegData({
            ...regData,
            projects: [
                ...regData.projects,
                proj
            ]
        })
        setNewProject(defaultProject);
    }

    function deleteProject(i: number) {
        setRegData({
            ...regData,
            projects: regData.projects.filter((val, idx) => idx != i)
        })
    }

    function addExp() {
        if (newExp.title === "") {
            alert("Please enter title!");
            return;
        }
        else if (newExp.company === "") {
            alert("Please enter company!");
            return;
        }
        else if (newExp.description === "") {
            alert("Please enter description!");
            return;
        }
        else if (newExp.dateRange === "") {
            alert("Please enter dateRange!");
            return;
        }

        setRegData({
            ...regData,
            experience: [
                ...regData.experience,
                newExp
            ]
        })
        setNewExp(defaultExp);
    }

    function deleteExp(i: number) {
        setRegData({
            ...regData,
            experience: regData.experience.filter((val, idx) => idx != i)
        })
    }

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            {
                (isLoading) &&
                <div className="fixed bg-opacity-40 bg-slate-600 font-semibold w-screen h-screen flex items-center">
                    <Image className="mx-auto opacity-60" src={loader} alt="loading" />
                </div>
            }
            {(regData.name !== "" && regData.shortDesignation !== "") &&
                (<Head>
                    <meta property="description" content={`Portfolio of ${regData.name}`} />
                    <title>{`${regData.name} | ${regData.shortDesignation}`}</title>
                </Head>) ||
                (<Head>
                    <title>Make your own Portfolio</title>
                </Head>)
            }
            <main>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input name="username" type="text" onChange={onChangeHandler} value={regData.username} />
                    <br />
                    <label htmlFor="shortDesignation">Short Designation Line</label>
                    <input name="shortDesignation" onChange={onChangeHandler} value={regData.shortDesignation} />
                    <section>
                        <div className="py-10 text-center mx-auto">
                            <div className="w-full mx-auto">
                                <input name="name" type="text" onChange={onChangeHandler} value={regData.name} />
                                <h1 className="text-5xl pb-2 text-sky-700 font-bold drop-shadow-sm">{regData.name || "Enter Name"}</h1>
                                <input name="designationLine" type="text" onChange={onChangeHandler} value={regData.designationLine} />
                                <h2 className=" text-xl pb-2">{regData.designationLine || "Enter Designation Line"}</h2>
                                <label htmlFor="socialType">Type of Link: </label>
                                <select name="socialType" onChange={onChangeHandler} value={socialType}>
                                    <option value="select">Please select</option>
                                    <option value="github">Github Profile</option>
                                    <option value="linkedin"> Linkedin Profile </option>
                                    <option value="leetcode">Leetcode Profile</option>
                                    <option value="email">Email</option>
                                </select>
                                <label htmlFor="newSocialLink">URL:</label>
                                <input name="newSocialLink" onChange={onChangeHandler} value={newSocialLink} />
                                <button onClick={addSocialLink}>Add Link</button>
                                <div className="flex max-w-xl justify-evenly text-5xl px-10 py-5 mx-auto">
                                    {
                                        (regData.links.length > 0)
                                        &&
                                        regData.links.map(
                                            (lnk, idx) =>
                                                <div key={idx}>
                                                    <AiFillDelete className="text-red-500 text-lg float-right cursor-pointer" onClick={() => deleteSocialLink(idx)} />
                                                    <Link key={idx} target="_blank" href={(lnk.type === "email") && `mailto:${lnk.link}` || lnk.link}>{getLinkIcon(lnk.type)}</Link>
                                                </div>
                                        )
                                        ||
                                        <p className="text-lg">No links added</p>
                                    }
                                </div>
                            </div>
                            <input name="description" value={regData.description} onChange={onChangeHandler} />
                            <p className="text-lg leading-5 max-w-lg mx-auto">
                                {regData.description || "Enter Description"}
                            </p>
                        </div>
                        <div className="mx-auto w-max rounded-full overflow-hidden">
                            <Image src={profilePhoto} style={{ "objectFit": "fill" }} width={150} alt={"profile"} />
                        </div>
                    </section>
                    <select name="newSkill" value={newSkill} onChange={onChangeHandler}>
                        <option value="select">Please Select Skill</option>
                        <option value="React">React</option>
                        <option value="Next.js">Next.js</option>
                        <option value="Flutter">Flutter</option>
                        <option value="Spring">Spring</option>
                        <option value="Python">Python</option>
                        <option value="Javascript">Javascript</option>
                        <option value="C++">C++</option>
                    </select>
                    <button onClick={addSkill}>Add Skill</button>

                    <section className=" w-full my-10 bg-slate-800 overflow:hidden text-sky-300 text-7xl flex justify-center mx-auto py-10 px-20 flex-wrap">
                        {
                            (regData.skills.length > 0)
                            &&
                            regData.skills.map((text, idx) =>
                                <div key={idx} className="text-center mx-2 my-2">
                                    <AiFillDelete className="text-red-500 text-lg relative left-12 top-5 cursor-pointer" onClick={() => deleteSkill(idx)} />
                                    {getSkillIcon(text)}
                                    <p className="text-sm text-white font-semibold" >{text}</p>
                                </div>
                            )
                            ||
                            <p className="text-lg">No skills added</p>
                        }
                    </section>

                    <section className=" md:max-w-full mx-auto px-5 pb-10">
                        <h1 className="text-5xl font-bold pt-10">PROJECTS</h1>
                        <p className="text-4xl"><CgScrollH /></p>
                        <label htmlFor="newProjectTitle">Title: </label>
                        <input type="text" name="newProjectTitle" value={newProject.title} onChange={onChangeHandler} />
                        <br />
                        <label htmlFor="newProjectDescription">Description: </label>
                        <input type="text" name="newProjectDescription" value={newProject.description} onChange={onChangeHandler} />
                        <br />
                        <label htmlFor="newProjectDateRange">Date Range: </label>
                        <input type="text" name="newProjectDateRange" value={newProject.dateRange} onChange={onChangeHandler} />
                        <br />
                        <label htmlFor="newProjectGithubLink">Github Link: </label>
                        <input type="text" name="newProjectGithubLink" value={newProject.githubLink} onChange={onChangeHandler} />
                        <br />
                        <label htmlFor="newProjectDemoLink">Demo Link: </label>
                        <input type="text" name="newProjectDemoLink" value={newProject.demoLink} onChange={onChangeHandler} />
                        <br />
                        <button onClick={addProject}>Add Project</button>
                        <br />
                        <div className="hide-scrollbar flex overflow-x-scroll items-stretch">
                            {
                                (regData.projects.length > 0)
                                &&
                                regData.projects.map((proj, idx) =>
                                    <div key={idx}>
                                        <AiFillDelete className="text-red-500 relative top-10 right-5 z-10 text-lg float-right cursor-pointer" onClick={() => deleteProject(idx)} />
                                        <ProjectDisplay key={idx} proj={proj} />
                                    </div>
                                )
                                ||
                                <p className="text-lg">No projects added</p>
                            }
                        </div>
                    </section>

                    <b> Experience: </b><br />


                    <section className="bg-slate-800 md:max-w-full mx-auto px-5">
                        <h1 className="text-5xl text-white pt-10 font-bold self-start">EXPERIENCE</h1>
                        <p className="text-white text-4xl"><CgScrollH /></p>
                        <div className="text-white">
                            <label htmlFor="newExpTitle">Title: </label>
                            <input className="text-black" required type="text" name="newExpTitle" value={newExp.title} onChange={onChangeHandler} />
                            <br />
                            <label htmlFor="newExpCompany">Company: </label>
                            <input className="text-black" type="text" name="newExpCompany" value={newExp.company} onChange={onChangeHandler} />
                            <br />
                            <label htmlFor="newExpDescription">Description: </label>
                            <input className="text-black" type="text" name="newExpDescription" value={newExp.description} onChange={onChangeHandler} />
                            <br />
                            <label htmlFor="newExpDateRange">Date Range: </label>
                            <input className="text-black" type="text" name="newExpDateRange" value={newExp.dateRange} onChange={onChangeHandler} />
                            <br />
                            <button onClick={addExp}>Add Experience</button>
                        </div>
                        <div className="flex justify-center gap:5">
                            {
                                (regData.experience.length > 0)
                                &&
                                regData.experience.map((exp, idx) =>
                                    <div key={idx}>
                                        <AiFillDelete className="text-red-500 relative top-10 right-5 z-10 text-lg float-right cursor-pointer" onClick={() => deleteExp(idx)} />
                                        <ExpDisplay key={idx} exp={exp} />
                                    </div>
                                )
                                ||
                                <p className="text-lg text-gray-200 my-10">No experience added</p>
                            }
                        </div>
                    </section>

                    {
                        (regData.contact !== undefined) &&
                        <section className="text-2xl flex flex-col items-center py-10">
                            <h1 className="text-4xl font-bold mb-5">Want to get in touch?</h1>
                            <div className="text-sm">
                                <label htmlFor="phone">Phone: </label>
                                <input name="phone" type="text" value={regData.contact?.phone} onChange={onChangeHandler} />
                                <br />
                                <label htmlFor="email">Email: </label>
                                <input name="email" type="text" value={regData.contact?.email} onChange={onChangeHandler} />
                                <br />
                                <label htmlFor="location">Location: </label>
                                <input name="location" type="text" value={regData.contact?.location} onChange={onChangeHandler} />
                            </div>
                            <div>
                                {(regData.contact.phone !== "") &&
                                    <div className="flex items-center">
                                        <BsFillTelephoneFill className="text-2xl" />: {regData.contact.phone}
                                    </div>
                                }
                                {(regData.contact.email !== "") &&
                                    <div className="flex items-center">
                                        <MdEmail className="text-2xl" />: {regData.contact.email}
                                    </div>
                                }
                                {(regData.contact.location !== "") &&
                                    <div className="flex items-center">
                                        <ImLocation className="text-2xl" />: {regData.contact.location}
                                    </div>
                                }
                            </div>
                        </section>
                    }

                    <div onClick={submitFormHandler} className=" reveal-from-right flex items-center fixed top-10 right-0 bg-slate-700 rounded-tl-lg rounded-bl-lg cursor-pointer">
                        <MdCheckCircle className=" py-2 text-5xl text-sky-500" />
                        <p className="text-white mr-2">Submit</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Register;