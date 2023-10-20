# Rust Programming Language

https://www.rust-lang.org/

SFML을 Rust에서 사용하는 것으로 처음 접해본다.

## Installation

Ubuntu on WSL, OSX 사용중이라 편의상 Homebrew로 설치했다.

```bash
$ brew install rust
```

`rustc`, `cargo`가 설치되었는지 확인한다.

```bash
❯ rustc --version
rustc 1.72.1 (d5c2e9c34 2023-09-13) (Homebrew)


❯ cargo --version
cargo 1.72.1
```

cargo는 패키지 매니저이다.

패키지는 몇 개 사이트에서 찾을 수 있는 것으로 보인다.
SFML을 기준으로는 다음 2개 사이트에서 찾을 수 있었다.

- https://docs.rs/crate/sfml/latest
- https://crates.io/crates/sfml

docs.rs는 라이브러리 문서화에 특화되어 있는 것으로 보인다.
crates.io처럼 `cargo add sfml`와 같은 설치 명령어 안내 문구가 없다.

## 프로젝트 시작하기

`cargo` 명령어로 프로젝트를 생성하거나 패키지를 설치할 수 있다.

다음은 `hell_world` 프로젝트를 생성하는 명령어이다.

```bash
$ cargo new sfml-rust-start
     Created binary (application) `sfml-rust-start` package

$ cd sfml-rust-start

$ tree -a .
.
├── Cargo.toml
├── .git
├── .gitignore
└── src
    └── main.rs
```

`Cargo.toml` 파일과 함께 git 저장소가 생성된다.
hello world를 출력하는 기본적인 코드가 `src/main.rs`에 작성되어 있다.

현재 디렉토리를 프로젝트로 만들고 싶다면 `cargo init` 명령어를 사용한다.

Rust 코드를 실행해보자. `rustc`로 컴파일하면 실행 파일이 생성된다:

```bash
$ rustc src/main.rs
$ ./main
Hello, world!
```

## SFML for Rust

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
