$(function() {
  $.ajaxSetup({
    headers: {
      Authorization: localStorage.getItem("token")
    },
    beforeSend: function() {
      alert("请求前");
    },
    // success:function(){

    // },
    error: function() {
      //   alert("登录失效，请重新登陆");
      $(".modal").modal();
      $(".modal p").html("登录失效，请重新登陆");
    },
    complete: function() {
      alert("完成");
    }
  });
  $(".to-login").click(function() {
    location.href = "./login.html";
  });
});
