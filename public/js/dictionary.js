//https://openbase.com/js/google-dictionary-api

// Get form elements for dictionary search
var searchInput = document.getElementById("dictionarySearchInput");
var searchButton = document.getElementById("dictionarySearchButton");
var pinButton = document.getElementById("dictionaryPinButton");

var elementWord = document.getElementById("dictWord");
var elementPhonetic = document.getElementById("dictPhonetic");
var elementDefinitions = document.getElementById("dictDefinitions");
var elementSynonyms = document.getElementById("dictSynonyms");

var elementPinnedSmallList = document.getElementById("dictPinnedSmallList");
var elementPinnedList = document.getElementById("dictPinnedList");
var elementRecentList = document.getElementById("dictRecentList");

var pinned = new Array(); // Pinned words.
var recent = new Array(); // Recent words.

// Pinned word + data
class Pin {
  constructor(word, phonetic, definition)
  {
    this.word = word;
    this.phonetic = phonetic;
    this.definition = definition;
  }
}

// Apply enter event on search input
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

// Apply click event on search button
searchButton.addEventListener("click", function(event){
  event.preventDefault();
  scrapeDefinition(searchInput.value);
});

// XMLHTTPRequest to pull data from google definitons api
function scrapeDefinition(word)
{
  if (word.length > 0)
  {
    let trimmed = word.replace(/\s+/g, '');

    let requestString = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + trimmed;
    var request = new XMLHttpRequest();
    request.open('GET', requestString);

    request.onload = function() {
      // Parse the response from the API as JSON data and store in a variable
      let data = JSON.parse(this.response);
      // console.log(data); // Uncomment to see the returned response

      // Check the status codes to see if the request was successful
      if (request.status >= 200 && request.status < 400) {
        updatePage (data); // Process data if success
      } else {
        // Highlight the input red, if the word cannot be found.
        console.log("Error, unable to access API. Error: " + request.status);
        searchInput.classList.add('wrong');
      }
    }
    // Send request for processing - important that this is after the onload function
    request.send();
  } else {
    // empty word input
    searchInput.classList.add('wrong');
  }
}

// Removes the "wrong" class (highlighting input red), after the user changes input
function searchInputChanged()
{
  searchInput.classList.remove('wrong');
}

// Update word on page
function updatePage (data)
{

  // If empty refresh with the previous word
  if (data == null)
  {
    console.log("Page updated with no word.");
    return;
  }

  let word = "";
  let phonetic = "";
  let meanings = new Array();
  let synonyms = new Array();

  // Update elements on page
  word = data[0].word;
  elementWord.textContent = word;

  phonetic = data[0].phonetic;
  if (phonetic == null)
  {
    phonetic = "No Phonetics on file.";
    for (let i = 0; i < data[0].phonetics.length; i++)
    {
      if (data[0].phonetics[i].text != null)
        phonetic = data[0].phonetics[i].text;
    }
  }

  elementPhonetic.textContent = "[ " + phonetic + " ]";

  meanings = data[0].meanings;
  elementDefinitions.innerHTML ="";
  elementSynonyms.innerHTML = "";
  for (let i = 0; i < meanings.length; i++)
  {
    elementDefinitions.innerHTML += "<h3>" + meanings[i].partOfSpeech + "</h3>";
    for (let j = 0; j < Math.min(meanings[i].definitions.length, 2); j++)
    {
      elementDefinitions.innerHTML += "<p>" + meanings[i].definitions[j].definition + "</p>";
    }
    for (let k = 0; k < meanings[i].synonyms.length; k++)
    {
      elementSynonyms.innerHTML += "<li onclick='return scrapeDefinition(\"" + meanings[i].synonyms[k] + "\");'>" + meanings[i].synonyms[k] + "</li>";
    }
  }
  if (elementDefinitions.innerHTML == "")
    elementDefinitions.innerHTML = "No definitions found.";
  if (elementSynonyms.innerHTML == "")
    elementSynonyms.innerHTML = "None found.";

  updatePinElements();

  elementRecentList.innerHTML = "";
  for (let i = 0; i < recent.length; i++)
  {
    elementRecentList.innerHTML += "<li onclick='return scrapeDefinition(\"" + recent[i] + "\");'>" + recent[i] + "</li>";
  }

  // Update Pin button
  dictionaryPinButton.setAttribute("data-word", word);
  dictionaryPinButton.setAttribute("data-phonetic", phonetic);
  dictionaryPinButton.setAttribute("data-definition", "definition");
  dictionaryPinButton.textContent = "Pin word!";

  // If already pinned update text
  for (let i = 0; i < pinned.length; i++)
  {
    if (pinned[i].word == word)
      dictionaryPinButton.textContent = "Unpin word!";
  }

  // Add to recent list if not already there, if there, remove and move to top
  for (let i = 0; i < recent.length; i++)
  {
    if (word == recent[i])
      recent.splice(i, 1);
  }
  recent.unshift(word);
  // Shorten recent if more than 6 previous results
  if (recent.length > 6)
    recent.pop();
  // Save recents
  saveDictionary();
}

// Toggle the PinUnpin Button
function clickedPinUnpin()
{
  let word = dictionaryPinButton.dataset.word;
  let phonetic = dictionaryPinButton.dataset.phonetic;
  let definition = "definition"; //dictionaryPinButton.dataset.definition;

  let pin = new Pin(word, phonetic, definition);

  let pinnedAlready = false;

  // Check if Pin is valid and already pinned
  if (word != "")
  {
    for (let i = 0; i < pinned.length; i++)
    {
      if (pinned[i].word == pin.word)
        pinnedAlready = true;
    }

    // Add or remove from pins, depending on presence
    if (pinnedAlready)
    {
      unpinWord(pin);
      dictionaryPinButton.textContent = "Pin word!";
    } else {
      pinWord(pin);
      dictionaryPinButton.textContent = "Unpin word!";
    }
    // Save pins
    saveDictionary();
    // Refresh visuals
    updatePinElements();
  }
}

// Add word to pinned list
function pinWord(pin)
{
  pinned.push(pin);
  console.log("Pinned: '" + pin.word + "'");
}

// Remove word from pinned list
function unpinWord(pin)
{
  for (let i = 0; i < pinned.length; i++)
  {
    if (pinned[i].word == pin.word)
    {
      pinned.splice(i, 1);
      console.log("Unpinned: '" + pin.word + "'");
    }
  }
}

// Update the dom elements with pins
function updatePinElements()
{
  elementPinnedSmallList.innerHTML = "";
  elementPinnedList.innerHTML = "";

  for (let i = 0; i < pinned.length; i++)
  {
    elementPinnedSmallList.innerHTML += "<li onclick='return scrapeDefinition(\"" + pinned[i].word + "\");'><h2>" + pinned[i].word + "</h2></li>";
    elementPinnedList.innerHTML += "<li onclick='return scrapeDefinition(\"" + pinned[i].word + "\");'><h2>" + pinned[i].word + "</h2><span>[ " + pinned[i].phonetic + " ]</span><div class='break'></div><p>" + pinned[i].definition + "</p></li>";
  }
}

// Save Pinned and Recent Lists to localStorage
function saveDictionary()
{
  localStorage.setItem('pinned', JSON.stringify(pinned));
  localStorage.setItem('recent', JSON.stringify(recent));
}

// Update Pinned List from localStorage
function loadPinned()
{
  return JSON.parse(localStorage.getItem('pinned'));
}

// Update Recent List from localStorage
function loadRecent()
{
  return JSON.parse(localStorage.getItem('recent'));
}


// Load from localStorage
pinned = loadPinned();
recent = loadRecent();

if (recent.length > 0)
{
  scrapeDefinition(recent[0]);
}
else {
  scrapeDefinition("hello");
}
