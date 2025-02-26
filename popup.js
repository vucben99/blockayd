const toggleBtn = document.getElementById("toggleBtn")

chrome.storage.sync.get("isEnabled", ({ isEnabled }) => {
    toggleBtn.textContent = isEnabled ? "Disable Blurring" : "Enable Blurring"
})

toggleBtn.addEventListener("click", () => {
    chrome.storage.sync.get("isEnabled", ({ isEnabled }) => {
        const newState = !isEnabled
        chrome.storage.sync.set({ isEnabled: newState }, () => {
            toggleBtn.textContent = newState ? "Disable Blurring" : "Enable Blurring"
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                if (tabs[0]?.id) {
                    chrome.tabs.reload(tabs[0].id)
                }
            })
        })
    })
})
