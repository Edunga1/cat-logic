{% if file.path === readme.file.path %}
<!-- README.md 비워둠 -->
{% elseif page.id %}
<!-- front matter에 id가 있는 페이지만 댓글 출력 -->
<style>
  .utterances {
    margin-top: 8em;
  }
</style>
<script
  src="https://utteranc.es/client.js"
  repo="Edunga1/cat-logic-comments"
  issue-term="{{ page.id }}"
  crossorigin="anonymous"
  async>
</script>
{% else %}
<!-- id가 없으면 알림 메시지로 대신함 -->
<span style="color: #aaa">
  Sorry! this page does not support for comments.
</span>
{% endif %}
