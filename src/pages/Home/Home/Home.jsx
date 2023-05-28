import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Call from "../Call/Call";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import Parallax from "../Parallax/Parallax";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testomonials from "../Testomonials/Testomonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss| Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <Parallax></Parallax>
            <PopularMenu></PopularMenu>
            <Call></Call>
            <Featured></Featured>
            <Testomonials></Testomonials>
        </div>
    );
};

export default Home;