import React from "react";

export interface TodoItemProps {
    id: number,
    value: string,
    isDone: boolean
}
export interface ClickHandleProps {
    clickHandle: (id: number) => void
}

export const TodoItem: React.FunctionComponent<TodoItemProps &  ClickHandleProps> = props => {
    return <li className={props.isDone ? "checked" : ""} onClick={() => props.clickHandle(props.id)}>{props.value}</li>
}
