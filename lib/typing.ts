// @ts-nocheck
export function typing(contentToWrite, myContent, cb) {

    let charIndex = -1;
    let stringLength = 0;
    let inputText;

    function writeContent(init) {
        if (init) {
            inputText = contentToWrite.innerHTML;
        }
        if (charIndex == -1) {
            charIndex = 0;
            stringLength = inputText.length;
        }
        let initString = myContent.innerHTML;
        initString = initString.replace(/<SPAN.*$/gi, "");
        let theChar = inputText.charAt(charIndex);
        let nextFourChars = inputText.substr(charIndex, 4);
        if (nextFourChars == '<BR>' || nextFourChars == '<br>') {
            theChar = '<BR>';
            charIndex += 3;
        }
        initString = initString + theChar + "<SPAN id='blink'>_</SPAN>";
        myContent.innerHTML = initString;
        charIndex = charIndex / 1 + 1;
        if (charIndex % 2 == 1) {
            document.getElementById('blink').style.display = 'none';
        } else {
            document.getElementById('blink').style.display = 'inline';
        }
        if (charIndex < stringLength) {
            setTimeout(()=>writeContent(false), 240);
        } else if(charIndex == stringLength) {
            document.getElementById('blink').style.display = 'none';
            cb();
            return;
        } else {
            blinkSpan();
        }
    }

    let currentStyle = 'inline';

    function blinkSpan() {

        if (currentStyle == 'inline') {
            currentStyle = 'none';
        } else {
            currentStyle = 'inline';
        }
        document.getElementById('blink').style.display = currentStyle;
        setTimeout(blinkSpan, 100);
    }
    writeContent(true)
}
