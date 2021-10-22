import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Lesson from "../pages/Lesson";
import LessonDetail from "../pages/LessonDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function Body() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/courses/:courseId/lesson" component={Lesson} />
                    <Route exact path="/lesson/:lessonId/" component={LessonDetail} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </>
    )
}