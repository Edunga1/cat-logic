# VSCode로 PHP 디버깅 하기

* OSX 기준
* php, apache 등 서비스는 **homebrew** 이용함
* php: 5.6, apache: 2.4 사용 할 예정

## Homebrew로 PHP, APACHE, XDEBUG 설치

**xdebug**는 php 디버깅 도구임

```bash
brew tap homebrew/php
brew tap homebrew/apache

$ brew install httpd24 --with-privileged-ports --with-http2
$ brew install php56 --with-httpd24 --with-libmysql
$ brew install php56-xdebug
```

```brew tap```은 ```brew install <package>``` 패키지 정보를 얻기 위한 명령어
즉, **php**와 **apache** 설치를 위한 패키지 정보를 얻음

```--with-privileged-ports```: 아파치 서버 포트를 1024 미만 번호를 사용할 수 있게 하기 위함
```--with-httpd24```: apache 2.4 연동하기 위함
```--with-libmysql```: mysql 연동하기 위함

```php56-xdebug```가 php 디버깅을 위한 툴

## 설치된 패키지 기본 설정 하기

```/usr/local/etc/```: Homebrew로 설치한 패키지의 설정 파일이 위치한 경로

### /usr/local/etc/apache2/2.4/httpd.conf 수정

**포트 수정**

기본 값은 8080으로 되어있는데 그냥 사용해도 무방

```Listen 8080``` -> ```Listen 80```

**php 사용 설정**

이 부분을

```
<IfModule dir_module>
    DirectoryIndex index.html
</IfModule>
```

다음과 같이 변경하여 .php 파일 호출 시 php를 사용케 함

```
<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>
 
<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>
```

### /usr/local/etc/php/5.6/php.ini 수정

**XDebug 사용 설정**

remote_port의 경우 기본값이 9000 임. 개인적으로 이미 사용 중인 포트라 변경하였음.

```php.ini```의 적절한 곳에 다음 내용을 추가.

```
[xdebug]
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
xdebug.remote_port = 9500
```

**설치 및 설정 후에는 서비스 시작**

```
sudo brew services start --all
```

서비스 실행의 경우 ```sudo``` 사용하지 않으면 되지 않았으나 환경마다 다를 수 있음

```<?php phpinfo(); ?>```로 파일을 ```.php```파일을 생성하여
apache와 PHP가 제대로 시작 되었는지 확인하고
**xdebug** 섹션이 있는지 확인하자.

## VSCode의 PHP 디버깅 도구 설치 및 시작

환경 설정은 끝!

확장 프로그램 탭에서 ```php debug```로 검색하여 가장 상단의 확장 프로그램 설치

설치 하였으면 디버깅 탭에서 설정버튼(톱니바퀴)을 눌러서 PHP를 선택.

기본 설정을 그대로 사용하나 ```php.ini```에 설정한 포트 번호로 맞춰줌

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for XDebug",
            "type": "php",
            "request": "launch",
            "port": 9500 // 여기
        },
        {
            "name": "Launch currently open script",
            "type": "php",
            "request": "launch",
            "program": "${file}",
            "cwd": "${fileDirname}",
            "port": 9500 // 여기
        }
    ]
}
```

이제 디버깅 모드 실행 후 예외점을 추가하고 디버깅만 하면 됨!

```Listen for XDebug```는 디버깅 모드를 시작하고
직접 ```php``` 파일을 호출하면 해당 디버깅 문맥으로 이동하고

```Launch currently open script```는 현재 작업중인 ```php```
파일을 디버깅 모드로 시작한다.
