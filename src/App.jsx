import { useState, useEffect, useMemo } from 'react'
import Trie from './Trie'

const SAMPLE_WORDS = [
  "apple", "apricot", "application", "banana", "band", "bandana", "cat", "caterpillar", "cattle",
  "dog", "dolphin", "door", "elephant", "elevator", "eleven", "fish", "fisherman", "fist",
  "grape", "graph", "graphic", "hat", "hatch", "hate", "ice", "iceberg", "icicle",
  "juice", "jump", "jungle", "kite", "kitten", "kitchen", "lemon", "lemonade", "lemur",
  "monkey", "money", "monitor", "nose", "note", "notebook", "orange", "orbit", "organ",
  "pencil", "penguin", "penny", "queen", "quest", "question", "rabbit", "race", "racket",
  "sun", "sunny", "sunset", "tiger", "ticket", "title", "umbrella", "umpire", "uncle",
  "van", "vanilla", "vanish", "water", "watch", "watermelon", "xylophone", "x-ray",
  "yellow", "yell", "year", "zebra", "zero", "zone", "antigravity", "ant", "anti",
  "ball", "base", "basket", "call", "camera", "camp", "dance", "danger", "dark",
  "eagle", "ear", "early", "fan", "fancy", "fantastic", "garden", "garlic", "gas",
  "happy", "harbor", "hard", "igloo", "ignite", "ignore", "jacket", "jade", "jail"
];

function App() {
  const [trie] = useState(new Trie());
  const [insertValue, setInsertValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Initialize Trie with sample words
  useEffect(() => {
    SAMPLE_WORDS.forEach(word => trie.insert(word));
  }, [trie]);

  const handleInsert = (e) => {
    e.preventDefault();
    if (insertValue.trim()) {
      trie.insert(insertValue.trim());
      setInsertValue('');
      // Re-run search if the inserted word matches current search
      if (searchValue) {
        setSuggestions(trie.search(searchValue));
      }
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      setSuggestions(trie.search(value));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (word) => {
    setSearchValue(word);
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-sm">
            Auto Prefixer
          </h1>
          <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">
            powered by trie data structure
          </p>
        </div>

        

        {/* Search Section */}
        <div className="relative z-10">
          <label className="block text-sm font-semibold text-slate-300 ml-1 mb-2">
            Search
          </label>
          <div className="relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl opacity-50 blur transition duration-500 group-hover:opacity-75 ${isFocused ? 'opacity-100' : ''}`}></div>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click
              placeholder="Start typing to search..."
              className="relative w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-0 transition-all duration-200"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {suggestions.length > 0 && (searchValue) && (
            <div className="absolute w-full mt-2 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <ul>
                {suggestions.map((word, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSuggestionClick(word)}
                      className="w-full text-left px-5 py-3 text-slate-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-150 flex items-center group cursor-pointer"
                    >
                      <span className="text-slate-500 mr-3 group-hover:text-indigo-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                      </span>
                      {word}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Insert Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-xl">
          <form onSubmit={handleInsert} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-300 ml-1">
              Add New Word
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={insertValue}
                onChange={(e) => setInsertValue(e.target.value)}
                placeholder="e.g. 'microservice'"
                className="flex-1 bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 active:scale-95 cursor-pointer"
              >
                Add
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default App
