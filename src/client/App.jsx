import React from "react";
import { hot } from "react-hot-loader";
import { FloatingNote } from "./components/Note";
import NotesService from "./services/NoteService";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            notesUI: {},
        };
    }

    componentDidMount () {
        this.reloadNotes();
        window.addEventListener("beforeunload", this.onLeave);
    }

    componentWillUnmount () {
        window.removeEventListener("beforeunload", this.onLeave);
    }

    reloadNotes = () => {
        NotesService.getAllNotes().then(res => {
            
            // initialize z-indexes
            const notesUI = {}; 
            res.data.map((note, i) => {
                notesUI[note.id] = {
                    zIndex: i,
                    status: "READY",
                };
            });

            this.setState({
                ...this.state,
                notes: res.data,
                notesUI,
            });
        });
    };

    onLeave = (ev) => {
        const activeRequests = Object.values(this.state.notesUI)
            .find( n => n.status == "LOADING");
        if (activeRequests) {
            ev.preventDefault;
            ev.returnValue = "MESSAGE!";
            return "MESSAGE!";
        }
    };

    handleNoteUpdate = (newNote) => {
        const newNotesUI = {...this.state.notesUI};
        newNotesUI[newNote.id].status = "LOADING";

        const newNotes = [...this.state.notes];
        const idx = this.state.notes.findIndex( n => n.id == newNote.id );
        newNotes[idx] = newNote;

        this.setState({
            ...this.state, 
            notes: newNotes,
            notesUI: newNotesUI,
        });

        this.syncNote(newNote);
    };

    syncNote = async (note) => {
        let noteStatus;
        try {
            const res = await NotesService.updateNote(note);
            noteStatus = "READY";
            console.log(res);
        } catch (err) {
            noteStatus = "FAILED";
            console.log(err);
        } finally {
            const notesUI = { ...this.state.notesUI };
            notesUI[note.id].status = noteStatus;
            
            this.setState({
                ...this.state,
                notesUI,
            });
        }
    };

    handleNoteFocused = (note) => {
        const newNotesUI = { ...this.state.notesUI };
        
        const maxZIndex = Object.values(newNotesUI)
            .reduce( (a, b) => Math.max(a.zIndex,b.zIndex) );

        newNotesUI[note.id].zIndex = maxZIndex + 1;
        
        this.setState({
            ...this.state,
            notesUI: newNotesUI,
        });
    };

    render () {
        const { notes, notesUI } = this.state;
        return notes.map( note => 
            <FloatingNote 
                key={`note-${note.id}`}
                onFocus={() => this.handleNoteFocused(note)}
                onUpdate={this.handleNoteUpdate}
                note={note}
                status={notesUI[note.id].status}
                zIndex={notesUI[note.id].zIndex}
            />
        );
    }
}

export default hot(module)(App);