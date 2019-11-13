/* eslint-disable strict */
class _Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length =0;
  }

  enqueue(item) {
    const node = new _Node(item);

    if (this.head === null) {
      this.head = node;
    }
    if (this.tail) {
      this.tail.next = node;
    }
    this.length++;
    this.tail = node;
  }

  dequeue() {
    if (this.head === null) {
      return;
    }

    let node = this.head;
    this.head = this.head.next;
    if (node === this.tail) {
      this.tail = null;
    }
    this.length--;
    return node.value;
  }
}

module.exports = Queue;
