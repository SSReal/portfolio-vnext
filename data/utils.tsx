import { DiReact, DiJavascript1 } from "react-icons/di";
import { TbBrandNextjs } from "react-icons/tb";
import { RiFlutterFill } from "react-icons/ri";
import { SiSpring, SiCplusplus, SiLeetcode } from "react-icons/si";
import { FaPython} from "react-icons/fa";
import { AiFillGithub, AiFillLinkedin, AiOutlineMenu } from "react-icons/ai";
import { MdEmail } from "react-icons/md";



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

export {getLinkIcon, getSkillIcon};