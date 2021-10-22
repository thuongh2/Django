import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Lesson from "../pages/Lesson";


export default function Body() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/courses/:courseId/lesson" component={Lesson} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </>
    )
}