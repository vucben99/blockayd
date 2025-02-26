const style = document.createElement("style")
style.innerHTML = `
  .blurred-text {
    filter: blur(5px);
    cursor: pointer;
  }
`
document.head.appendChild(style)

function walkTextNodes(node, words) {
    if (!node) return
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false)

    let textNode
    while ((textNode = walker.nextNode())) {
        blurText(textNode, words)
    }
}

function blurText(node, words) {
    if (!node.nodeValue.trim()) return

    let modifiedText = node.nodeValue
    let foundMatch = false

    words.forEach(word => {
        const regex = new RegExp(word.replace(/\s+/g, '\\s+'), "gi")
        if (regex.test(modifiedText)) {
            foundMatch = true
        }
    })

    if (foundMatch) {
        const parent = node.parentElement
        if (parent && !parent.classList.contains("blurred-text")) {
            parent.classList.add("blurred-text")
        }
    }
}

chrome.storage.sync.get(["blurWords", "isEnabled"], ({ blurWords, isEnabled }) => {
    if (!blurWords || !isEnabled) return

    const words = blurWords.split(",").map(w => w.trim()).filter(w => w.length > 0)
    walkTextNodes(document.body, words)
})
