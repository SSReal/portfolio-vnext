import { GetStaticPropsContext} from "next";
import HomeProps from "../components/homeProps";
import Home from "./index";
import {db, coll, findOne, findUsernames} from "../data/mongo";

function ProfileHome(profile: HomeProps) {

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
        fallback: false,
    }
};

export async function getStaticProps(context:GetStaticPropsContext) {
    const username = context.params?.username || "sajals";
    return {
        props: await findOne({username}),
    }
};