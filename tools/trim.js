function trim(str){
    return str.replace(/(^ *)(\S*)( *$)/g,'$2')
}

function trimStart(str){
    return str.replace(/^ */g,'')
}

function trimEnd(str){
    return str.replace(/ *$/g,'')
}

console.log('---------------trim---------------')
console.log('|' + trim('wer') + '|')
console.log('|' + trim(' wer') + '|')
console.log('|' + trim('     wer ') + '|')
console.log('|' + trim('wer ') + '|')
console.log('|' + trim('wer     ') + '|')
console.log('|' + trim('     wer     ') + '|')
console.log('|' + trim('          ') + '|')
console.log('|' + trim('') + '|')
console.log('---------------trimStart---------------')
console.log('|' + trimStart('wer') + '|')
console.log('|' + trimStart(' wer') + '|')
console.log('|' + trimStart('     wer ') + '|')
console.log('|' + trimStart('wer ') + '|')
console.log('|' + trimStart('wer     ') + '|')
console.log('|' + trimStart('     wer     ') + '|')
console.log('|' + trimStart('          ') + '|')
console.log('|' + trimStart('') + '|')
console.log('---------------trimEnd---------------')
console.log('|' + trimEnd('wer') + '|')
console.log('|' + trimEnd(' wer') + '|')
console.log('|' + trimEnd('     wer ') + '|')
console.log('|' + trimEnd('wer ') + '|')
console.log('|' + trimEnd('wer     ') + '|')
console.log('|' + trimEnd('     wer     ') + '|')
console.log('|' + trimEnd('          ') + '|')
console.log('|' + trimEnd('') + '|')

