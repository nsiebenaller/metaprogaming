import React from "react";
import fortnite from "../../Assets/fortnite.jpg";
import league from "../../Assets/league.jpg";
import madden from "../../Assets/madden.jpg";
import overwatch from "../../Assets/overwatch.jpeg";
import valorant from "../../Assets/valorant.jpg";
import TopBar from "./TopBar/TopBar";

export default function Content() {
    return (
        <div className="content">
            <TopBar />
            <h1>Divisions</h1>
            <div className={"division-row"}>
                <DivisionTitle division={1} />
                <div className={"img-carousel"}>
                    <img className={"game-img"} src={fortnite} />
                    <img className={"game-img"} src={league} />
                    <img className={"game-img"} src={madden} />
                    <img className={"game-img"} src={overwatch} />
                    <img className={"game-img"} src={valorant} />
                </div>
            </div>
            <div className={"division-row"}>
                <DivisionTitle division={2} />
                <div className={"img-carousel"}>
                    <img className={"game-img"} src={fortnite} />
                    <img className={"game-img"} src={league} />
                    <img className={"game-img"} src={madden} />
                    <img className={"game-img"} src={overwatch} />
                    <img className={"game-img"} src={valorant} />
                </div>
            </div>
            <div className={"division-row"}>
                <DivisionTitle division={3} />
                <div className={"img-carousel"}>
                    <img className={"game-img"} src={fortnite} />
                    <img className={"game-img"} src={league} />
                    <img className={"game-img"} src={madden} />
                    <img className={"game-img"} src={overwatch} />
                    <img className={"game-img"} src={valorant} />
                </div>
            </div>
        </div>
    );
}

function DivisionTitle({ division }: any) {
    return (
        <div className={"division-title"}>
            <div>NECC East</div>
            <div>Division {division}</div>
        </div>
    );
}
