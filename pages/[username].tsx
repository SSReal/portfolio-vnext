import { GetStaticPropsContext } from "next";
import HomeProps from "../components/homeProps";
import Home from ".";
import { db, coll, findOne, findUsernames } from "../data/mongo";
import { useRouter } from "next/router";
import loader from "../public/loader.gif";
import Image from "next/image";
import { FaUserSlash } from "react-icons/fa";
import Link from "next/link";

function ProfileHome(profile: HomeProps) {
    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="fixed font-semibold w-screen h-screen flex items-center">
                <Image className="mx-auto opacity-60" src={loader} alt="loading" />
            </div>)
    }
    if (profile._id === null) {
        //user not found
        return (
        <div className = "fixed w-screen h-screen flex flex-col items-center justify-center">
            <FaUserSlash className = "text-9xl"/>
            <p className = "text-6xl font-bold max-w-md text-center">User {router.query.username} doesn{"'"}t exist</p>
            <Link className = "text-3xl my-10 p-5 rounded-md border-2 hover:bg-slate-100 hover:bg-opacity-50" href = {'/register'}>Create</Link>
        </div>
        )
    }
    else if(profile.name === undefined) {
        //profile not yet implemented
        return (
            <div className = "fixed w-screen h-screen flex flex-col items-center justify-center">
                <FaUserSlash className = "text-9xl"/>
                <p className = "text-3xl font-bold max-w-md text-center">Portfolio for {router.query.username} has not been implemented yet.</p>
                <p className = "text-xl py-5">Log in as {router.query.username} and visit Edit page to implement it</p>
                <Link className = "text-3xl my-10 p-5 rounded-md border-2 hover:bg-slate-100 hover:bg-opacity-50" href = {'/edit'}>Edit</Link>
            </div>
            )
    }
    return <Home {...profile} />
}

export default ProfileHome;

export async function getStaticPaths() {
    const allUsernames = await findUsernames();
    return {
        paths: allUsernames.map((val, idx) => {
            return {
                params: {
                    username: val
                }
            }
        }),
        fallback: true,
    }
};

export async function getStaticProps(context: GetStaticPropsContext) {
    const username = context.params?.username || "sajals";
    return {
        props: await findOne({ username }),
    }
};