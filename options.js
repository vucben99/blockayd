document.addEventListener("DOMContentLoaded", () => {
    const wordList = document.getElementById("wordList")
    const status = document.getElementById("status")

    chrome.storage.sync.get("blurWords", ({ blurWords }) => {
        if (blurWords) wordList.value = blurWords
    })

    document.getElementById("save").addEventListener("click", () => {
        chrome.storage.sync.set({ blurWords: wordList.value }, () => {
            status.textContent = "Words saved!"
            setTimeout(() => status.textContent = "", 2000)
        })
    })
})
