import Head from "next/head";
import Image,{StaticImageData} from "next/image";
import profilePhoto from "../public/profile.jpg";

import { DiReact, DiJavascript1 } from "react-icons/di";
import { TbBrandNextjs } from "react-icons/tb";
import { RiFlutterFill } from "react-icons/ri";
import { SiSpring, SiCplusplus, SiLeetcode } from "react-icons/si";
import { FaPython, FaArrowUp } from "react-icons/fa";
import { AiFillGithub, AiFillLinkedin, AiOutlineMenu } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { CgScrollH } from "react-icons/cg";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ImLocation } from "react-icons/im";

import Link from "next/link";
import ProjectDisplay from "../components/ProjectDisplay";
import { NextPageContext } from "next";
import { useState } from "react";
import ExpDisplay from "../components/ExperienceDisplay";

import HomeProps from "../components/homeProps";
import sajalSinghal from "../data/sajalSinghal";


function getLinkIcon(type: string): JSX.Element {
    if (type === "github") {
        return <AiFillGithub />;
    }
    else if (type === "linkedin") {
        return <AiFillLinkedin />;
    }
    else if (type === "leetcode") {
        return <SiLeetcode />;
    }
    else if (type === "email") {
        return <MdEmail />;
    }
    else {
        return <div />;
    }
}

function getSkillIcon(text: string): JSX.Element {
    if (text === "React") {
        return <DiReact />;
    }
    else if (text === "Next.js") {
        return <TbBrandNextjs />;
    }
    else if (text === "Flutter") {
        return <RiFlutterFill />;
    }
    else if (text === "Spring") {
        return <SiSpring />;
    }
    else if (text === "Python") {
        return <FaPython />;
    }
    else if (text === "Javascript") {
        return <DiJavascript1 />;
    }
    else if (text === "C++") {
        return <SiCplusplus />;
    }
    else {
        return <div />;
    }
}


function Home({
    name,
    shortDesignation,
    designationLine,
    links,
    description,
    profilePhotoPath,
    skills,
    projects,
    experience,
    contact,
}: HomeProps) {

    const [menu, setMenu] = useState(false);
    const menuItems = (
        <>
            <p className=" py-2 px-5 text-2xl"><a href="#intro" ><FaArrowUp /></a></p>
            <p className=" py-2 px-5 text-xl"><a href="#skills" >SKILLS</a></p>
            <p className=" py-2 px-5 text-xl"><a href="#projects" >PROJECTS</a></p>
            <p className=" py-2 px-5 text-xl"><a href="#experience" >EXPERIENCE</a></p>
            {/* <p className=" py-2 px-5 text-xl"><a href="#achievements" >Achievements</a></p> */}
            {(contact !== undefined) && <p className=" py-2 px-5 text-xl"><a href="#contact" >CONTACT</a></p>}
        </>
    )
    return (
        <div>
            <Head>
                <meta property="description" content={`Portfolio of ${name}`} />
                <title>{`${name} | ${shortDesignation}`}</title>
            </Head>

            <main>
                <button className={`sticky top-0 md:hidden bg-slate-900 text-white p-3 ${!menu && "rounded-br-lg"} z-20`} onClick={() => setMenu(!menu)}><AiOutlineMenu /></button>
                {
                    (menu) &&
                    <div className="text-white w-screen fixed top-0 px-10 tracking-widest font-semibold md:hidden bg-slate-800 z-10">
                        {menuItems}
                    </div>
                }
                <nav className="text-white sticky top-0 hidden bg-slate-800 py-5 flex-wrap md:flex z-10">
                    {menuItems}
                </nav>
                {/* Intro Section */}
                <div id="intro" />
                <section>
                    <div className="py-10 text-center mx-auto">
                        <div className="w-full mx-auto">
                            <h1 className="text-5xl pb-2 text-sky-700 font-bold drop-shadow-sm">{name}</h1>
                            <h2 className=" text-xl pb-2">{designationLine}</h2>

                            <div className="flex max-w-xl justify-evenly text-5xl px-10 py-5 mx-auto">
                                {
                                    links.map(
                                        (lnk, idx) =>
                                            <Link key={idx} target="_blank" href={(lnk.type === "email") && `mailto:${lnk.link}` || lnk.link}>{getLinkIcon(lnk.type)}</Link>
                                    )
                                }
                            </div>
                        </div>
                        <p className="text-lg leading-5 max-w-lg mx-auto">
                            {description}
                        </p>
                    </div>
                    <div className="mx-auto w-max rounded-full overflow-hidden">
                        <Image src={profilePhoto} style={{ "objectFit": "fill" }} width={150} alt={"profile"} />
                    </div>
                </section>


                {/* Skills Section */}
                <div id="skills" />
                <section className=" w-full my-10 bg-slate-800 overflow:hidden text-sky-300 text-7xl flex justify-center mx-auto py-10 px-20 flex-wrap">
                    {
                        skills.map((text, idx) =>
                            <div key={idx} className="text-center mx-2 my-2">
                                {getSkillIcon(text)}
                                <p className="text-sm text-white font-semibold" >{text}</p>
                            </div>
                        )
                    }
                </section>

                {/* Projects Section */}
                <div id="projects" />
                <section className=" md:max-w-full mx-auto px-5 pb-10">
                    <h1 className="text-5xl font-bold pt-10">PROJECTS</h1>
                    <p className="text-4xl"><CgScrollH /></p>
                    <div className="hide-scrollbar flex overflow-x-scroll items-stretch">
                        {
                            projects.map((proj, idx) => <ProjectDisplay key={idx} proj={proj} />)
                        }
                    </div>
                </section>

                {/* Experience Section */}
                <div id="experience" />
                <section className="bg-slate-800 md:max-w-full mx-auto px-5">
                    <h1 className="text-5xl text-white pt-10 font-bold self-start">EXPERIENCE</h1>
                    <p className="text-white text-4xl"><CgScrollH /></p>
                    <div className="flex justify-center gap:5">
                        {
                            experience.map((exp, idx) => <ExpDisplay key={idx} exp={exp} />)
                        }
                    </div>
                </section>

                {/* Contact Section */}
                <div id="contact" />
                {
                    (contact !== undefined) &&
                    <section className="text-2xl flex flex-col items-center py-10">
                        <h1 className="text-4xl font-bold mb-5">Want to get in touch?</h1>
                        <div>
                            {(contact.phone !== undefined) &&
                                <div className="flex items-center">
                                    <BsFillTelephoneFill className="text-2xl" />: {contact.phone}
                                </div>
                            }
                            {(contact.email !== undefined) &&
                                <div className="flex items-center">
                                    <MdEmail className="text-2xl" />: {contact.email}
                                </div>
                            }
                            {(contact.location !== undefined) &&
                                <div className="flex items-center">
                                    <ImLocation className="text-2xl" />: {contact.location}
                                </div>
                            }
                        </div>
                    </section>
                }
            </main>
            <footer className="mx-auto text-white py-5 bg-slate-800 w-screen flex justify-center">
                <p>Made by <b>Sajal Singhal</b> (2023)</p>
            </footer>
        </div>
    )
}

export default Home;

export async function getStaticProps(context: NextPageContext) {
    return {
        props: sajalSinghal
    }
}