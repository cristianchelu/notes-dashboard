import React from "react";
import { hot } from "react-hot-loader";
import { FloatingNote } from "./components/Note";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: {
                1: {
                    id: 1,
                    x: 50,
                    y: 50,
                    text: "How'dy!\n\n[ ] List 1",
                    createdAt: new Date(),
                    zIndex: 1,
                },
                2: {
                    id: 2,
                    x: 40, 
                    y: 40 ,
                    text: `Test!\n\n[ ] List 2\n**BOLD**`,
                    createdAt: new Date(),
                    zIndex: 2,
                },
            },
        };
    }

    handleNoteUpdate = (newNote) => {
        const newNotes = { 
            ...this.state.notes,
            [newNote.id]: newNote,
        };
        this.setState({...this.state, notes: newNotes});
    };

    handleNoteFocused = (note) => {
        const maxZIndex = Object.values(this.state.notes).reduce((a,b)=>Math.max(a.zIndex,b.zIndex));
        this.handleNoteUpdate({
            ...note,
            zIndex: maxZIndex + 1,
        });
    };

    render () {
        const { notes } = this.state;
        return Object.keys(notes).map( id => 
            <FloatingNote 
                key={`note-${id}`}
                onFocus={() => this.handleNoteFocused(notes[id])}
                onUpdate={this.handleNoteUpdate}
                note={notes[id]}
            />
        );
    }
}

export default hot(module)(App);