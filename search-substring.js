// peterpattigrew
// patt
function isSubstring(str, substr) {
    const windowLen = substr.length;
    for (let i = 0; i < str.length - windowLen; i++) {
        let currentSubstring = str.substring(i, windowLen + i);
        console.log(currentSubstring);
        if (currentSubstring === substr) {
            return true;
        }
    }
    return false;
}

console.log(isSubstring('peter pattigrew', 'patt'));
