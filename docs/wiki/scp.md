---
created: 2016-11-07
---
# SCP

Remote - Local 간 파일 전송 도구.

```bash
scp [옵션] <원본 파일 / 경로> <전송 위치 파일 / 경로>
```

Local to Remote

```bash
scp /home/myhome/abc.tar oracle@203.0.113.10:/home/oracle/
```

Remote to Local

```bash
scp root@203.0.113.10:/usr/local/abc.xml /home/oracle/
```

옵션

- `-r`: (recursive) 폴더 전송
