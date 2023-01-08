import Head from "next/head";
import { useState } from "react";
import HomeProps, { Contact, Experience, Project } from "../components/homeProps";

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

function showAlert(q:string) {
    alert(`${q} is mandatory, please enter it!`);
}

function Register() {
    async function submitFormHandler(e: any) {
        const finalData = regData;

        if(regData.name === "") {
            showAlert("Name");
            return;
        }
        else if(regData.username === "") {
            showAlert("Username");
            return;
        }
        else if(regData.shortDesignation === "") {
            showAlert("Short Designation");
            return;
        }
        else if(regData.designationLine === "") {
            showAlert("Designation Line");
            return;
        }
        else if(regData.description === "") {
            showAlert("Description");
            return;
        }

        if(finalData.contact) {
            if(finalData.contact.email === "" && finalData.contact.phone === "" && finalData.contact.location === "") {
                //entire contact section is left
                finalData.contact = undefined;
            }
            else if(finalData.contact.email === "") {
                alert("Email is mandatory for contact section, otherwise remove all entries from contact section");
                return;
            }
            else {
                if(finalData.contact.phone === "") {
                    finalData.contact.phone = undefined;
                }
                if(finalData.contact.location === "") {
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

        //reset data
        setRegData(defaultRegData);
        setNewSocialLink("");
        setSocialType("");
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
        else if(e.target.name === "description") {
            setRegData({
                ...regData,
                description: e.target.value
            })
        }
        else if(e.target.name === "newSkill") {
            setNewSkill(e.target.value);
        }
        else if(e.target.name === "newProjectTitle") {
            setNewProject({
                ...newProject,
                title: e.target.value
            })
        }
        else if(e.target.name === "newProjectDescription") {
            setNewProject({
                ...newProject,
                description: e.target.value
            })
        }
        else if(e.target.name === "newProjectDateRange") {
            setNewProject({
                ...newProject,
                dateRange: e.target.value
            })
        }
        else if(e.target.name === "newProjectGithubLink") {
            setNewProject({
                ...newProject,
                githubLink: e.target.value
            })
        }
        else if(e.target.name === "newProjectDemoLink") {
            setNewProject({
                ...newProject,
                demoLink: e.target.value
            })
        }
        else if(e.target.name === "newExpTitle") {
            setNewExp({
                ...newExp,
                title: e.target.value
            })
        }
        else if(e.target.name === "newExpCompany") {
            setNewExp({
                ...newExp,
                company: e.target.value
            })
        }
        else if(e.target.name === "newExpDescription") {
            setNewExp({
                ...newExp,
                description: e.target.value
            })
        }
        else if(e.target.name === "newExpDateRange") {
            setNewExp({
                ...newExp,
                dateRange: e.target.value
            })
        }
        else if(e.target.name === "phone") {
            setRegData({
                ...regData,
                contact: {
                    ...regData.contact,
                    email: regData.contact?.email || "",
                    phone: e.target.value || "",
                }
            })
        }
        else if(e.target.name === "email") {
            setRegData({
                ...regData,
                contact: {
                    ...regData.contact,
                    email: e.target.value
                }
            })
        }
        else if(e.target.name === "location") {
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

    function deleteSocialLink(i:number) {
        setRegData({
            ...regData,
            links: regData.links.filter((val, idx) => idx != i)
        })
    }

    function addSkill() {
        if(newSkill === "") {
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

    function deleteSkill(i:number) {
        setRegData({
            ...regData,
            skills: regData.skills.filter((val, idx) => idx != i)
        })
    }

    function addProject() {
        if(newProject.title === "") {
            alert("Please enter the title!");
            return;
        }
        else if(newProject.description === "") {
            alert("Pleasae enter the description!");
            return;
        }
        const proj:Project = {
            title: newProject.title,
            description: newProject.description
        }
        if(newProject.dateRange != "") {
            proj.dateRange = newProject.dateRange
        }
        if(newProject.githubLink != "") {
            proj.githubLink = newProject.githubLink
        }
        if(newProject.demoLink != "") {
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
        if(newExp.title === "") {
            alert("Please enter title!");
        }
        else if(newExp.company === "") {
            alert("Please enter company!");
        }
        else if(newExp.description === "") {
            alert("Please enter description!");
        }
        else if(newExp.dateRange === "") {
            alert("Please enter dateRange!");
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

    function deleteExp(i:number) {
        setRegData({
            ...regData,
            experience: regData.experience.filter((val, idx) => idx != i)
        })
    }

    return (
        <div>
            <Head>
                <title>Make your own Portfolio</title>
            </Head>
            <main>
                <div>
                    <b>Basic Details:</b>
                    <br/>
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" onChange={onChangeHandler} value={regData.name} />
                    <br />
                    <label htmlFor="username">Username:</label>
                    <input name="username" type="text" onChange={onChangeHandler} value={regData.username} />
                    <br />
                    <label htmlFor="shortDesignation">Short Designation Line</label>
                    <input name="shortDesignation" onChange={onChangeHandler} value={regData.shortDesignation} />
                    <br />
                    <label htmlFor="designationLine">Designation Line:</label>
                    <input name="designationLine" type="text" onChange={onChangeHandler} value={regData.designationLine} />
                    <br />
                    <br/>
                    <b>Social Links:</b>
                    <br/>
                    <input name="newSocialLink" onChange={onChangeHandler} value={newSocialLink} />
                    <br />
                    <label htmlFor="socialType">Type of Link: </label>
                    <select name="socialType" onChange={onChangeHandler} value={socialType}>
                        <option value="select">Please select</option>
                        <option value="github">Github Profile</option>
                        <option value="linkedin"> Linkedin Profile </option>
                        <option value="leetcode">Leetcode Profile</option>
                        <option value="email">Email</option>
                    </select>
                    <br />
                    <button onClick={addSocialLink}>Add Link</button>
                    <br />
                    <>
                        {
                            regData.links.map((lnk, idx) => 
                                <div key={idx}>
                                    <p>{`${lnk.type}: ${lnk.link}`}</p>
                                    <button onClick={() => deleteSocialLink(idx)}>Delete</button>
                                </div>
                            )
                        }
                    </>
                    <br />
                    <label htmlFor="description">Description: </label>
                    <input name = "description" value = {regData.description} onChange = {onChangeHandler} />
                    <br/>
                    <br/>
                    <b>Skills:</b>
                    <br/>
                    <select name = "newSkill" value = {newSkill} onChange = {onChangeHandler}>
                        <option value = "select">Please Select</option>
                        <option value = "React">React</option>
                        <option value = "Next.js">Next.js</option>
                        <option value = "Flutter">Flutter</option>
                        <option value = "Spring">Spring</option>
                        <option value = "Python">Python</option>
                        <option value = "Javascript">Javascript</option>
                        <option value = "C++">C++</option>
                    </select>
                    <button onClick = {addSkill}>Add Skill</button>
                    <br/>
                    <>
                    {
                        regData.skills.map((skill, idx) => 
                            <div key = {idx}>
                                <h2>{skill}</h2>
                                <button onClick = {() => deleteSkill(idx)}>Delete</button>
                            </div>
                        )
                    }
                    </>
                    <br/>
                    <b>Projects:</b>
                    <br/>
                    <label htmlFor="newProjectTitle">Title: </label>
                    <input type = "text" name = "newProjectTitle" value = {newProject.title} onChange = {onChangeHandler} />
                    <br />
                    <label htmlFor="newProjectDescription">Description: </label>
                    <input type = "text" name = "newProjectDescription" value = {newProject.description} onChange = {onChangeHandler} />
                    <br/>
                    <label htmlFor="newProjectDateRange">Date Range: </label>
                    <input type = "text" name = "newProjectDateRange" value = {newProject.dateRange} onChange = {onChangeHandler} />
                    <br/>
                    <label htmlFor="newProjectGithubLink">Github Link: </label>
                    <input type = "text" name = "newProjectGithubLink" value = {newProject.githubLink} onChange = {onChangeHandler} />
                    <br/>
                    <label htmlFor="newProjectDemoLink">Demo Link: </label>
                    <input type = "text" name = "newProjectDemoLink" value = {newProject.demoLink} onChange = {onChangeHandler} />
                    <br/>
                    <button onClick = {addProject}>Add Project</button>
                    <br/>
                    <>
                    {
                        regData.projects.map((proj, idx) => 
                            <div key = {idx} className = "flex flex-col items-start">
                                <b>Title: {proj.title}</b>
                                {(proj.dateRange !== undefined) && <i>{proj.dateRange}</i>}
                                <p>{proj.description}</p>
                                {(proj.githubLink !== undefined) && <a href = {proj.githubLink}>Github Link</a>}
                                {(proj.demoLink !== undefined) && <a href = {proj.demoLink}>Demo Link</a>}
                                <button onClick = {() => deleteProject(idx)}>Delete</button>
                            </div>
                        )
                    }
                    </>
                    <br/>
                    <b> Experience: </b>
                    <br/>
                    <label htmlFor="newExpTitle">Title: </label>
                    <input required type = "text" name = "newExpTitle" value = {newExp.title} onChange = {onChangeHandler} />
                    <br />
                    <label htmlFor="newExpCompany">Company: </label>
                    <input type = "text" name = "newExpCompany" value = {newExp.company} onChange = {onChangeHandler} />
                    <br/>
                    <label htmlFor="newExpDescription">Description: </label>
                    <input type = "text" name = "newExpDescription" value = {newExp.description} onChange = {onChangeHandler} />
                    <br/>
                    <label htmlFor="newExpDateRange">Date Range: </label>
                    <input type = "text" name = "newExpDateRange" value = {newExp.dateRange} onChange = {onChangeHandler} />
                    <br/>
                    <button onClick = {addExp}>Add Experience</button>
                    <br/>
                    <>
                    {
                        regData.experience.map((exp, idx) => 
                            <div key = {idx} className = "flex flex-col items-start">
                                <b>{exp.title}</b>
                                <i>{exp.company}</i>
                                <p>{exp.dateRange}</p>
                                <p>{exp.description}</p>
                                <button onClick = {() => deleteExp(idx)}>Delete</button>
                            </div>
                        )
                    }
                    </>
                    <br/>
                    <b>Contact Details:</b>
                    <br/>
                    <label htmlFor = "phone">Phone Number: </label>
                    <input name = "phone" type = "text" value = {regData.contact?.phone} onChange = {onChangeHandler}/>
                    <br/>
                    <label htmlFor = "email">Email: </label>
                    <input name = "email" type = "text" value = {regData.contact?.email} onChange = {onChangeHandler}/>
                    <br/>
                    <label htmlFor = "location">Location: </label>
                    <input name = "location" type = "text" value = {regData.contact?.location} onChange = {onChangeHandler}/>
                    <br/>
                    <br/>

                    <button type="submit" onClick = {submitFormHandler}>Submit</button>
                </div>
            </main>
        </div>
    )
}

export default Register;