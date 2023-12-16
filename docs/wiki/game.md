---
created: 2023-05-11
---
# Game

게임과 관련된 프로그래밍 이야기들.

## Ultima Online

https://en.wikipedia.org/wiki/Ultima_Online

97년에 나온 2D MMORPG. 역사가 오래된 만큼 많은 게임들의 기반이 되는 시스템을 가지고 있다.

서버-클라이언트간 패킷이 공개되어 있었다.\
이를 이용하여 **사설 서버**, **매크로**와 **서드파티 프로그램**이 개발되었다.

이런 이유로 개발 관점에서 흥미롭고 학습하기 좋은 게임이다.

나같은 경우에도 학생때 매크로를 만들어 보면서 프로그래밍에 흥미를 느꼈던 기억이 난다.

### Free Shard

이 게임에서 사설 서버를 Free Shard라고 부른다.

특히 유명한 것은 [RunUO](https://github.com/runuo/runuo), [ServUO](https://github.com/ServUO/ServUO)가 있다.

둘 다 C#으로 오픈 소스로 개발되었다. RunUO는 2020년 이후로 업데이트가 없는 것으로 보이며, ServUO는 아직도 업데이트가 이어지고 있다.
ServUO는 심지어 원본 게임의 최신 버전을 어느정도 따라가고 있어서 법적 이슈가 없는지 궁금할 정도.

서버 프로젝트라 클라이언트에 대한 컨트롤을 위해서 패킷을 보낸다.
[게임 메시지](https://github.com/ServUO/ServUO/blob/8b75a7bbf5984585804c771078e5ba8427d2a5c5/Scripts/Items/Equipment/Weapons/ShepherdsCrook.cs#L48)를 보내거나
음식 섭취 [효과음](https://github.com/ServUO/ServUO/blob/8b75a7bbf5984585804c771078e5ba8427d2a5c5/Scripts/Items/Consumables/Food.cs#L152)을 재생시킨다.

플레이어 캐릭터, NPC 등 움직이는 것에 대한 내용은 [Mobile](https://github.com/ServUO/ServUO/blob/master/Server/Mobile.cs)을 기반으로 하고\
아이템은 [Item](https://github.com/ServUO/ServUO/blob/master/Server/Item.cs#L666)을 기반으로 한다.\
모든 객체는 [IEntity](https://github.com/ServUO/ServUO/blob/master/Server/IEntity.cs#L7)를 구현한다.

클래스 관계가 방대해서 서버-클라이언트 모델을 가지는 게임을 개발하고 싶다면 학습하는데 좋은 예제가 될 것이다.

### Macro

게임 자체가 장황한 행동(낭만)을 요구하기 때문에 모두 수동으로 플레이하면 버거운 편이다.
예를 들면 입을 거리를 만드려면 양에게서 양모를 얻고, 베틀과 물레로 실을 만들고, 실로부터 천을 만들고, 천으로 옷을 만들어야 한다.

이런 행동을 자동화하기 위해서 많은 매크로 프로그램이 있다.

#### EasyUO

![EasyUO](https://pangaea.myramidnight.com/wiki/images/thumb/b/bb/Easyuo.png/300px-Easyuo.png)

Home: https://www.easyuo.com \
Wiki: http://wiki.easyuo.com/index.php?title=Main_Page

스크립트 기반 매크로 프로그램이다. 자체 언어를 사용한다.
플레이어 체력, 주변 몬스터 및 객체 등 게임 프로퍼티를 제공하는 것부터 시작해서 GUI까지 개발할 수 있는 환경을 제공한다.
GUI를 개발하는 프로그램도 있다.

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

`finditem`은 컨테이너(캐릭터 가방, 땅, 상자 등)에서 아이템을 찾는 명령어이고\
`#FINDSTACK`와 같이 `#`으로 시작하는 것은 게임 시스템 변수를 의미한다.\
`gosub`은 사용자가 정의한 서브루틴(함수)을 호출하는 명령어이다.

이외에도 마우스 이동과 클릭을 재현할 수 있다.
이는 클라이언트 내에서만 영향이 있기 때문에, 클라이언트 밖에 영향을 미치지 않는다.

#### OpenEUO

http://www.easyuo.com/openeuo/wiki/index.php/First_Steps

EasyUO를 개선한 것으로, 스크립트 언어로 Lua를 사용한다.
Lua의 기능을 사용할 수 있기 때문에 파일에 접근하거나 모듈화를 더 쉽게 할 수 있다.

```lua
UO.Macro(8,2)
wait(1000)
UO.Msg("Hi, my name is " .. UO.CharName .. "!\n")
print("UO.CharName = " .. UO.CharName)
```

`UO` 객체를 통해 게임에 접근한다.
마찬가지로 GUI 개발도 가능하다.

#### UOSteam

https://www.uosteam.com/

게임 Assist 프로그램이다. 자체 매크로 기능을 제공하는데 자체 스크립트 언어를 사용한다.

이와같은 Assist 프로그램은 많이 있는데, 이 프로그램이 가장 유명하다.
게임 화면에 렌더링하기 전에 패킷을 가로채어(추정) 처리하기 때문에 매우 빠른 반응속도를 보인다.

예를들면 사용자에게 다이얼로그(Gump라 부른다)를 보여주고 클릭하는 것을 클라이언트에서 렌더링하기 전에 처리해버린다.
그래서 이 프로그램으로 캐릭터를 조작하면 프로그램을 사용하지 않는 사용자는 반응속도 측면에서 매우 불리한 상황이 된다.

```uos
usetype '0xf6c' 'any' 'ground' '2'
waitforgump 'any' 15000
replygump 0xdd8b146a 1
```

#### Classic Assist

https://github.com/Reetus/ClassicAssist

![Classic Assist](https://user-images.githubusercontent.com/6239195/73602827-d51b7e00-45b4-11ea-96c4-64bef454e36f.png)

Assist 프로그램. 오픈소스 프로젝트라 이런 프로그램은 어떻게 만드는지 알고 싶으면 공부가 될 거 같다.

UOSteam처럼 자체 매크로를 제공하는데, 스크립트언어로 [파이썬](./python.md)을 사용한다!
Lua는 장황하고, 자체 스크립트 언어는 단순하지만 확장성이 떨어지지만, 파이썬을 사용하다보니 가장 만족도가 높다.

## Path Of Exile

POE.

## Path Of Building

일명 POB. Path Of Exile의 빌드 계산기.

https://github.com/PathOfBuildingCommunity/PathOfBuilding

게임 자체가 매우 복잡한 시스템을 가지고 있어서, 사람이 직관적으로 수치를 계산하기 어려운 점이 많은 게임이다.
게임 내에서 표기되는 수치는 매우 제한되어 있다. POB는 보이지 않는 수치들을 동일하게 계산하고, 보여준다.

프로그램은 Lua로 100% 작성되어 있다.

게임은 상황에 따라서 DPS가 달라진다. 예를들어 1:1 전투나 1:N 전투에 따라서 DPS가 달라지는데 이런 상황을 고려할 수 있도록 다양한 전투 상황을 위한 설정을 제공한다.

POB의 최초 제작자는 POE 게임사인 ggg에 입사하였다.
