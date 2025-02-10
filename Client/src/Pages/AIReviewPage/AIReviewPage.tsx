import AIReviewPageMain from "../../Components/AIReviewComponents/AIReviewPageMain";
import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import Block from "../../Components/UI/Block";


const AIReviewPage = () => {
    return(
        <>
        <Block className="bg-[#121212] p-6 w-full" direction="column" >
        <LandingNavbar />
        <AIReviewPageMain />
        </Block>
        </>
    )
}

export default AIReviewPage;