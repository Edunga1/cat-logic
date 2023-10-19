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

## SFML for Rust

https://github.com/jeremyletang/rust-sfml

`cargo add sfml`
