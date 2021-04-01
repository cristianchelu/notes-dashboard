const BASE_URL = "/api/notes";

const getAllNotes = () => {
    return fetch(BASE_URL, {
        method: "GET",
    }).then(response => response.json());
};

const updateNote = (note) => {
    return fetch(`${BASE_URL}/${note.id}`, {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json());
};

const deleteNote = (note) => {
    return fetch(`${BASE_URL}/${note.id}`, {
        method: "DELETE",
    }).then(response => response.json());
};

const addNote = (note) => {
    return fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json());
};

export default {
    getAllNotes,
    updateNote,
    deleteNote,
    addNote,
};