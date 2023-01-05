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
import {FaArrowUp} from "react-icons/fa"

function Home({ projects }: { projects: Project[] }) {

    const [menu, setMenu] = useState(false);
    const menuItems = (
        <>
            <p className=" py-2 px-5 text-2xl hidden md:block"><FaArrowUp /></p>
            <p className=" py-2 px-5 text-xl">Skills</p>
            <p className=" py-2 px-5 text-xl">Projects</p>
            <p className=" py-2 px-5 text-xl">Experience</p>
            <p className=" py-2 px-5 text-xl">Achievements</p>
            <p className=" py-2 px-5 text-xl">Contact</p>
        </>
    )
    return (
        <div>
            <Head>
                <meta property="description" content="Portfolio of Sajal Singhal" />
                <title>Sajal Singhal | Developer</title>
            </Head>
            <main>
                <button className={`sticky top-0 md:hidden bg-sky-200 p-3 ${!menu && "rounded-br-lg"} z-10`} onClick={() => setMenu(!menu)}><AiOutlineMenu /></button>
                {
                    (menu) &&
                    <div className="sticky top-10 px-10 tracking-widest font-semibold md:hidden bg-sky-100 z-10">
                        {menuItems}
                    </div>
                }
                <nav className="sticky top-0 hidden w-screen bg-sky-100 py-5 flex-wrap md:flex z-10">
                    {menuItems}
                </nav>
                {/* Intro Section */}
                <section>
                    <div className="py-10 text-center w-3/4 mx-auto items-center">
                        <h1 className="text-5xl pb-2 text-sky-600 font-bold drop-shadow-sm">Sajal Singhal</h1>
                        <h2 className="text-xl pb-2">Developer, Designer, CS Enthusiast</h2>
                        <div className="flex justify-evenly text-2xl pb-5 px-10 pt-2">
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
                        <p className="text-lg leading-5">
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
                <section className="text-7xl flex w-2/3 justify-center mx-auto p-10 flex-wrap">
                    <div className="text-center">
                        <DiReact />
                        <p className="text-sm" >React</p>
                    </div>
                    <div className="text-center">
                        <TbBrandNextjs />
                        <p className="text-sm" >Next.js</p>
                    </div>
                    <div className="text-center">
                        <RiFlutterFill />
                        <p className="text-sm" >Flutter</p>
                    </div>
                    <div className="text-center">
                        <SiSpring className="py-2" />
                        <p className="text-sm" >Spring</p>
                    </div>
                    <div className="text-center">
                        <FaPython />
                        <p className="text-sm" >Python</p>
                    </div>
                    <div className="text-center">
                        <DiJavascript1 />
                        <p className="text-sm" >Javascript</p>
                    </div>
                    <div className="text-center">
                        <SiCplusplus className="py-2" />
                        <p className="text-sm" >C++</p>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="sm:w-full mx-auto flex px-20 justify-center place-items-stretch flex-wrap">
                    {
                        projects.map((proj, idx) => <ProjectDisplay key={idx} proj={proj} />)
                    }
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
                    title: "Ano-Note",
                    description: "An anonymous note-taking app with note editing and deleting features. (MERN Stack)",
                    dateRange: "April-May 2021",
                    githubLink: "https://github.com/SSReal/ano-note",
                    demoLink: "https://ano-note.herokuapp.com/"
                },
                {
                    title: "Me-Site",
                    description: "A Microblogging Platform created in the MERN stack. Users can log in with Google or Email, follow others or be followed by other people, post things they love, all on a simple interface.",
                    dateRange: "May-June 2021",
                    githubLink: "https://github.com/SSReal/me-site"
                },
                {
                    title: "Chat-App-Backend",
                    description: "A sample REST API which has support for multiple users each with some pages, each of which can contain views which can be password-protected. Can be abstracted by an application to implement a page-view based data structure",
                    dateRange: "March 2022",
                    githubLink: "https://github.com/SSReal/chat-app-backend",
                },
                {
                    title: "सक्षम (Saksham)",
                    description: "An app to facilitate the inner workings of the Dept. of Financial Services (DFS), Ministry of Finance, allowing the various employees to contact their superiors regarding issues, or broadcast notices to juniors. Also it has a separate tab in which the various notices published to the public are displayed. Developed as part of Smart India Hackathon'22 in a team of 6 within 36 hours.",
                    dateRange: "April-May 2021",
                    // githubLink: "https://github.com/SSReal/financial-alert-app_bhagwan_bharose",
                    demoLink: "https://drive.google.com/file/d/1-CxlGSzKVOj-lwUePQnYbdqEC-woS3w7"
                }
            ]
        }
    }
}