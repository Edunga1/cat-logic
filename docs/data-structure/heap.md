# Heap

정렬된 완전 이진 트리.

Priority Queue (우선순위 큐)라고 불리기도 함.

내림차순 / 오름차순으로 정렬되었는지에 따라 Min Heap, Max Heap라고 불린다.

Min Heap : 부모가 항상 자식보다 작은 값을 가짐.

Max Heap : 부모가 항상 자식보다 큰 값을 가짐.

* Fully Sorted 상태는 아님 - 형제간 대소구분을 하지 않음
* insert 시점에 부모와 비교, swap, 전파(swap 후 영향이 있는 인접 노드들에 전파) 함
