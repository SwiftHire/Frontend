export function wordFormatter(word){
    let words = word.split(' ');
    for (let i = 0; i < words.length; i++) {
        if (words[i].startsWith('•')) {
            words[i] = words[i].substring(1);
        }
    }
    return words.join(' ');
}