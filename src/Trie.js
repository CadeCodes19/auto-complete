class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(prefix) {
    let node = this.root;
    for (let char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    
    const results = [];
    this._findAllWords(node, prefix.toLowerCase(), results);
    return results;
  }

  delete(word) {
  const deleteRecursively = (node, word, depth) => {
    if (!node) return false;

    if (depth === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return Object.keys(node.children).length === 0;
    }

    const char = word[depth];
    if (!deleteRecursively(node.children[char], word, depth + 1)) return false;

    delete node.children[char];
    return Object.keys(node.children).length === 0 && !node.isEndOfWord;
  };

  deleteRecursively(this.root, word.toLowerCase(), 0);
}

  _findAllWords(node, currentPrefix, results) {
    if (results.length >= 5) return; // Limit to 5 suggestions

    if (node.isEndOfWord) {
      results.push(currentPrefix);
    }

    for (let char in node.children) {
      if (results.length >= 5) return;
      this._findAllWords(node.children[char], currentPrefix + char, results);
    }
  }
}

export default Trie;
