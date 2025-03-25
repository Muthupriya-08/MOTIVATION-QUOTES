document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");

    // Element references
    const elements = {
        moodSelector: "moodSelector",
        quoteText: "quoteText",
        savedQuotesList: "savedQuotesList",
        dailyQuoteText: "dailyQuoteText",
        quoteHistoryList: "quoteHistoryList",
        feedbackText: "feedbackText",
        journalEntry: "journalEntry",
        journalList: "journalList",
        gratitudeEntry: "gratitudeEntry",
        gratitudeList: "gratitudeList",
        breathingGuide: "breathingGuide"
    };
    
    for (const key in elements) {
        elements[key] = document.getElementById(elements[key]);
        if (!elements[key]) {
            console.error(`Element '${key}' not found. Check your HTML.`);
            return;
        }
    }

    const API_KEY = "/3gVBQuR5R+JWhzJ4/RmFw==2o3PXymN7ZqKdrO1"; // Replace with actual API Ninjas key
    const QUOTE_API_URL = "https://api.api-ninjas.com/v1/quotes?category=motivation";
    
    async function fetchQuote(isDaily = false) {
        try {
            const response = await fetch(QUOTE_API_URL, {
                headers: { "X-Api-Key": API_KEY }
            });
            if (!response.ok) throw new Error("Failed to fetch quote");
            
            const data = await response.json();
            const quote = `"${data[0].quote}" — ${data[0].author}`;
            
            if (isDaily) {
                elements.dailyQuoteText.innerHTML = quote;
            } else {
                elements.quoteText.innerHTML = quote;
                addToHistory(quote);
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
            fallbackQuote(isDaily);
        }
    }

    function fallbackQuote(isDaily) {
        const fallbackQuotes = [
            "Every day is a new beginning. Take a deep breath, smile, and start again.",
            "Believe in yourself and your ability to succeed.",
            "One small positive thought in the morning can change your whole day."
        ];
        const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        if (isDaily) {
            elements.dailyQuoteText.innerHTML = quote;
        } else {
            elements.quoteText.innerHTML = quote;
        }
    }

    function addToHistory(quote) {
        const historyItem = document.createElement("li");
        historyItem.textContent = quote;
        elements.quoteHistoryList.appendChild(historyItem);
    }

    function saveFavorite() {
        const quote = elements.quoteText.innerHTML;
        if (!quote) return alert("Generate a quote first!");
        const listItem = document.createElement("li");
        listItem.textContent = quote;
        elements.savedQuotesList.appendChild(listItem);
    }

    function shareQuote() {
        const quote = elements.quoteText.innerHTML;
        if (!quote) return alert("Generate a quote first!");
        alert(`Sharing Quote: \"${quote}\"`);
    }

    function clearHistory() {
        elements.quoteHistoryList.innerHTML = "";
        elements.savedQuotesList.innerHTML = "";
    }

    function submitFeedback() {
        const feedback = elements.feedbackText.value.trim();
        if (!feedback) return alert("Please enter feedback before submitting.");
        alert("Thank you for your feedback!");
        elements.feedbackText.value = "";
    }

    function saveJournal() {
        saveEntry(elements.journalEntry, elements.journalList, "Write something in your journal.");
    }

    function saveGratitude() {
        saveEntry(elements.gratitudeEntry, elements.gratitudeList, "Write something you're grateful for.");
    }

    function saveEntry(inputElement, listElement, alertMessage) {
        const entry = inputElement.value.trim();
        if (!entry) return alert(alertMessage);
        const listItem = document.createElement("li");
        listItem.textContent = entry;
        listElement.appendChild(listItem);
        inputElement.value = "";
    }

    function startBreathingExercise() {
        elements.breathingGuide.innerHTML = "Inhale... Hold... Exhale... Repeat.";
        setTimeout(() => elements.breathingGuide.innerHTML = "Relax and repeat when needed.", 5000);
    }

    function playMusic() {
        alert("Playing relaxing music...");
    }

    function stopMusic() {
        alert("Music stopped.");
    }

    function joinCommunity() {
        alert("Redirecting to support group...");
    }

    // Load daily quote on page load
    fetchQuote(true);

    // Attach functions to global scope
    window.getQuote = () => fetchQuote(false);
    window.saveFavorite = saveFavorite;
    window.shareQuote = shareQuote;
    window.clearHistory = clearHistory;
    window.submitFeedback = submitFeedback;
    window.saveJournal = saveJournal;
    window.saveGratitude = saveGratitude;
    window.startBreathingExercise = startBreathingExercise;
    window.playMusic = playMusic;
    window.stopMusic = stopMusic;
    window.joinCommunity = joinCommunity;
});
