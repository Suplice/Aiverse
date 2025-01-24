
import AIViewPageMain from "../../Components/AIViewPageComponents/AIViewPageMain";
import CommentSection from "../../Components/CommentSection/CommentSection";
import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import Block from "../../Components/UI/Block";

const AIViewPage = () => {
    return (
        <>
        
        <Block className="bg-[#121212] p-6 w-full" direction="column" >
            <LandingNavbar /> 
            <AIViewPageMain />
        </Block>
        </>
    );
}

export default AIViewPage;