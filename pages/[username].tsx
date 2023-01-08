import { GetStaticPropsContext} from "next";
import HomeProps from "../components/homeProps";
import Home from "./index";
import {db, coll, findOne, findUsernames} from "../data/mongo";
import { useRouter } from "next/router";

function ProfileHome(profile: HomeProps) {
    const router = useRouter();
    if(router.isFallback) {
        return <h1 className = "text-3xl"> Loading </h1>
    }
    if(profile._id === null) {
        //user not found
        return <h1 className = "text-3xl">User not found</h1>
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
        fallback: "blocking",
    }
};

export async function getStaticProps(context:GetStaticPropsContext) {
    const username = context.params?.username || "sajals";
    return {
        props: await findOne({username}),
    }
};