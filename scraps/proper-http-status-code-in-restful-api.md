# RESTFul API에서 알맞은 상태 코드를 결정하는 방법

어느 목록을 불러온다고 했을 때 잘 불러 왔다면 200을 주는 것을 결정하는 건 쉽다.

그런데 만약에 목록이 없는 경우라면? 그리고 목록이 없는 이유가 존재하지 않는 ID에 대해 요청했거나
아니면 ID는 존재하지만 가져 오려는 목록이 없다면?
후자는 그래도 200인가? 아니면 400번대? 전자는 그러면 400번대 중 어느 것을 선택해야 할 것인가?

요청 실패에 대한 상태 코드를 결정하는 것은 너무 많은 경우가 있어서 쉽사리 선택하기가 쉽지 않다.

**What is the proper REST response code for a valid request but an empty data?**<br>
<http://stackoverflow.com/questions/11746894/what-is-the-proper-rest-response-code-for-a-valid-request-but-an-empty-data>

**REST API 서버에서 요청에 대한 에러코드를 어떻게 할 것인지에 대한 고민**<br>
<https://www.facebook.com/yundream/posts/10211773683475856>

>"상세하게 구분하지 않더라도 예외가 발생했는데 200을 주는 건 별로 좋지 않은 듯. 클라이언트에서 정상인지 예외인지 판단할 수 있는 가장 쉽고 보편적인 방법인데 말이죠."
