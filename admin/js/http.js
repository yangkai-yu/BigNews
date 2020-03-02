(function(w) {
  $.ajaxSetup({
    headers: {
      Authorization: localStorage.getItem("token")
    },
    // 发送 ajax 请求前 -
    beforeSend: function() {
      // 显示进度条
      // 进度条插件引入后会在 window 对象上添加一个 NProgress 成员，所以才能全局调用
      // 如果有页面没有引入 NProgress 插件，那 window 对象上就没有 NProgress，那就不调用
      if (window.NProgress) {
        NProgress.start();
      }
    },
    // success:function(){

    // },
    // 请求失败，意味服务器拒绝给你数据，造成这个原因往往是用户没有没有正确的 token
    // 没有正确的 token 就跳到登录页，让用户重新登录并获取 token
    error: function(xhr) {
      // alert(xhr);
      // ajax 请求参数错误的状态码是 400
      if (xhr.status === 400) {
        $(".modal").modal();
        $(".modal p").html("请输入正确的数据");
        // 进入 index.html 页面的时候还没登录，未登录状态码是 403
      } else if (xhr.status === 403) {
        //   alert("登录失效，请重新登陆");
        //   Bootstrap框架 登录错误弹出框，调用modal()方法
        $(".modal").modal();
        $(".modal p").html("登录失效，请重新登陆");
        //   当用户点击了去登录跳转到登录页
        // 点击去登录的按钮后跳转到登录页
        // 请求失败才给按钮注册跳转事件。
        $(".to-login").click(function() {
          // 设置为登录页的路径
          location.href = "./login.html";
        });
      }
    },
    // 完成 - 不管成功失败都执行
    // 请求完成后隐藏进度条
    complete: function() {
      if (window.NProgress) {
        // 隐藏进度条
        NProgress.done();
      }
    }
  });

  const baseUrl = "http://localhost:8080/api/v1";
  const BigNew = {
    user_login: `${baseUrl}/admin/user/login`, //用户登录
    user_info: `${baseUrl}/admin/user/info`, //用户信息
    user_detail: `${baseUrl}/admin/user/detail`, //用户详情
    user_edit: `${baseUrl}/admin/user/edit`, //用户编辑
    category_list: `${baseUrl}/admin/category/list`, //文章类别查询
    category_add: `${baseUrl}/admin/category/add`, //文章类别新增
    category_search: `${baseUrl}/admin/category/search`, //文章类别搜索
    category_edit: `${baseUrl}/admin/category/edit`, //文章类别编辑
    category_delete: `${baseUrl}/admin/category/delete`, //文章类别删除
    article_query: `${baseUrl}/admin/article/query`, //文章搜索
    article_publish: `${baseUrl}/admin/article/publish`, //文章发布
    article_search: `${baseUrl}/admin/article/search`, //文章信息查询
    article_edit: `${baseUrl}/admin/article/edit`, //文章编辑
    article_delete: `${baseUrl}/admin/article/delete`, //文章删除
    comment_list: `${baseUrl}/admin/comment/search`, //文章评论列表
    comment_pass: `${baseUrl}/admin/comment/pass`, //文章评论通过
    comment_reject: `${baseUrl}/admin/comment/reject`, //文章评论不通过
    comment_delete: `${baseUrl}/admin/comment/delete` //文章评论删除
  };
  // window 是实参， w 是函数的形参，保存了 window 对象的地址
  // 把局部的 BigNew 添加到 window 对象上
  w.BigNew = BigNew;
})(window);
