import React from "react";

interface Props {
    week: Week;
}
export default function WeekItem({ week }: Props) {
    return (
        <div className={"week-item"}>
            <div>{week.name}</div>
            <span>{new Date(week.start).toLocaleDateString()}</span>
            <span> - to - </span>
            <span>{new Date(week.end).toLocaleDateString()}</span>
        </div>
    );
}
