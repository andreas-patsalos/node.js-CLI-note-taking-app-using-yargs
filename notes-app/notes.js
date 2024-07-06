const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title) // .find stops when it find the duplicate note, does not go through all the other notes in the array which is efficient
    
    debugger
    
    if (!duplicateNote) {
        notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    } 
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note removed!'))
    }
    else
        console.log(chalk.bgRed('No note found!'))
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.bgBlue('Your Notes:'))

    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()

    const searchedNote = notes.find((note) => note.title === title)

    if (!searchedNote) {
        console.log(chalk.bgRed('No such note found!'))
    } else {
        console.log(chalk.bgYellow(searchedNote.title))
        console.log(searchedNote.body)
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    } catch (e) {
        // Creates an empty file
        return []
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
