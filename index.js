const fs = require('fs')
const randExp = require('randexp')
const util = require('util')

/*
Promisify gör så att funktionen inom parentes "omvandlas" från en callback till ett promise, och därmed kan vi använda promise med .then-chaining eller async/await om vi hellre vill det. */

const rf = util.promisify(fs.readFile)
const op = util.promisify(fs.open)
const wr = util.promisify(fs.write)

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

/* Inget callback hell kvar, bara lättläst async/await.
Notera att funktionerna rf (readFile), op (open) och wr (write) fungerar exakt som i sitt vanliga callback-läge, förutom att vi tagit bort den avslutande callback-funktionen i slutet av parentesen.
*/
async function copyText() {
    let content = await rf(inputFile)
    let openfile = await op(outputFile, "w")
    await wr(openfile, content)
    result = content.toString('utf-8')
    console.log(result)
}