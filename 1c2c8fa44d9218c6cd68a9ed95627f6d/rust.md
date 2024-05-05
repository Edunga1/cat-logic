---
created: 2023-10-19
---
# Rust Programming Language

Rust를 [SFML](./sfml.md)로 처음 시작중이다.

https://www.rust-lang.org/

top-down 방식으로 배우기에는 Rust는 꽤 어려운 언어인 거 같다. 학습곡선이 높은 언어로 유명한 언어이기도 하다.

## 환경 구축하기

Ubuntu on WSL, OSX 환경에서 주로 개발해서 Homebrew로 설치했다.

`rust` Formula도 있지만, `rustup`을 사용하자. `rustup`은 `rust`의 버전 관리나 toolchain을 관리할 수 있다.

```bash
$ brew install rustup-init
```

설치 후, `rustup-init`을 실행하면 `rust`와 `cargo`를 설치하는 과정이 시작된다.

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
SFML 패키지를 docs.rs, crates.io 2개 사이트에서 찾을 수 있었다.

- https://docs.rs/crate/sfml/latest
- https://crates.io/crates/sfml

docs.rs는 라이브러리 문서화에 특화되어 있는 것으로 보인다.\
crates.io처럼 `cargo add sfml`와 같은 설치 명령어 안내 문구가 없다.

## 프로젝트 시작하기

`cargo` 명령어로 프로젝트를 생성하거나 패키지를 설치할 수 있다.

다음은 `sfml-rust-start` 이름의 프로젝트를 생성하는 명령어이다.

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

24년의 시작을 Rust로 시작했다.

문법을 따로 공부하지 않고, 무작정 사용해보고 있다. 물론 아무런 도움이 없는 것은 아니다.
[ChatGPT](./machine-learning.md)와 [LSP](./language-server-protocol.md)를 적극 활용하고 있다.

간단한 [SFML Rust](https://github.com/Edunga1/rust-sfml-practice) 프로젝트로 시작한다.

ChatGPT가 아니었으면 더 험난했을 것 같다. ChatGPT 덕분에 언어의 러닝커브를 줄일 수 있었다.
`trait`은 다른 언어에도 있는 개념이지만, lifetime은 예상치 못했다. LSP가 없었더라면 수 많은 에러에 만신창이가 되었을 것이다.

immutable을 우선하는 것과 [lifetime](https://doc.rust-lang.org/rust-by-example/scope/lifetime/struct.html)을 보면 Rust가 메모리 안전성을 중요시하는 것을 알 거 같다.
그래도 lifetime의 `<'a>`는 뭔가 어색하다. 특히 `'static`은 더욱.

강의를 보거나 하지 않고, 필요할 때 마다 찾아보고 있어서, 정확한 정보가 아니겠지만 일단 여기에 정리해둔다.

### Lifetime

C언어는 [Dangling Pointer](https://ko.m.wikipedia.org/wiki/%ED%97%88%EC%83%81_%ED%8F%AC%EC%9D%B8%ED%84%B0) 문제가 있다.\
포인터가 유효한 객체를 가리키지 않는 것이다. 다음은 Wikipedia의 예시이다.

```c
{
   char *dp = NULL;
   /* ... */
   {
       char c;
       dp = &c;
   }
     /* c falls out of scope */
     /* dp is now a dangling pointer */
}
```

`dp`는 `c`를 가리키고 있지만, `c`가 스코프를 벗어나면 메모리 해제되고, `dp`는 더 이상 유효한 포인터가 아니다.

Rust는 참조 수명을 통해 이 문제를 방지한다.

```rust
// compile error
fn main() {
    let r;
    {
        let x = 5;
        r = &x;
    }
    println!("r: {}", r);
}
```

위 코드는 컴파일 되지 않는다. `x`의 수명이 `r`의 수명보다 짧기 때문이다.

### Ownership

Ownership은 메모리 문제를 해결하는 개념이다.

```rust
fn main() {
    let foo = String::from("Hello, world!");
    let bar = foo;                           // moved value from `foo` to `bar`
    println!("The value is: {:?}", foo);     // error
    println!("The value is: {:?}", bar);     // ok
}
```

코드는 컴파일 되지 않는다. `foo`의 소유권이 `bar`로 이동되었기 때문이다. 그래서 `foo`를 사용할 수 없다.

해결하기 위해선 Copy, Clone, Borrowing 등을 사용해서 소유권을 해결해야 한다.

```rust
fn main() {
    let foo = String::from("Hello, world!");
    let bar = foo.clone();
    println!("The value is: {:?}", foo);
}
```

Clone을 사용하여 해결한 코드이다.
`clone()`은 rust에서 `Clone` trait를 구현한 것이다. 이제 `foo`, `bar` 모두 사용할 수 있다.

---

소유권 문제는 다음 예제에서 두드러진다.

```rust
fn dummy(x: String) {
    println!("{}", x);
  	// x is dropped
}

fn main() {
    let x = String::from("Hello");
    dummy(x);
    println!("{}", x);  // This line won't compile
}
```

`dummy()` 함수로 `x`의 값을 넘기고, `x`의 값은 `dummy()`에서 사라진다.
그래서 `main()`에서 `x`를 사용할 수 없다. 간단한 코드지만 처음보면 잘 이해되지 않는 부분.

ref. https://indosaram.github.io/rust-python-book/ch5-02.html#%EA%B0%92%EC%97%90-%EB%8C%80%ED%95%9C-%EC%86%8C%EC%9C%A0%EA%B6%8C

### Null Safety

rust는 Null Safety 언어이다. Null 대신 `Option`을 사용하는데 여기에도 Ownership이 적용된다.

```rust
fn main() {
    let opt = Some(String::from("Hello, world!"));
    let value = opt.unwrap();
    println!("The value is: {:?}", opt);  // error
}
```

위 코드는 컴파일 되지 않는다. `opt`의 소유권이 `value`로 이동되었기 때문이다. 그래서 `opt`를 더 이상 사용할 수 없다.

```rust
fn main() {
    let mut opt = Some(String::from("Hello, Rust!"));
    let value = opt.take();
    println!("The value is: {:?}", opt);  // ok
}
```

`take()`는 `Option`의 소유권을 가져가는 메소드이다. `opt`는 `None`이 된다.

### 테스트 코드 작성하기

Rust는 유닛 테스트 코드를 테스트하려는 코드와 함께 작성하는 것이 일반적이다.

https://doc.rust-lang.org/book/ch11-03-test-organization.html#testing-private-functions

```rust
pub fn add_two(a: i32) -> i32 {
    internal_adder(a, 2)
}

fn internal_adder(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn internal() {
        assert_eq!(4, internal_adder(2, 2));
    }
}
```

> The `#[cfg(test)]` annotation on the tests module tells Rust to compile and run the test code only when you run `cargo test`, not when you run `cargo build`.

위와 같이 같은 파일에 위치 시키고 `#[cfg(test)]`로 테스트 코드를 작성한다.
`#[cfg(test)]`는 `cargo test` 명령어로 실행할 때만 컴파일 되도록 한다. 운영 코드의 빌드에는 포함되지 않는다.

> You’ll see that because integration tests go in a different directory, they don’t need the `#[cfg(test)]` annotation. 

통합 테스트는 다른 디렉토리에 위치하므로 `#[cfg(test)]` 주석이 필요 없다.

테스트를 위한 모듈 임포트는 `mod tests` 내에서 이루어지기 때문에 운영 코드와 분리된다.

이건 GPT에 물어본 내용이라 정확하지 않지만, 레이아웃은 `대상1` - `대상1 테스트` - `대상2` - `대상2 테스트` 레이아웃을 가진다고 한다.

[Ripgrep의 테스트 코드](https://github.com/BurntSushi/ripgrep/blob/master/crates/globset/src/glob.rs)를 참고해보면 이 레이아웃을 따르고 있다.

`carog test`는 `src/` 내의 테스트만 실행한다. `cargo test --all`로 workspace 내 모든 테스트를 실행한다.

## Articles and References

[Rust로 게임 개발 3년 후에 떠나며](https://news.hada.io/topic?id=14521)

Rust의 아쉬운 점을 서술한 글이다.

빠르게 반복 개발되어야 하는 게임 개발에서 Rust는 적합하지 않았다고 한다.
게임 개발의 핵심은 프로토타이핑을 통한 플레이 경험의 향상이지, 크래시가 없는 코드가 우선이 아니라고 한다.

리팩토링에 의한 코드의 재구조화 문제.\
익숙해지는 문제와 별개로 Borrow Checker나 요구 사항 변경으로 인한 코드 변경이 대규모 코드 구조 변경을 유발한다고 한다.
Indirection(Box, Rc 등을 말함)은 코드를 장황하게 만들고, 상태 관리하기 어렵게 한다고.

생산성을 떨어뜨리는 에코 시스템.\
반복 개발 필요한 상황에서 Hot Reloading이 중요한데, Rust 라이브러리가 있지만 부족하다고한다.
Procedural Macro는 컴파일 시간을 늘리는 반면에, C#의 리플렉션은 사용하기 쉽고 퍼포먼스의 영향이 있지만 빠르게 개발할 수 있게 한다고.
Orphan Rule(잘 모르겠다)은 안전성을 위해서 생산성을 크게 떨어뜨린다고 한다. 라이브러리가 아닌 애플리케이션 코드에서는 끌 수 있어야 한다고 주장한다.

Rust의 안정성에 대해서.\
동적 Borrow Checking은 예상하지 못하는 크래시를 발생시킨다고 한다.
`RefCell`을 통한 `.borrow_mut()`에서 크래시를 겪었다고. 게임에서 `RefCell`은 유용하지만 어렵게 만든다고 한다.

반면에 장점도 있다.\
컴파일만 되면 보통을 잘 동작한다. 크게 노력하지 않아도 퍼포먼스가 좋다.
Rust Analyzer로 IDE 사용성이 크게 개선되었다고 한다. Trait과 Enum이 잘 설계되어 있다고 한다.

Rust 입문자로써 내 생각.\
아직 시작 단계지만 어느정도 공감한 부분이 있다. 특히 생산성 부분이다.
Rust의 코드는 Borrow 수정으로 코드의 너무 많은 부분이 변경되어야 한다는 점이다.
이건 매우 고통스럽다. Rust Analyzer나 GitHub Copilot이 아니었다면 진작에 포기했었을 것이다.
대부분 암시적인 python, javascript과 달리 Rust는 대부분 명시해야 한다. 그래서 장황한 코드를 만드는 것이 아닌가 싶다.
하지만 안정성을 위해서 설계된 것이니 공감은 한다.

---

[파이썬 프로그래머를 위한 러스트](https://indosaram.github.io/rust-python-book/)

한국어로 작성된 e-book이다. 파이썬에 익숙한 사람이라면 이 책이 적절할 듯. 나는 pdf로 다운받아서 보고 있다.

환경 구성부터 시작한다. Bottom-up 방식으로 설명한다.
나는 Top-down 방식으로 Rust를 시작해서 고통스러운 부분이 있었다.
Rust는 Bottom-up 방식으로 배우는 편이 좋은 거 같다.
