---
created: 2023-10-19
---
# Rust Programming Language

Rust를 [SFML](./sfml.md)과 함께 처음 접하고 있다.

https://www.rust-lang.org/

## 환경 구축하기

Ubuntu on WSL, OSX 환경에서 주로 개발해서 Homebrew로 설치했다.

`rust` 모듈도 있지만, `rustup`을 사용하자. `rustup`은 `rust`의 버전을 관리해주는 툴이다.
뿐만 아니라 다른 toolchain의 설치도 지원한다.

```bash
$ brew install rustup-init
```

`rustup-init`을 설치하고, `rustup-init`을 실행하면 `rust`와 `cargo`를 설치할 수 있다.

어떤 경로에 설치될 지 물어보는데, 그냥 Enter를 눌러서 기본 경로에 설치했다.

```bash
$ rustup-init
# ...
1) Proceed with standard installation (default - just press enter)
2) Customize installation
3) Cancel installation
```

`rustc`, `cargo`가 설치되었는지 확인한다.

```bash
❯ rustc --version
rustc 1.72.1 (d5c2e9c34 2023-09-13) (Homebrew)


❯ cargo --version
cargo 1.72.1
```

### Cargo

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

## Journey to Rust

24년 첫 도전을 Rust와 함께 하는중이다.

Rust 문법을 따로 공부하지 않고, 무작정 사용해보고 있다. 물론 아무런 도움이 없는 것은 아니다.
[ChatGPT](./machine-learning.md)와 [LSP](./language-server-protocol.md)를 적극 활용하고 있다.

https://github.com/Edunga1/rust-sfml-practice 가 시작 프로젝트다.

ChatGPT가 아니었으면 고생길이 험난했을 것 같다. ChatGPT 덕분에 언어의 러닝커브를 줄일 수 있었다.
`trait`은 다른 언어에도 있는 개념이지만, lifetime은 예상치 못했다. LSP가 없었더라면 수 많은 에러에 만신창이가 되었을 것이다.

immutable을 우선하는 것과 [lifetime](https://doc.rust-lang.org/rust-by-example/scope/lifetime/struct.html)을 보면 Rust가 메모리 안전성을 중요시하는 것을 알 거 같다.
그래도 lifetime의 `<'a>`는 뭔가 어색하다. 특히 `'static`은 더욱.
