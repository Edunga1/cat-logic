# scp

**Remote - Local 간 파일 전송**

```bash
scp [옵션] <원본 파일 / 경로> <전송 위치 파일 / 경로>
```

Local to Remote

```bash
scp /home/myhome/abc.tar oracle@123.456.78.9:/home/oracle/
```

Remote to Local

```bash
scp root@123.456.78.9:/usr/local/abc.xml /home/oracle/
```

## 옵션

-r : (recursive) 폴더 전송
