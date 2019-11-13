"use strict";
const Queue = require("./queue");

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key <= this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key <= this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("key error");
    }
  }

  remove(key) {
    if (this.key == null) {
      throw new Error("key error");
    }
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else {
      if (key <= this.key && this.left) {
        this.left.remove(key);
      } else if (key > this.key && this.right) {
        this.right.remove(key);
      } else {
        throw new Error("key error");
      }
    }
  }

  // sdfs._replaceWith(this.left)
  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.value = node.value;
        this.key = node.key;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.value = null;
        this.key = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    this.left._findMin();
  }

  // left -> node -> right
  inOrder(values = []) {
    if (this.left) {
      values = this.left.inOrder(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.inOrder(values);
    }
    return values;
  }
  // node -> left -> right
  preOrder(values = []) {
    values.push(this.value);

    if (this.left) {
      values = this.left.preOrder(values);
    }
    if (this.right) {
      values = this.right.preOrder(values);
    }
    return values;
  }

  // left -> right -> node
  postOrder(values = []) {
    if (this.left) {
      values = this.left.postOrder(values);
    }
    if (this.right) {
      values = this.right.postOrder(values);
    }
    values.push(this.value);
    return values;
  }
}

// 4. dewey decimal
function binarySearchDD(title, dd, books) {
  let start = 0;
  let end = books.length;

  while (start < end) {
    let middle = Math.floor((start + end )/ 2);
    if (books[middle].dewey === dd) {
      if (books[middle].title === title) {
        return books[middle];
      }
      for (let i = middle + 1; books[i].dewey === dd; i++) {
        if (books[i].title === title) {
          return books[i];
        }
      }
      for (let i = middle - 1; books[i].dewey === dd; i--) {
        if (books[i].title === title) {
          return books[i];
        }
      }
      return null;
    }
    if (books[middle].dewey < dd) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return null;
}

// 6. find the next commanding officer
// use breadth-first search
// input is a tree of officers
// output should be top > bottom
// output: picard, riker, data, worf, laforge, crusher, security, selar
function nextCommandingOfficer(tree, values = []) {
  const queue = new Queue();
  const node = tree;
  queue.enqueue(node);
  while (queue.length) {
    const node = queue.dequeue();
    values.push(node.value);

    if (node.left) {
      queue.enqueue(node.left);
    }
    if (node.right) {
      queue.enqueue(node.right);
    }
  }
  return values;
}

// 7. find the best profit you can make in a week
function best_profit(prices) {
  if (!prices.length) return 0;
  // Algorithm: Step through potential selling days. If the price
  // is lower than our current buying day, switch to a new buying
  // day. If the price diff between buying and selling days is
  // greater than our current best, it's our new best.
  let buy = prices[0],
    sell = prices[0],
    profit = 0;
  for (var i = 1; i < prices.length; ++i) {
    sell = prices[i];
    if (sell < buy) buy = sell;
    if (sell - buy > profit) profit = sell - buy;
  }
  return profit;
}

module.exports = BinarySearchTree;

function main() {
  // 5. implementing different tree traversals
  const bst = new BinarySearchTree();
  const dataset = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];
  for (let i = 0; i < dataset.length; i++) {
    bst.insert(dataset[i], dataset[i]);
  }
  // pre-order traversal
  // expect: 25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90>
  console.log(bst.preOrder());
  // in-order
  // expect: 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90
  console.log(bst.inOrder());
  // post-order
  // expect: 4, 12, 10, 22, 18, 24, 15, 31, 44, 35, 66, 90, 70, 50, 25
  console.log(bst.postOrder());

  // 3. dewey decimal search book using binary search
  const books = [
    { author: "Cowlishaw, Mike", dewey: "005.133", title: "The REXX Language" },
    {
      author: "Sams",
      dewey: "005.133",
      title: "Teach Yourself C++ In 21 Days"
    },
    {
      author: "Stroustrup., Bjarne",
      dewey: "005.133",
      title: "The C++ Programming Language"
    },
    {
      author: "Crockford, Douglas",
      dewey: "005.2762",
      title: "JavaScript: The Good Parts"
    },
    {
      author: "Flanagan, David",
      dewey: "005.2762",
      title: "JavaScript: The Definitive Guide"
    },
    {
      author: "Schmidt, Meinhard",
      dewey: "005.44684",
      title: "Windows Vista for Dummies"
    },
    { author: "Zondervan", dewey: "220.52081", title: "NIV Study Bible" },
    {
      author: "Humphries, Russell, Dr.",
      dewey: "231.7652",
      title: "Starlight and Time"
    },
    {
      author: "Jane, Frederick Thomas",
      dewey: "623.82509051",
      title: "Jane's Fighting Ships"
    },
    {
      author: "Norris, Chuck",
      dewey: "796.8092",
      title: "The Official Chuck Norris Fact Book"
    }
  ];
  console.log(binarySearchDD("The REXX Language", "005.133", books));
  console.log(binarySearchDD("The REXX Language", "005.44684", books));
  console.log(binarySearchDD("NIV Study Bible", "220.52081", books));

  // 6. find next commanding officer
  const officers = new BinarySearchTree(7, "Captain Picard");
  officers.insert(5, "Commander Riker");
  officers.insert(8, "Commander Data");
  officers.insert(4, "Lt. Cmdr. Wolf");
  officers.insert(6, "Lt. Cmdr. LaForge");
  officers.insert(10, "Lt. Cmdr. Crusher");
  officers.insert(3, "Lieutenant security-officer");
  officers.insert(9, "Lieutenant Selar");
  console.log(officers);
  //expect: picard, riker, data, worf, laforge, crusher, security, selar
  console.log(`officers: ${nextCommandingOfficer(officers)}`);

  // 7. best prices
  const prices = [128, 97, 121, 123, 98, 97, 105];
  console.log(best_profit(prices));
}

main();
