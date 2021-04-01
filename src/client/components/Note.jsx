import React from "react";
import Markdown from "markdown-to-jsx";
import Draggable from "react-draggable";

const Note = ({ note, onUpdate, style, ...rest }) => {
    const { text, createdAt } = note;
    return (
        <div className="note" {...rest} >
            <div className="title">
                <div className="drag-handle">
                    <span className="status">&nbsp;</span>
                    <span className="created">{createdAt.toISOString()}</span>
                </div>
                <a className="delete">&times;</a>
            </div>
            <div className="body">
                <div className='preview'><Markdown>{text}</Markdown></div>
                <div className='editor'><textarea 
                    defaultValue={text}
                    onBlur={(ev) => onUpdate({...note, text: ev.target.value})}
                /></div>
            </div>
        </div>
    );
};
export default React.memo(Note);

/**
 * Transform coordinates from percentage [0-100] to absolute pixel values
 * @param {{x: number, y: number}} pos Position as percentage of window size
 * @returns {{x: number, y: number}} Absolute position
 */
function transformPercentToAbsolutePos (pos) {
    const { innerWidth, innerHeight } = window;
    return {
        x: pos.x * innerWidth / 100,
        y: pos.y * innerHeight / 100,
    };
}

/**
 * Transform coordinates from absolute pixel values to percentage [0-100]
 * @param {{x: number, y: number}} pos Absolute position
 * @returns {{x: number, y: number}} Position as percentage of window size
 */
function transformAbsoluteToPercentPos (pos) {
    const { innerWidth, innerHeight } = window;
    return {
        x: pos.x / innerWidth * 100,
        y: pos.y / innerHeight * 100,
    };
}

export const FloatingNote = (props) => {
    const { note, onUpdate, ...rest } = props;

    // Patch onUpdate since our interface exposes position as percentage
    // but node-draggable uses absolute coordinates
    const onMove = (ev, draggableData) => {
        const { x, y } = transformAbsoluteToPercentPos(draggableData);
        onUpdate({
            ...note,
            x,
            y,
        });
    };

    return (
        <Draggable
            handle=".drag-handle"
            position={transformPercentToAbsolutePos(note)}
            onMouseDown={props.onFocus}
            onStop={onMove}
        >
            <div 
                className='note-container' 
                style={{zIndex: note.zIndex}}
            >
                <Note
                    note={note}
                    onUpdate={onUpdate}
                    {...rest}
                />
            </div>
        </Draggable>
    );
};