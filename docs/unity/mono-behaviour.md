# Unity

## MonoBehaviour

### Globals

#### Rigidbody.velocity

물체의 가속도

Rigidbody의 질량(mass)에 영향을 받지 않음

**유니티 메뉴얼에서는 이 값을 수정하는 것은 현실적이지 않은 결과가 나올 수 있으므로 직접 고치지 말 것을 권유하고 있다.[^1]**

#### Rigidbody.AddForce(Vector3)

물체에 힘 만큼 밀어내는 기능을 함

Rigidbody의 mass에 영향을 받음

#### Input

사용자로부터 입력값을 얻음

Method | Desc
--- | ---
Input.GetAxis("Horizontal") | 키보드 화살표 왼쪽, 오른쪽 키
Input.GetAxis("Vertical") | 키보드 위, 아래 키
Input.GetButtonDown("Fire1") | 마우스 왼쪽 버튼
Input.GetButtonDown("Jump") | 키보드 스페이스 바

#### GameObject

Scene 내에 존재하는 물체들을 획득하는데 사용

Method | Desc
--- | ---
Find(string) | 오브젝트 이름으로 게임 오브젝트를 획득

### Overrides

#### void OnCollisionEnter(Collision)

충돌 시 발생하는 이벤트 함수

다음을 만족해야 충돌 이벤트가 발생한다:

* 두 게임 오브젝트 모두 Collider가 있어야 한다.
* 둘 중 하나는 Rigidbody가 있어야 한다.
* 그리고 Rigidbody를 가진 쪽이 움직여서 서로 만났을 때만 발생한다.

#### void OnTriggerEnter(Collision)

충돌 시 발생하는 이벤트 함수
Is Trigger 허용시 충돌하더라도 물리연산이 일어나지 않는다.

다음을 만족해야 충돌 이벤트가 발생한다:

* 두 게임 오브젝트 모두 Collider가 있어야 한다.
* 둘 중 하나는 Rigidbody가 있어야 한다.
* 둘 중 하나는 Collider 컴포넌트에 Is Trigger 체크되어 있어야 한다.
* 어느 쪽이 움직이더라도 서로 만나면 이벤트가 발생한다.

오브젝트가 많아지는 경우 물리연산이 모두 발생하면 연산이 많아지므로 주로 충돌 여부만 체크할 수
있도록 하기 위해서 사용한다.

---

[^1] https://docs.unity3d.com/ScriptReference/Rigidbody-velocity.html
