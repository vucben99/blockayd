chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get("isEnabled", ({ isEnabled }) => {
        if (isEnabled === undefined) {
            chrome.storage.sync.set({ isEnabled: true })
        }
    })
})
