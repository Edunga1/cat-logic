# Mail

# Gmail

## `+` 주소를 사용하는 경우 필터가 제대로 동작하지 않는 문제

https://webapps.stackexchange.com/questions/2593/how-can-i-filter-incoming-email-based-on-plus-addressing-in-gmail

**상황**\
sentry에 중요한 알림과 그렇지 알림을 구분하고자 한다. 중요한 알림만 inbox에 노출시키고, 나머지는 보관처리 하도록 필터를 구성하였음

| 설정        | 일치                                                  | 작업                           |
|-------------|-------------------------------------------------------|--------------------------------|
| 중요한 알림 | `from:(@md.getsentry.com) to:(user@gmail.com)`        | 라벨 적용, 받은편지함 건너뛰기 |
| 그 외 알림  | `from:(@md.getsentry.com) to:(user+silent@gmail.com)` | 라벨 적용                      |

그러나 알림이 오면 항상 중요한 알림으로 취급되어 inbox에 남는다. 받는사람은 `user+silent`로 잘 되어있음.

서술한 링크에서 메일링리스트로 발송되는 경우 `To:`에 메일이 포함되지 않을 수도 있다고 한다:
> The other methods suggested may not catch all email sent to that address; that is, sometimes your email will not be in the To: field, as when the email is sent to a mailing list to which you are subscribed.

`Has the words:`에 `{to:(user@gmail.com)}`와 같이 설정해야 한다고 함.
