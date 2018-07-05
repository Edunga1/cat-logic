# curl -O를 통해서 다운된 파일 사이즈가 0인 경우

```bash
$ curl http://dl.google.com/android/android-sdk_r24.3-linux.tgz -O
$ ls -al | grep android-sdk_r24.3-linux.tgz # OK. file downloaded.
```

```bash
$ curl https://github.com/ziyaddin/xampp/archive/master.zip -O
$ ls -al | grep master.zip # file size is too small.
```

Use `-L` option.

```bash
$ curl https://github.com/ziyaddin/xampp/archive/master.zip -O -L
$ ls -al | grep master.zip # OK.
```

It is redirection problem.

You can check redirection when `curl https://github.com/ziyaddin/xampp/archive/master.zip`.
Or type the url in browser. and browser downloads file with another name.
