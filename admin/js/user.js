$(function() {
  //1.页面一加载：ajax请求个人详情信息，渲染页面
  $.ajax({
    url: BigNew.user_detail,
    type: "get",
    dataType: "json",
    success: function(backData) {
      console.log(backData);
      // 渲染页面    // 把用户信息分别写入到表单的 input 标签中
      $("input.username").val(backData.data.username);
      $("input.nickname").val(backData.data.nickname);
      $("input.email").val(backData.data.email);
      $("input.password").val(backData.data.password);
      //     //遍历对象优化代码
      //     for (var key in backData.data) {
      //       $("input." + key).val(backData.data[key]);
      //     }
      //     $("img.user_pic").attr("src", backData.data.userPic);
      const userPic = backData.data.userPic;
      // 图片特殊处理，需要通过 src 属性设置图片路径
      // img.user_pic    img 和 .user_pic 连在一起是交集选择器
      // 交集选择器：既要求是 img 标签，身上还要求有 .user_pic 的类名
      $("img.user_pic").attr("src", userPic);
    }
  });
  //2.文件预览
  //1.给file表单元素注册onchange事件
  $("#exampleInputFile").change(function() {
    //1.2 获取用户选择的图片
    var file = this.files[0];
    //1.3 将文件转为src路径
    var url = URL.createObjectURL(file);
    //1.4 将url路径赋值给img标签的src
    $(".user_pic").attr("src", url);
  });

  // 3.编辑个人信息(fromdata上传文件)
  // $("#form").on("submit", function(e) {
  //   //禁用表单默认提交事件
  //   e.preventDefault();
  //   $.ajax({
  //     url: BigNew.user_edit,
  //     type: "post",
  //     dataType: "json",
  //     data: new FormData(this),
  //     contentType: false,
  //     processData: false,
  //     success: function(backData) {
  //       console.log(backData);
  //       if (backData.code == 200) {
  //         alert("修改成功");
  //         /*
  //                   window:            当前页面窗口 user.html
  //                   window.parent:     当前页面父窗口 index.html
  //                   */
  //         parent.window.location.reload();
  //       }
  //     }
  //   });
  // });
  // 功能3：点击修改按钮，修改了用户信息
  // 知识点：FormData
  // FormData 可以把它看做是特殊的参数数据格式。
  //  在 xhr1 阶段，ajax 常用于提交字符串格式数据。
  //  在 xhr2 阶段，FormData 可用于图片上传，对象格式。
  //  用法：new FormData(原生表单域)  可以把表单中的数据自动序列化
  $(".btn-edit").click(function(e) {
    // 1、阻止默认行为
    e.preventDefault();
    // 2、通过 FormData 把表单中的数据自动添加到 FormData 对象中，可直接用于上传
    // this 代表当前点击的按钮
    // PS：每个表单元素，都可以通过 this.form 获取它所在的表单域元素
    const fd = new FormData(this.form);
    // 3、通过 ajax 把新的用户信息上传到服务器
    $.ajax({
      type: "post",
      url: BigNew.user_edit,
      // data 直接写 fd 对象，不要再套上个{}了，{} 是字符串参数的传递
      data: fd,

      dataType: "json",
      // 不需要要自动添加 contentType 请求头，fd 对象有自己的请求头
      contentType: false,
      // 不需要把 fd 对象转换成字符串
      processData: false,
      success: function(response) {
        //  知识点：
        //    iframe 中的页面，window 对象是指 iframe 页面中的 window 对象
        //    如果想要获取到 iframe 的父级页面，可以通过 window.parent
        //    window.parent 要通过 http 协议方式才能正常获取父页
        if (response.code === 200) {
          alert("修改成功");
          //  方案2：通过 window.parent.$() 选中父级页面元素并修改
          // 获取当前 iframe 中的预览图，和 input.nickname 的值
          const imgSrc = $("img.user_ipc").attr("scr");
          const nickname = $("input.nickname").val();
          // 修改父级页面中的图片
          // window.parent.$() 操作的就是父级页面的元素
          window.parent.$(".user_info img,user_center_link img").attr("src");
          window.parent.$(".user_info strong").html(nickname);
        }
      }
    });
  });
});
