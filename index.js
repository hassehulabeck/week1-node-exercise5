const fs = require('fs')
const randExp = require('randexp')
const util = require('util')

const fr = util.promisify(fs.readFile)

let slumpWord = ""
let text = ""
let inputFile = '../exercise4/temp/input.txt'
let outputFile = '../exercise4/temp/output.txt'

// Skapa 100 slumpade ord.
for (let i = 0; i < 100; i++) {
    slumpWord = new randExp(/[a-zA-Z]{1,12}/)
    text += slumpWord.gen() + " "
}


fs.writeFile(inputFile, text, (err) => {
    if (err)
        console.error(err)
    else {
        console.log("Det gick att fylla filen med bråte.")
        // Kopiera innehållet i input till output.
        copyText()
    }
})

// Lite callback hell som pågår här.
function copyText() {
    fs.readFile(inputFile, (err, content) => {
        if (err)
            console.error(err)
        else
            fs.open(outputFile, "w", (openErr, fileHandle) => {
                if (openErr)
                    console.error(openErr)
                fs.write(fileHandle, content, (writeErr, bytesWritten) => {
                    if (writeErr)
                        console.error(writeErr)
                    else
                        console.log(bytesWritten + " bytes skrivna.")
                })

            })
    })
}