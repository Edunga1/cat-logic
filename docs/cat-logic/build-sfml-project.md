---
id: page-84
time: 2018-10-07 06:26:32
tag: sfml, C++, game
---

# SFML 프로젝트 빌드하기

OSX 기준.

1. SFML 라이브러리를 다운받는다. **homebrew**로 설치하면 간단하다. `$ brew install sfml`
1. 빌드 도구 CMake를 다운받는다. **homebrew**는 `$ brew install cmake`

**아래부터는 [이 링크](https://github.com/SFML/SFML/wiki/Tutorial%3A-Build-your-SFML-project-with-CMake)에 따름**

2. 프로젝트 루트에 `cmake_modules` 폴더를 생성
2. [FindSFML.cmake](https://github.com/SFML/SFML-Game-Development-Book/blob/master/CMake/FindSFML.cmake) 작성하고, `cmake_modules` 안에 둔다.
2. `CmakeLists.txt` 작성하여 프로젝트 루트에 둔다. 위 폴더와는 관련 없다.
    ```c++
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
    ```c++
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
2. `config.h.in` 파일을 다음과 같이 작성한다. **cmake**를 통해서 `config.h`를 생성할 것이다.
    ```c++
    #define myproject_VERSION_MAJOR @myproject_VERSION_MAJOR@
    #define myproject_VERSION_MINOR @myproject_VERSION_MINOR@
    ```
2. `$ cmake .` 명령어로 빌드한다. `Makefile`, `config.h` 등이 생성된다.
2. `make` 명령어로 컴파일한다. `myproject` 이름으로 실행파일이 생성된다. `$ ./myproject`로 실행해볼 수 있다.
