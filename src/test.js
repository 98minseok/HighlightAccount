class MinHeap{

    constructor(){
        this.heap = [];
    }

    push(value){
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp(){
        let index = this.heap.length -1;
        while (index > 0){
            let parentIndex = Math.floor((index-1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex],this.heap[index]] = [this.heap[index],this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    pop(){
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    }

    heapifyDown(){
        let index = 0;
        const length = this.heap.length;

        while(true){
            let smallest = index;
            let left = 2* index+1;
            let right = 2* index+2;

            if(left < length && this.heap[left] < this.heap[smallest]) smallest = left;
            if(right < length && this.heap[right] < this.heap[smallest]) smallest = right;

            if (smallest === index) break;
            [this.heap[index] , this.heap[smallest]] = [this.heap[smallest], this.heap[index]]
            index = smallest;
        }
    }
}