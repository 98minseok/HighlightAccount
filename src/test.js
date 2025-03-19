function solution(comments) {
    // 1. 모든 댓글을 id로 매핑하고 children 배열 추가
    const commentMap = {};
    comments = comments.map(e => ({ ...e, children: [] }));
    comments.forEach(e => {
        commentMap[e.id] = e;
    });

    // 2. 부모-자식 관계 연결
    comments.forEach(e => {
        if (e.parentId !== null) {
            commentMap[e.parentId].children.push(e);
        }
    });

    // 3. 최상위 노드만 결과에 추가
    const result = comments.filter(e => e.parentId === null);

    // 4. DFS로 content 출력 (보너스 요구사항)
    function printDFS(node) {
        console.log(node.content);
        node.children.forEach(child => printDFS(child));
    }
    console.log("DFS 순회 결과:");
    result.forEach(node => printDFS(node));

    return result;
}

// 테스트
const comments = [
    { id: 1, content: "안녕하세요!", parentId: null },
    { id: 2, content: "좋은 글이네요.", parentId: null },
    { id: 3, content: "반갑습니다!", parentId: 1 },
    { id: 4, content: "저도そう思います!", parentId: 2 },
    { id: 5, content: "네, 맞아요.", parentId: 3 },
];

const tree = solution(comments);
console.log("트리 구조:", JSON.stringify(tree, null, 2));