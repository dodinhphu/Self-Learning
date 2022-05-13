
window.onload = () => {
    const [input, output] = document.querySelectorAll(".code-area");
    const [run, clear] = document.querySelectorAll(".exercise__run-code");
    const inputCode = CodeMirror.fromTextArea(input, { lineNumbers: true, theme: "moxer" });
    const outputCode = CodeMirror.fromTextArea(output, { lineNumbers: false, theme: "icecoder" });
    const codeThread = document.querySelector(".output__result").value * 1;
    const btnNext = document.querySelector(".exercise__btn-next");
    run.addEventListener("click", () => {
        outputCode.setValue("")
        const codeToRun = inputCode.getValue().toString();
        try {
            outputCode.replaceRange(eval(`${codeToRun}`) + "\n", CodeMirror.Pos(outputCode.lastLine()));
        }
        catch (e) {
            outputCode.replaceRange('$ ' + e + "\n", CodeMirror.Pos(outputCode.lastLine()));
        }
        if (checkResult(codeThread, outputCode)) {
            btnNext.style.visibility = 'visible';
        }
        else {
            btnNext.style.visibility = 'hidden';
        }
        console.log();
    });
}
function checkResult(codeThread, outputCode) {
    var codeResult = outputCode.getDoc().getValue() * 1;
    if (codeResult.toString() === codeThread.toString()) {
        return true;
    }
    else {
        return false;
    }
}
