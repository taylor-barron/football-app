import { useState, useEffect } from "react";

import NavigationBar from "../Components/NavigationBar";
import Button from "../Components/Button";
import Logo from "../Assets/favicon.ico"

import Years from "./Years";

const Home = () => {

    return (

        <div>

            <NavigationBar
                css={"navigation-bar"}
                text={"navigation-text"}
                logo={Logo}
                logoCss={"navImg"}

            />

            <div className="page-container-m">

                <div className="content-c">

                    <h1>Welcome to Unnamed,</h1>

                    <div className="p-c">
                        
                        <p>
                            the anti-score college football website. Instead of listening to a burger jingle made by a halfwit enjoy your Saturday on your terms.
                        </p>
                        <p>
                            Let AI determine which games you should watch for each time slot and take back hours of time that you would have been seeing ads.
                        </p>
                        <p>
                            When you're ready we'll let you know which games to watch without ruining them so that you can remain blissfully unaware of whatever it is that gets broadcast between snaps.
                        </p>
                        
                    </div>

                    <Years />

                </div>

            </div>

        </div>
    );
}

export default Home;