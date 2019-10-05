text_1 = '从维基百科，MOOC等12个开放教育资源抽取碎片知识，并通过混合表示学习算法将所有碎片知识映射到统一空间中。';
text_2 = '采用我们自主研制的标签传播主题树生成算法，形成主题树的树干树枝，通过优化子集选择从碎片知识集中选择相关的碎片知识装配生成主题树。树叶表示碎片知识，树木表示多维度的主题知识。';
text_3 = '采用自主创新的拓扑融合+模态互补的认知关系挖掘算法，识别主题树间的个语义关系，主题树通过语义关系融合生成知识森林，表示了课程的知识体系。';
text = [text_1, text_2, text_3];


var app = angular.module('myApp', []);

app.controller('menu', function ($scope, $http) {

    var img = $("#ImgNavigation")
    var step = getCookie("stepNumber")
    if (step == '') {
        step = 1;
        setCookie("stepNumber", 1, "d900")
    }
    img.attr('width', "");
    img.attr('src', 'dist/img/daohang1.png');
    img.load(function () {
        // img.addClass('img-responsive')
        setImgArea()
        // display(0)
    })

    // 获取学科和课程数据
    $http.get(ip + "/domain/getDomainsGroupBySubject").success(
        function (response) {
            //响应response相对，增加状态信息和编码
            data = response["data"].filter(x => [1, 2, 3, 4, 5, 18, 19, 20].indexOf(x.subjectId) !== -1).reverse();
            $scope.subjects = response["data"].filter(x => [1, 2, 3, 4, 5, 18, 19, 20].indexOf(x.subjectId) !== -1).reverse();
            var classSum = 0;
            // 切回导航页面时，读取现有课程并更新两个框的值
            for (i = 0; i < data.length; i++) {
                classSum = classSum + data[i].domains.length;
                if (data[i].subjectName == getCookie("NowSubject")) {
                    $scope.subject = data[i];
                    for (j = 0; j < data[i].domains.length; j++) {
                        if (data[i].domains[j].domainName == getCookie("NowClass")) {
                            $scope.domain = data[i].domains[j];
                        }
                    }
                }
            }
            $scope.subjectNum = data.length;
            $scope.classSum = classSum;
        }
    );

    $scope.change = function () {
        //获取被选中的值  
        var chengeitem = $scope.domain.domainName;
        setCookie("NowClass", $scope.domain.domainName, "d900");
        setCookie("NowSubject", $scope.subject.subjectName, "d900");
        //js代码实现option值变化后的查询等操作      
    }

})
function resetCookie() {
    setCookie("stepNumber", 1, "s900")
    // display(0)
    // console.log(getCookie("stepNumber"))
    // window.location.reload();
}


// <!-- 设置图片 点击事件  跳转到不同的地方 -->
function pageto(number) {
    imagehide(number)
    if (number == 0) {
        // setCookie("stepNumber",number+1,"d900")
        // setImgSrc()

        return
    }
    else if (number == 1) {
        // setCookie("stepNumber",number+1,"d900")
        // setImgSrc()

        window.location = "pages/spider/index.html"
    } else if (number == 2) {
        // setCookie("stepNumber",number+1,"d900")
        // setImgSrc()
        window.location = "pages/add/index.html"
    }
    else if (number == 3) {
        // setCookie("stepNumber",number+1,"d900")
        // setImgSrc()
        window.location = "pages/kg/index.html"
    }
}

function display(i) {
    // var i=getCookie("stepNumber");
    setCookie("stepNumber", i, "d900");
    $('#textContainer').css('visibility', 'visible');
    $("#text").html(text[i - 1]);
}

function imagehide(i) {
    if (i == 0) {
        $('#imagehref').hide();
    } else {
        $('#imagehref').show();
    }
}



// <!-- 设置图片热区 -->
function setImgArea() {
    var img = $("#ImgNavigation");

    var area1 = $('#area1');
    // area1.attr("coords", "" + 928 / 3193 * img.width() + "," + 537 / 1269 * img.height() + "," + 240 / 3193 * img.width());
    area1.attr("coords", "" + 432 / 1469 * img.width() + "," + 150 / 402 * img.height() + "," + 284 / 1469 * img.width());
    var area2 = $('#area2');
    // area2.attr("coords", "" + 1828 / 3193 * img.width() + "," + 510 / 1269 * img.height() + "," + 370 / 3193 * img.width());
    area2.attr("coords", "" + 877 / 1469 * img.width() + "," + 146 / 402 * img.height() + "," + 270 / 1469 * img.width());
    var area3 = $('#area3');
    // area3.attr("coords", "" + 2850 / 3193 * img.width() + "," + 507 / 1269 * img.height() + "," + 398 / 3193 * img.width());
    area3.attr("coords", "" + 1312 / 1469 * img.width() + "," + 145 / 402 * img.height() + "," + 280 / 1469 * img.width());
}

$(document).ready(function () {

});
