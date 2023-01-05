import Head from "next/head";
import Image from "next/image";
import profilePhoto from "../public/profile.jpg";
import { DiReact } from "react-icons/di";
import { TbBrandNextjs } from "react-icons/tb";
import { RiFlutterFill } from "react-icons/ri";
import { SiSpring } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { DiJavascript1 } from "react-icons/di";
import { SiCplusplus, SiLeetcode } from "react-icons/si";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import Project from "../components/project";
import ProjectDisplay from "../components/ProjectDisplay";
import { NextPageContext } from "next";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"
import { FaArrowUp } from "react-icons/fa"
import Experience from "../components/experience";
import ExpDisplay from "../components/ExperienceDisplay";
import {CgScrollH} from "react-icons/cg";
import {BsFillTelephoneFill} from "react-icons/bs";
import {ImLocation} from "react-icons/im";

function Home({ projects, experience }: { projects: Project[], experience: Experience[] }) {

    const [menu, setMenu] = useState(false);
    const menuItems = (
        <>
            <p className=" py-2 px-5 text-2xl hidden md:block"><a href="#intro" ><FaArrowUp /></a></p>
            <p className=" py-2 px-5 text-xl"><a href="#skills" >SKILLS</a></p>
            <p className=" py-2 px-5 text-xl"><a href="#projects" >PROJECTS</a></p>
            <p className=" py-2 px-5 text-xl"><a href="#experience" >EXPERIENCE</a></p>
            {/* <p className=" py-2 px-5 text-xl"><a href="#achievements" >Achievements</a></p> */}
            <p className=" py-2 px-5 text-xl"><a href="#contact" >CONTACT</a></p>
        </>
    )
    return (
        <div>
            <Head>
                <meta property="description" content="Portfolio of Sajal Singhal" />
                <title>Sajal Singhal | Developer</title>
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
                            <h1 className="text-5xl pb-2 text-sky-700 font-bold drop-shadow-sm">Sajal Singhal</h1>
                            <h2 className=" text-xl pb-2">Developer, Designer, CS Enthusiast</h2>

                            <div className="flex max-w-xl justify-evenly text-2xl px-10 py-5 mx-auto">
                                <Link target="_blank" href="https://github.com/SSReal">
                                    <AiFillGithub />
                                </Link>
                                <Link target="_blank" href="https://www.linkedin.com/in/sajalsinghal1/">
                                    <AiFillLinkedin />
                                </Link>
                                <Link target="_blank" href="https://leetcode.com/sajals5031/">
                                    <SiLeetcode />
                                </Link>
                                <Link target="_blank" href="mailto:sajal.singhal1+jobs@gmail.com">
                                    <MdEmail />
                                </Link>
                            </div>
                        </div>
                        <p className="text-lg leading-5 max-w-lg mx-auto">
                            {
                                "Hi! I'm a Web Developer, Designer, ML Scientist based in New Delhi, India. I am a quick learner and can work with a variety of technologies effectively"
                            }
                        </p>
                    </div>
                    <div className="mx-auto w-max rounded-full overflow-hidden">
                        <Image src={profilePhoto} style={{ "objectFit": "fill" }} width={150} alt={"profile"} />
                    </div>
                </section>


                {/* Skills Section */}
                <div id="skills" />
                <section className="w-full my-10 bg-slate-800 overflow:hidden text-sky-300 text-7xl flex justify-center mx-auto py-10 px-20 flex-wrap">
                    <div className="text-center">
                        <DiReact />
                        <p className="text-sm text-white font-semibold" >React</p>
                    </div>
                    <div className="text-center">
                        <TbBrandNextjs />
                        <p className="text-sm text-white font-semibold" >Next.js</p>
                    </div>
                    <div className="text-center">
                        <RiFlutterFill />
                        <p className="text-sm text-white font-semibold" >Flutter</p>
                    </div>
                    <div className="text-center">
                        <SiSpring className="py-2" />
                        <p className="text-sm text-white font-semibold" >Spring</p>
                    </div>
                    <div className="text-center">
                        <FaPython />
                        <p className="text-sm text-white font-semibold" >Python</p>
                    </div>
                    <div className="text-center">
                        <DiJavascript1 />
                        <p className="text-sm text-white font-semibold" >Javascript</p>
                    </div>
                    <div className="text-center">
                        <SiCplusplus className="py-2" />
                        <p className="text-sm text-white font-semibold" >C++</p>
                    </div>
                </section>

                {/* Projects Section */}
                <div id="projects" />
                <section className=" my-20 md:max-w-full mx-auto px-5 pb-10">
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
                <section className="bg-slate-800 my-20 md:max-w-full mx-auto px-5 pb-10">
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
                <section className="w-max mx-auto pb-10">
                    <b>CONTACT</b>
                    <hr/>
                    <div className="flex pb-1">
                        <MdEmail className="text-2xl"/>
                        <p>: sajal.singhal1@gmail.com</p>
                    </div>
                    <div className="flex py-1">
                        <BsFillTelephoneFill className="text-2xl"/>
                        <p>: +91 982-167-9611</p>
                    </div>
                    <div className="flex py-1">
                        <ImLocation className="text-2xl"/>
                        <p>: Dwarka, New Delhi-75</p>
                    </div>
                    <hr/>
                </section>
            </main>

        </div>
    )
}

export default Home;

export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            projects: [
                {
                    title: "Chat-app",
                    description: "A common chat-room where users can log in with Google and share their ideas. Features auto-scroll feature with dynamic updates when new messages come. Technologies used: Firebase, React",
                    dateRange: "Jan 2023",
                    githubLink: "https://github.com/SSReal/chat-app",
                    demoLink: "https://chats-f2480.web.app",
                },
                {
                    title: "SimpleSim",
                    description: "A simple(r) Discrete Event Simulation Framework, written in Python",
                    dateRange: "Oct 2022",
                    githubLink: "https://github.com/SSReal/SimpleSim",
                },
                {
                    title: "सक्षम (Saksham)",
                    description: "An app to facilitate the inner workings of the Dept. of Financial Services (DFS), Ministry of Finance, allowing the various employees to contact their superiors regarding issues, or broadcast notices to juniors. Also it has a separate tab in which the various notices published to the public are displayed. Developed as part of Smart India Hackathon'22 in a team of 6 within 36 hours.",
                    dateRange: "Aug 2023",
                    // githubLink: "https://github.com/SSReal/financial-alert-app_bhagwan_bharose",
                    demoLink: "https://drive.google.com/file/d/1-CxlGSzKVOj-lwUePQnYbdqEC-woS3w7"
                },
                {
                    title: "Chat-App-Backend",
                    description: "A sample REST API which has support for multiple users each with some pages, each of which can contain views which can be password-protected. Can be abstracted by an application to implement a page-view based data structure",
                    dateRange: "March 2022",
                    githubLink: "https://github.com/SSReal/chat-app-backend",
                },
                {
                    title: "Me-Site",
                    description: "A Microblogging Platform created in the MERN stack. Users can log in with Google or Email, follow others or be followed by other people, post things they love, all on a simple interface.",
                    dateRange: "May-June 2021",
                    githubLink: "https://github.com/SSReal/me-site"
                },
                {
                    title: "Ano-Note",
                    description: "An anonymous note-taking app with note editing and deleting features. (MERN Stack)",
                    dateRange: "April-May 2021",
                    githubLink: "https://github.com/SSReal/ano-note",
                    demoLink: "https://ano-note.herokuapp.com/"
                },
            ],
            experience: [
                {
                    title: "SWE Intern",
                    company: "Cure.Fit Healthcare Pvt. Ltd.",
                    description: "Designed a standalone app for a vertical of the company. Created several API end-points and business logic to retrieve and display data on the app. Technologies used: Flutter, Java (Spring Boot), TypeScript",
                    dateRange: "May-July 2022"
                }
            ],
        }
    }
}