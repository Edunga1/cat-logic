---
created: 2023-05-11
---
# Game

게임과 관련된 흥미로운 개발 이야기들.

## Ultima Online

97년에 출시한 2D MMORPG. 역사가 오래된 만큼 많은 게임들의 기반이 되는 시스템을 가지고 있다.

https://en.wikipedia.org/wiki/Ultima_Online

서버-클라이언트간 패킷이 공개되어 있다.\
이를 이용하여 **사설 서버**, **매크로**와 **서드파티 프로그램**이 개발되었다.

개발 관점에서 흥미롭고 학습하기 좋은 게임이다.

나같은 경우에도 학생때 매크로를 만들어 보면서 프로그래밍에 흥미를 가지는 계기가 되었다.

### 서버 프로젝트

사설 서버를 Free Shard라고 부른다.

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

```
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

```
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
개발사는 [GGG](/docs/wiki/company.md#ggg-컨텐츠-개발-속도-이야기)이다. 뉴질랜드에 위치해 있다.

[poedb](https://poedb.tw/)는 POE의 데이터베이스를 제공한다.
개발사가 운영하는 사이트는 아니고, 클라이언트 데이터를 추출하여 제공하는 듯 하다.
[아이템 정보](https://poedb.tw/kr/Replica_Abyssus)의 최하단을 보면 추출된 데이터로 보이는 json을 제공한다.
클라이언트 데이터를 어떻게 관리하는 지 엿볼 수 있는 부분.
인벤토리 내 아이템 크기, 이름, 추가된 리그, 아이템 옵션과 옵션 범위 등 게임 상에서 보여지는 모든 정보를 제공한다.

```json
{
    "w": 2,
    "h": 2,
    "icon": "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9IZWxtZXRzL0FieXNzdXMiLCJ3IjoyLCJoIjoyLCJzY2FsZSI6MX1d/a12f5424c8/Abyssus.png",
    "league": "Affliction",
    "name": "Replica Abyssus",
    "typeLine": "Ezomyte Burgonet",
    "baseType": "Ezomyte Burgonet",
    "rarity": "Unique",
    "ilvl": 80,
    "properties": [
        {
            "name": "Armour",
            "values": [ [ "748", 1 ] ],
            "displayMode": 0,
            "type": 16
        }
    ],
    "requirements": [
        {
            "name": "Level",
            "values": [ [ "60", 0 ] ],
            "displayMode": 0,
            "type": 62
        }
    ],
    "explicitMods": [ "+23 to all Attributes" ],
    "flavourText": [ "\"While Prototype #3 does imbue its wearer with strength to match the original,\r" ],
    "replica": true,
    "frameType": 3,
    "extended": {
        "base_defence_percentile": 80,
        "ar": 823,
        "ar_aug": true,
        "mods": {
            "explicit": [ { "name": "", "tier": "", "level": 1, "magnitudes": [ { "hash": "explicit.stat_1379411836", "min": 20, "max": 25 } ] } ]
        },
        "hashes": {
            "explicit": [ [ "explicit.stat_1379411836", [ 0 ] ] ]
        },
        "text": "Item Class: Helmets"
    }
}
```

### 공식 API

https://www.pathofexile.com/developer/docs

읽기 전용 범위 내에서 API를 제공하는 듯 보인다.
대부분 서드파티 프로그램이나 사이트는 가치 계산에 집중되어 있는데,
제공하는 API를 보면 그럴 수 밖에 없는 거 같다.
계정, 캐릭터, 리그, 창고 등을 조회할 수 있다.

POE만의 방대한 패시브 스킬 트리와 아틀라스 패시브 트리는 GitHub로 공개한다.

- https://github.com/grindinggear/skilltree-export
- https://github.com/grindinggear/atlastree-export

`data.json` 파일에서 패시브 트리 데이터를 확인할 수 있다. 무자비의 경우 `ruthless.json`.
리그마다 `.json`을 갱신하므로 이전 리그에 대한 트리를 확인하려면 태그나 revision을 옮겨야 한다.

살펴보면, 스킬마다 ID가 부여되어 있고, 스킬간 연결은 `in`과 `out`으로 이루어져 있다.
예를들어 `iron reflexes(10661)`의 경우 `dexterity(8544)`로만 연결되어 있어서 `"out"=["8544"]`로 설정되어 있고,
반대로 `dexterity(8544)`는 `"in"=["16544", "11364", "58545", "10661"]`로 `iron reflexes(10661)`를 포함한다.

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

## Stardew Valley

농장 경영 게임. 내가 해 본 게임은 아니다. 그럼에도 지면을 할당하는 이유는 개발자 ConcernedApe(닉네임)가 흥미롭기 때문이다.

1인 개발자로 [Stardew Valley](https://store.steampowered.com/app/413150/Stardew_Valley/)를 개발했고, 스팀기준 리뷰만 59만개, 그 중 98%가 압도적 긍정 리뷰다.

[3천만 판매를 기록한 Stardew Valley 개발자 "나는 게임을 만든 사람일 뿐, 아직도 하루 종일 컴퓨터에 굽신거리고 있다"](https://www.gamesradar.com/games/simulation/30-million-copies-later-stardew-valley-creator-says-im-just-a-dude-who-made-a-game-and-still-spends-all-day-hunched-over-the-computer/) 기사에서 인터뷰한 내용이 있다.

> "My goal in life isn't about making money," Barone adds. "I want to create things and share them with the world. That's what it's all about. That's what I'm doing. That's what I will do, regardless of any other circumstances, as long as I can financially support myself to be able to do that. If I couldn't, I would get a job and spend my free time creating stuff to try to get back to doing that."
>
> "제 인생의 목표는 돈을 버는 것이 아닙니다."라고 Barone은 덧붙입니다. "저는 무언가를 창조하고 그것을 세상과 공유하고 싶습니다. 그게 전부입니다. 그게 제가 하고 있는 일이죠. 다른 어떤 상황과도 상관없이 재정적으로 뒷받침할 수 있는 한 그렇게 할 것입니다. 그렇게 할 수 없다면 직업을 구하고 여가 시간을 활용해 다시 그 일을 하려고 노력할 것입니다."

겸손함이 보이는 대목이다.

> "I was just making the game I wanted to play. What I would say is, I was tapping into a certain zeitgeist that I wasn't aware of, or conscious of, but I wasn't the only one who was feeling that way. We wanted to play games that were a little bit different. ... I think if I hadn't done it, someone else probably would have in a similar timeframe." 
>
> "저는 제가 하고 싶은 게임을 만들고 있었을 뿐입니다. 제가 알지 못하거나 의식하지 못했던 어떤 시대정신을 활용하고 있었지만 저만 그렇게 느낀 것은 아니었습니다. 조금은 다른 게임을 하고 싶었어요... 제가 하지 않았다면 아마 비슷한 시기에 다른 누군가가 했을 거라고 생각합니다."

본인이 하고 싶은 게임을 만들었다는 부분. 자신에게 만족스러운 게임을 만들기 위해서 노력했을 것이고, 아마 그 기준은 높을 것이다.

## Starcraft

스타크래프트. 블리자드의 전략 게임.

## 맵 에디터

스타크래프트의 맵(Map)은 사용자가 직접 제작하고 공유할 수 있다.
User Created Content(UCC) 개념이 만들어지기 전부터 있었고, UCC의 대표적인 예시가 아닐까.

![Starcraft map editor](./res/starcraft-map-editor.webp "정식 명칙은 Campaign Editor")


유즈맵은 일반 대전이 아닌 새로운 규칙을 만들 수 있어서, 새로운 재미를 선사한다.
그리고 지금 인기를 끄는 게임들도 유즈맵에서 시작한 경우도 있다.

유즈맵이 많이 제작될 수 있었던 이유는, 초보자 친화적이기 때문이다.
후에 나온 워크래프트3는 좀 더 복잡하고, 블리자드의 마지막 RTS 게임인 스타크래프트2는 더욱 복잡하다.
그래서 시대가 지날수록 유즈맵 제작은 많이 줄어들었다. 퀄리티는 높아지긴 했다.

### 트리거(Trigger)

스타크래프트의 맵 에디터는 지형, 유닛 배치를 하고, 행동을 지정할 수 있는데 이것을 트리거라고 한다.
트리거는 "어떤 지역(Location)에 유닛이 들어오면 파괴한다" 같이 이벤트 조건(Condition) - 실행(Action)의 쌍으로 이루어져 있다.
맵의 가장 중요한 요소라고 할 수 있다.

![Starcraft triggers](./res/starcraft-editor-triggers.webp)

트리거는 프로그래밍과 유사한 개념이다.
분기문, 반복문, 변수, 함수가 없지만 이를 대체할 수 있는 기능을 제공하거나 흉내낸다.
이벤트를 10번 반복하고 싶다면 맵 구석에 유닛 10개를 생성해두고 이벤트를 실행할 때 마다 유닛을 제거하는 방식으로 구현할 수 있다.

Random 함수가 없지만, 스위치 개념을 이용하여 무작위 요소를 만들어낼 수 있다.
스위치는 0과 1을 가지는 변수인데, 에디터에서 스위치 수를 고정해 두었다(255개 였나?).
원하는 스위치를 0, 1 무작위로 변경하는 액션이 있기 때문에, 50%는 스위치 하나를 무작위로 변경하면 된다.
따라서 이진 표현만 가능하기 때문에 원하는 확률을 정확하게 표현하기는 어렵다.

재밌는 점은 "터보 트리거"라는 것이다. 외국에서는 "하이퍼 트리거"라 부른다.
트리거의 반복은 1초정도 지연이 있기 때문에, 유닛 100기를 순차 생성하더라도 최소 100초가 소요된다.
이를 회피할 수 있는데, `wait 0ms` 액션을 반복하는 트리거를 만드는 것이다. 맵에서는 아무 의미없는 트리거지만,
`wait` 액션이 실행될 때 마다 다른 액션도 지연되지 않고 곧바로 실행된다.

유닛의 우선 순위가 있다는 점도 흥미롭다.
예를들어 지역에서 유닛을 1기씩 제거를 반복하는 액션을 만들었을 때,
가장 우선 선택되는 유닛은 항상 왼쪽 위 유닛이다. 왼쪽 -> 오른쪽, 위 -> 아래 순서로 우선순위가 결정된다.
이 규칙을 알고 있다면, 제거 순서에 영향받는 맵에서 배치를 조정하여 원하는 순서로 제거할 수 있다.
이러한 제약사항은 에디터의 단순함을 유지하기 위한 것이 아닌가 추측된다.

스타크래프트에서 제공하는 캠페인은 맵 에디터로 만들어지지 않은 것으로 추정한다.
오래전 본 글에서 럴커가 어느 지점에서 버러우하고 특정 시점에 버로우를 해제하는데, 이를 맵 에디터로 구현할 수 없다고 들었던 거 같다.

블리자드의 개발자들이 설립한 프로스트 자이언트 스튜디오의 RTS 게임, 2024년 7월에 출시될 예정인 스톰게이트도 맵 에디터를 지원한다고 밝혔다.
스타크래프트 2의 에디터가 너무 어려웠던 것을 인식했는지, 라이트 버전과 숙련자용 버전 모두 제공한다고 한다.[^1]

[^1]: "개발사의 전작들처럼 맵 에디터가 지원된다. 워크래프트 3처럼 빠르고 쉽게 배울 수 있는 라이트 버전과 스타크래프트 2처럼 개발사 내부에서 사용하는 것과 동일 사양의 숙련자용 버전 두 가지로 제공한다." - https://namu.wiki/w/%EC%8A%A4%ED%86%B0%EA%B2%8C%EC%9D%B4%ED%8A%B8

## 롤백 넷코드(rollback netcode)

게임에서 네트워크 지연을 최소화하기 위한 기술이다.

[격투 게임의 새로운 패러다임, 롤백 넷코드가 뭘까?](https://yozm.wishket.com/magazine/detail/2944/) 글에서 롤백 넷코드에 대해 처음 알게 되었다.

기존에는 사용자의 입력을 받고, 상대방은 상대방의 입력을 기다린 후 결과를 계산하여 화면에 보여주는 방식인 반면에,
롤백 넷코드는 상대방의 입력을 기다리지 않고, 애니메이션을 임의로 계속 처리하다가 입력을 받으면 현재 처리를 롤백하고 입력을 적용하여 다시 처리한다.

재처리를 통한 애니메이션 스킵으로 인해 사용자에게 어색함을 줄 수 있지만,
네트워크 지연이 크지 않는 이상 사람은 어색함을 느끼기 어렵다고 한다.

GGPO는 롤백 넷코드를 구현한 Rollback Networking 라이브러리로, p2p 게임에서 zero-input 네트워크 지연을 위한 라이브러리라 소개한다.
