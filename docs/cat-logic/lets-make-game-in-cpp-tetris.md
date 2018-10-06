---
id: page-83
time: 2018-10-07 04:06:38
tags: game, C++
---
# C++로 게임 만들기: 테트리스

https://youtu.be/zH_omFPqMO4

* 절차지향으로 작성하는 코드지만 짧아서 복잡하지 않아 보인다. 생각보다 짧다.
* [SFML](https://namu.wiki/w/SFML)이라는 그래픽 라이브러리를 사용하여 만든다.
* 기존 SDL코드라는 그래픽 라이브러리가 유명한데, SFML은 나오지 얼마되지 않았지만, 좋다고 한다.
* 오픈헥사곤도 이것으로 만들어 졌다.
* 영상에서는 키보드 이벤트를 받는 코드는 있지만, 마우스 이벤트는 없다. 어떻게 할까?

[공식문서](https://www.sfml-dev.org/tutorials/2.5/graphics-draw.php)에 나와있는 튜토리얼 중 하나:

```c++
#include <SFML/Graphics.hpp>

int main()
{
    // create the window
    sf::RenderWindow window(sf::VideoMode(800, 600), "My window");

    // run the program as long as the window is open
    while (window.isOpen())
    {
        // check all the window's events that were triggered since the last iteration of the loop
        sf::Event event;
        while (window.pollEvent(event))
        {
            // "close requested" event: we close the window
            if (event.type == sf::Event::Closed)
                window.close();
        }

        // clear the window with black color
        window.clear(sf::Color::Black);

        // draw everything here...
        // window.draw(...);

        // end the current frame
        window.display();
    }

    return 0;
}
```

윈도우를 생성하고, 반복문에서 이벤트를 계속 처리하는 형태다.