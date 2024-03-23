---
created: 2023-05-11
---
# Game

게임과 관련된 개발 이야기들.

## Ultima Online

https://en.wikipedia.org/wiki/Ultima_Online

97년에 나온 2D MMORPG. 역사가 오래된 만큼 많은 게임들의 기반이 되는 시스템을 가지고 있다.

서버-클라이언트간 패킷이 공개되어 있다.\
이를 이용하여 **사설 서버**, **매크로**와 **서드파티 프로그램**이 개발되었다.

개발 관점에서 흥미롭고 학습하기 좋은 게임이다.

나같은 경우에도 학생때 매크로를 만들어 보면서 프로그래밍에 흥미를 가지는 계기가 되었다.

### 서버 프로젝트

이 게임에서 사설 서버를 Free Shard라고 부른다.

이런 사설 서버들이 사용하는 서버 프로젝트로 [RunUO](https://github.com/runuo/runuo), [ServUO](https://github.com/ServUO/ServUO)가 있다.

둘 다 C#으로 오픈 소스로 개발되었다. RunUO는 2020년 이후로 업데이트가 없는 것으로 보이며, ServUO는 아직도 업데이트가 이어지고 있다.

#### ServUO

서버는 클라이언트를 컨트롤하기 위한 패킷을 보낸다.

[게임 메시지](https://github.com/ServUO/ServUO/blob/8b75a7bbf5984585804c771078e5ba8427d2a5c5/Scripts/Items/Equipment/Weapons/ShepherdsCrook.cs#L48)를 보내거나
음식 섭취 [효과음](https://github.com/ServUO/ServUO/blob/8b75a7bbf5984585804c771078e5ba8427d2a5c5/Scripts/Items/Consumables/Food.cs#L152)을 재생시킨다.

플레이어 캐릭터, NPC 등 움직이는 것은 [Mobile](https://github.com/ServUO/ServUO/blob/master/Server/Mobile.cs)을 기반으로 하고\
아이템은 [Item](https://github.com/ServUO/ServUO/blob/master/Server/Item.cs#L666)을 기반으로 한다.\
모든 클래스는 [IEntity](https://github.com/ServUO/ServUO/blob/master/Server/IEntity.cs#L7)를 구현한다.

내용이 방대해서 서버-클라이언트 모델을 가지는 게임을 개발하고 싶다면 학습하는데 좋은 예제가 될 것이다.

##### ServUO 코드 분석

**BaseCreature**

[BaseCreature](https://github.com/Ultima-Lokai/ServUO-Test/blob/master/Scripts/Mobiles/BaseCreature.cs#L179)는 몬스터의 기반 클래스이다.

[Zombie](https://github.com/ServUO/ServUO/blob/master/Scripts/Mobiles/Normal/Zombie.cs#L7) 몬스터의 경우\
이름은 `a zombie`이고, `Body` 그래픽 ID는 `3`이다.

[룻 품질](https://github.com/ServUO/ServUO/blob/master/Scripts/Mobiles/Normal/Zombie.cs#L49)은 [Meager](https://github.com/ServUO/ServUO/blob/master/Scripts/Misc/LootPack.cs#L503), 빈약한 품질을 가진다.

---

[Mobile의 `Body`](https://github.com/ServUO/ServUO/blob/master/Server/Mobile.cs#L9178)가 클라이언트에 보여줄 그래픽이 아닌가 추정한다.\
그러니까, 클라이언트와 서버가 약속으로 정한 번호로 보여줄 그래픽을 결정하는 거 같다.

[Mobile의 `Deserialize`](https://github.com/ServUO/ServUO/blob/master/Server/Mobile.cs#L5394)는 데이터소스로부터 데이터를 읽어오는 메서드 같다.

### Macro

게임 자체가 장황한 행동(낭만)을 요구하기 때문에 수동으로 플레이하기 버거운 편이다.
예를 들면 옷을 만드려면 양에게서 양모를 얻고, 베틀과 물레로 실을 만들고, 실로부터 천을 만들고, 천으로 옷을 만드는 과정을 거친다.

이런 일련의 작업을 자동화하기 위한 매크로 프로그램이 많다.

#### EasyUO

스크립트 기반 매크로 프로그램이다. 자체 언어를 사용한다.

![EasyUO](https://pangaea.myramidnight.com/wiki/images/thumb/b/bb/Easyuo.png/300px-Easyuo.png)

Home: https://www.easyuo.com \
Wiki: http://wiki.easyuo.com/index.php?title=Main_Page

플레이어 체력, 주변 몬스터 및 객체 등 게임 프로퍼티를 서버 패킷으로부터 분석하여 제공한다.

GUI를 전용으로 개발하기 위한 별도 프로그램이 있다.

```easyuo
finditem ENK C_ , #BACKPACKID
if #FINDSTACK < %cost
   gosub GetMetal
click %X %Y
gosub GetGump
if #WEIGHT > %maxWt
   gosub smelt
finditem %weapon C_ , #BACKPACKID
```

- `finditem`은 컨테이너(캐릭터 가방, 땅, 상자 등)에서 아이템을 찾는 명령어다.
- `#FINDSTACK`와 같이 `#`으로 시작하는 것은 게임 시스템 변수이다. 서버 패킷으로부터 갱신된다.
- `gosub`은 사용자가 정의한 서브루틴(함수)을 호출하는 명령어이다.

마우스 이동과 클릭을 재현할 수 있다.
게임 클라이언트 내에서만 영향이 있기 때문에, 호스트에 영향을 미치지 않는다.

#### OpenEUO

EasyUO를 개선한 것으로, 스크립트 언어로 Lua를 사용한다.

http://www.easyuo.com/openeuo/wiki/index.php/First_Steps

Lua의 기능을 사용할 수 있기 때문에 파일에 접근하거나 모듈화를 더 쉽게 할 수 있다.

```lua
UO.Macro(8,2)
wait(1000)
UO.Msg("Hi, my name is " .. UO.CharName .. "!\n")
print("UO.CharName = " .. UO.CharName)
```

`UO` 객체를 통해 게임에 접근한다.

#### UOSteam

게임 Assist 프로그램이다. 자체 매크로 기능을 제공하는데 자체 스크립트 언어를 사용한다.

https://www.uosteam.com/

이와같은 Assist 프로그램은 많이 있는데, 이 프로그램이 가장 유명하다.
게임 화면에 렌더링하기 전에 패킷을 가로채어(추정) 처리하기 때문에 매우 빠른 반응속도를 보인다.

예를들면 사용자에게 다이얼로그(Gump라 부른다)를 보여주고 클릭하는 것을 클라이언트에서 렌더링하기 전에 처리한다.
그러면 게임 클라이언트는 다이얼로그를 보여줄 필요 없이, 클릭한 내용을 서버로 전송한다.
그래서 이 프로그램으로 캐릭터를 조작하면 프로그램을 사용하지 않는 사용자보다 훨씬 유리한 상황이 된다.

```uos
usetype '0xf6c' 'any' 'ground' '2'
waitforgump 'any' 15000
replygump 0xdd8b146a 1
```

#### Classic Assist

Assist 프로그램. 오픈소스 프로젝트라 이런 프로그램은 어떻게 만드는지 알고 싶으면 공부가 되겠다.

https://github.com/Reetus/ClassicAssist

![Classic Assist](https://user-images.githubusercontent.com/6239195/73602827-d51b7e00-45b4-11ea-96c4-64bef454e36f.png)

UOSteam처럼 자체 매크로를 제공하는데, 스크립트언어로 [파이썬](./python.md)을 사용한다!
Lua는 장황하고, 자체 스크립트 언어는 단순하지만 확장성이 떨어지지만, 파이썬을 사용하니 가장 만족도가 높다.

## Path Of Exile

일명 POE. 핵앤슬래시 게임이다.

### Path Of Building

일명 POB. Path Of Exile의 빌드 계산기.

https://github.com/PathOfBuildingCommunity/PathOfBuilding

매우 복잡한 시스템을 가지고 있다.
수 많은 게임 속성이 있고, 대부분 게임 내에서 표기되지 않아서 사람이 수치를 계산하기 어려운 점이 많은 게임이다.
POB는 보이지 않는 수치들을 시뮬레이션하여 계산하고 보여준다.

프로그램은 Lua로 100% 작성되어 있다.

게임은 상황에 따라서 DPS가 달라진다.
예를들어 1:1 전투나 1:N 전투에 따라서 DPS가 달라진다고 할 수 있는데, 이런 상황을 시뮬레이션할 수 있는 설정 기능을 제공한다.

POB의 최초 제작자는 POE 게임사인 ggg에 입사하였다.

### PoeStack

PoeStack은 게임 API와 게임 디스코드 채널을 연동하여 거래를 시스템화한 서비스다.
디스코드의 거래 채팅(`~를 ~에 팝니다`)을 웹 사이트로 시스템화하여 보여준다.

https://poestack.com/

모든 기능을 사용하기 위해서 2가지 연동을 해야한다.

- POE 계정 연동하여 아이템 창고를 조회 및 가치를 계산.
- 디스코드 채널 연동하여 거래 메시지를 읽고, 거래 메시지를 작성한다.

반 자동화로 구현해서 느슨하게 잘 구현했다고 생각한다.
모든 기능을 자동화하면 게임의 변경 사항을 따라가기 어려웠을 것이다.

디스코드는 채팅 플랫폼일 뿐이지만, PoeStack을 통해서 거래 메시지를 양식에 맞춰서 전송한다.
양식에 맞춰져 있어서 거래 메시지를 읽어 들여서 웹 사이트에서 보여줄 수 있다.

게임을 연동했기 때문에 보유한 아이템에 대한 신뢰성을 제공한다.
단순히 거래 채팅만 수집했다면 시세를 조작하거나, 가짜 아이템 등 신뢰성이 떨어졌을 것이다.
게임 내에 많은 화폐 아이템들이 있는데, 교환비를 계산해주는 편리 기능도 제공한다.

기능 요약:

- 창고 아이템을 조회해서 화폐 가치를 계산한다.
- 아이템 판매를 위해 디스코드 채널에 전송할 메시지를 자동 전송한다.
- 아이템 구매를 위해 디스코드 채널에 전송된 메시지를 읽어서 웹 사이트에서 보여준다.
- 여러 품목들을 카테고리화하여 큐레이션한다.
- 실제 게임 내에서 거래할 수 있도록 귓속말 양식을 복사한다.(이 게임은 전세계 사용자들과 플레이하기 때문에 언어 문제가 있다.)
- 화폐 아이템 가치를 현재 환율에 맞게 자동 계산해준다.

GitHub Organization이 존재하는데, PoeStack 프로젝트는 공개되지 않은 것으로 보인다.
https://github.com/PoeStack
