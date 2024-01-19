# SFML

Simple and Fast Multimedia Library. 줄여서 SFML이라 한다.
멀티미디어를 가져오거나 그리고, Window를 만드는 API를 제공한다.

SDL코드라는 그래픽 라이브러리가 유명한데, SFML은 나오지 얼마되지 않았지만, 좋다고 한다. 오픈헥사곤도 SFML로 만들어 졌다.

C++ 라이브러리로 사용하거나 다른 언어의 바인딩을 통해 사용할 수 있다.
[rust](https://github.com/jeremyletang/rust-sfml), [python](https://github.com/intjelic/python-sfml), [Node.js](https://github.com/XadillaX/sfml.js) 등.

[공식문서](https://www.sfml-dev.org/tutorials/2.5/graphics-draw.php)에 나와있는 튜토리얼 중 하나:

```cpp
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

윈도우를 생성하고, 반복문에서 이벤트를 계속 처리하는 구조다.

## SFML 프로젝트 빌드하기

OSX 기준.

1. SFML 라이브러리를 다운받는다. **homebrew**로 설치하면 간단하다. `$ brew install sfml`
1. 빌드 도구 CMake를 다운받는다. **homebrew**는 `$ brew install cmake`

**아래부터는 [이 링크](https://github.com/SFML/SFML/wiki/Tutorial%3A-Build-your-SFML-project-with-CMake)에 따름**

2. 프로젝트 루트에 `cmake_modules` 폴더를 생성
2. [FindSFML.cmake](https://github.com/SFML/SFML-Game-Development-Book/blob/master/CMake/FindSFML.cmake) 작성하고, `cmake_modules` 안에 둔다.
2. `CmakeLists.txt` 작성하여 프로젝트 루트에 둔다. 위 폴더와는 관련 없다.
    ```cpp
    #Change this if you need to target a specific CMake version
    cmake_minimum_required(VERSION 2.6)


    # Enable debug symbols by default
    # must be done before project() statement
    if(NOT CMAKE_BUILD_TYPE)
      set(CMAKE_BUILD_TYPE Debug CACHE STRING "Choose the type of build (Debug or Release)" FORCE)
    endif()
    # (you can also set it on the command line: -D CMAKE_BUILD_TYPE=Release)

    project(myproject)

    # Set version information in a config.h file
    set(myproject_VERSION_MAJOR 1)
    set(myproject_VERSION_MINOR 0)
    configure_file(
      "${PROJECT_SOURCE_DIR}/config.h.in"
      "${PROJECT_BINARY_DIR}/config.h"
      )
    include_directories("${PROJECT_BINARY_DIR}")

    # Define sources and executable
    set(EXECUTABLE_NAME "myproject")
    add_executable(${EXECUTABLE_NAME} main.cpp)


    # Detect and add SFML
    set(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake_modules" ${CMAKE_MODULE_PATH})
    #Find any version 2.X of SFML
    #See the FindSFML.cmake file for additional details and instructions
    find_package(SFML 2 REQUIRED network audio graphics window system)
    if(SFML_FOUND)
      include_directories(${SFML_INCLUDE_DIR})
      target_link_libraries(${EXECUTABLE_NAME} ${SFML_LIBRARIES} ${SFML_DEPENDENCIES})
    endif()


    # Install target
    install(TARGETS ${EXECUTABLE_NAME} DESTINATION bin)


    # CPack packaging
    include(InstallRequiredSystemLibraries)
    set(CPACK_RESOURCE_FILE_LICENSE "${CMAKE_SOURCE_DIR}/COPYING")
    set(CPACK_PACKAGE_VERSION_MAJOR "${myproject_VERSION_MAJOR}")
    set(CPACK_PACKAGE_VERSION_MINOR "${myproject_VERSION_MINOR}")
    include(CPack)
    ```
2. 예제 코드 `main.cpp`는 다음과 같다.
    ```cpp
    #include "config.h"
    #include <iostream>
    #include <SFML/Graphics.hpp>
    using namespace std;

    int main(int argc, char* argv[]) {

      // Code adapted from the SFML 2 "Window" example.

      cout << "Version " << myproject_VERSION_MAJOR << "." << myproject_VERSION_MINOR << endl;

      sf::Window App(sf::VideoMode(800, 600), "myproject");

      while (App.isOpen()) {
        sf::Event Event;
        while (App.pollEvent(Event)) {
          if (Event.type == sf::Event::Closed)
            App.close();
        }
        App.display();
      }
    }
    ```
    - 여기서 알 수 있는것은 `config.h`에서 설정 정보를 읽어와 출력하는 것.
2. `config.h.in` 파일을 다음과 같이 작성한다. `cmake`를 통해서 `config.h`를 생성할 것이다.
    ```cpp
    #define myproject_VERSION_MAJOR @myproject_VERSION_MAJOR@
    #define myproject_VERSION_MINOR @myproject_VERSION_MINOR@
    ```
1. `$ cmake .` 명령어로 빌드한다. `Makefile`, `config.h` 등이 생성된다.
2. `make` 명령어로 컴파일한다. `myproject` 이름으로 실행파일이 생성된다. `$ ./myproject`로 실행해볼 수 있다.

## Let's make 16 games in C++/SFML!

https://www.youtube.com/@FamTrinli

SFML을 이용해 테트리스, 레이싱 게임, 애니팡 like 게임을 만드는 시리즈.
배속이지만, 5분이내로 짧게 요약하고 있다. 상세설명 란에 코드도 공개하고 있다.

## SFML for Rust

SFML의 [Rust](./rust.md) binding.

https://github.com/jeremyletang/rust-sfml

1. SFML 설치가 필요하다: `brew install sfml` \
Homebrew로 설치하면 저장되는 위치를 알고 있어야 한다. osx 기준으로 `/opt/homebrew/Cellar/sfml/<version>`에 설치되었다.

brew 문서에 이에 대한 내용이 전무해서, 일반적으로 설치 후 안내 문구가 뜨는 다른 패키지와 달리 사용 방법을 따로 찾아봐야 했다.

2. `cargo add sfml`로 sfml crate 추가한다.

3. `main.rs`를 작성하는데, rust-sfml에 있는 예제 코드를 가져왔다:

```rust
extern crate sfml;

use sfml::{
    graphics::{Color, CustomShape, CustomShapePoints, RenderTarget, RenderWindow, Shape},
    system::Vector2f,
    window::{Event, Key, Style},
};

#[derive(Clone, Copy)]
pub struct TriangleShape;

impl CustomShapePoints for TriangleShape {
    fn point_count(&self) -> usize {
        3
    }

    fn point(&self, point: usize) -> Vector2f {
        match point {
            0 => Vector2f { x: 20., y: 580. },
            1 => Vector2f { x: 400., y: 20. },
            2 => Vector2f { x: 780., y: 580. },
            p => panic!("Non-existent point: {p}"),
        }
    }
}

fn main() {
    let mut window = RenderWindow::new(
        (800, 600),
        "Custom shape",
        Style::CLOSE,
        &Default::default(),
    );
    window.set_vertical_sync_enabled(true);

    let mut shape = CustomShape::new(Box::new(TriangleShape));
    shape.set_fill_color(Color::RED);
    shape.set_outline_color(Color::GREEN);
    shape.set_outline_thickness(3.);

    loop {
        while let Some(event) = window.poll_event() {
            match event {
                Event::Closed
                | Event::KeyPressed {
                    code: Key::Escape, ..
                } => return,
                _ => {}
            }
        }

        window.clear(Color::BLACK);
        window.draw(&shape);
        window.display();
    }
}
```

4. 빌드 시 SFML 환경 변수`SFML_INCLUDE_DIR`, `SFML_LIBS_DIR` 2개를 전달해야 한다. \
Homebrew로 설치했기 때문에 해당 경로를 전달했다.

```bash
$ SFML_INCLUDE_DIR=/opt/homebrew/Cellar/sfml/2.6.0/include SFML_LIBS_DIR=/opt/homebrew/Cellar/sfml/2.6.0/lib/ cargo build
```

5. 실행 파일을 실행해 본다: `./target/debug/<project-name>`

cargo build 대신 삐르게 실핼하는 방법을 좀 찾아봐야겠다.
