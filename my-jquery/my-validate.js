/* ========================================================= 
check-type  , 验证模式的标记  ,可设置类型

required  不能为空，并在后面自动加 * 号
url        表示 输入网址
date 日期格式 xxxx-xx-xx
mail  邮箱
number 数字,可以整型，浮点型。
integer 正整数 
char     英文字符
chinese  中文
mobile   手机号码

mail-message="扩展提示内容" ， 例子 data-message, url-message  
minlength="6" 表示长度大于等于6
minLength：最小值 
maxLength：最大值
maxlength="18" 表示长度少于等于18
range="2.1~3"   表示值在[2.1~3]之间，并check-type="number"
range="2.1,2,4,5"   表示值在只能填现数字，并check-type="number" 
equalto=="#objectId"  判定需要等于对象的值
lesserto="#objectId"   判定需要小于对象的值
greaterto="#objectId"   判定需要大于对象的值



 回调应用:
  $("form").validation(function($item,params){
      if (obj.id=='mail'){
       $.post("/verifymail",{mail :$(obj).val()},function(data){
          params.result = !data.success;
          params.msg = data.msg;
        });
      }},
      {reqmark:false,icon:true}
  );

reqmark = true     表示显示 * 号
icon = true          表示提示在图标显示， 默认是不显示。
*/

(function ($) {
    window.formStyle = 0;//0=表示基本表单 ,1=表示内联表单, 2=水平排列的表单
    window.globalOptions = {}; //全局设置
    window.verifyState = false; //表单验证状态,默认是不通过的
    window.quickVerify = false; //快速验证, 为ture表示需要重新验证

    //获取表单类型
    function getFormStyle(form) {
        return 0;
    }
    //验证字段
    function validateField($item, validMode, itemTagName) {
        var errorMsg; //错误信息
        var isError = false; //是否错误
        var value; //控件的值
        var csmsg;//自定义错误信息
        var hasValue = false;//是否有值
        var isNumber =     //是否数值型
           validMode.indexOf("number") !== -1
                || validMode.indexOf("integer") !== -1
                || validMode.indexOf("floatnumber") !== -1;
        var objectId;  //对象的ID
        var objectValue;  //对象的值


        switch (itemTagName) {
            case "CHECKBOX":
                value = $item.is(":checked") ? "true" : "";
                hasValue = value === "true" ? true : false;
                break;
            default:
                value = $.trim($item.val());
                hasValue = $.trim(value) === "" ? false : true;
                break;
        }

        //外部验证回调方法
        if (!isError && window.globalOptions.callback) {
            var params = {
                msg: "",
                result: true
            };
            var original = $.ajaxSettings.async;
            $.ajaxSetup({ async: false }); //设置同步提交模式
            window.globalOptions.callback($item, params);
            isError = !params.result;
            if (isError && params.msg) {
                errorMsg = params.msg;
            }
            $.ajaxSetup({ async: original }); //恢复原来的设置
        }

        //必填验证
        if (validMode.indexOf("required") !== -1) {
            if (validMode.indexOf("!required") !== -1 && hasValue) {
                isError = true;
                csmsg = $item.attr("!required-message") ? $item.attr("!required-message") : null; //自定义提示信息
                errorMsg = csmsg ? csmsg : ((itemTagName === "SELECT") ? "此处不能选择" : " 此处不能输入内容");
            }
            else if (validMode.indexOf("required") !== -1 && !hasValue) {
                isError = true;
                csmsg = $item.attr("required-message") ? $item.attr("required-message") : null; //自定义提示信息
                errorMsg = csmsg ? csmsg : ((itemTagName === "SELECT") ? "请选择项" : "输入内容");
            }
        }


        //规则验证
        if (!isError && hasValue) {
            for (var i = 0; i < validMode.length; i++) {
                var x = true; //正常状态
                var flag = validMode[i];  //验证模式
                csmsg = $item.attr(flag + "-message") ? $item.attr(flag + "-message") : null; //自定义提示信息

                if (flag.substr(0, 1) === "!") { //判断是否有非
                    x = false;
                    flag = flag.substr(1, flag.length - 1);
                }

                for (j = 0; j < window.globalOptions.validRules.length; j++) {
                    var rule = window.globalOptions.validRules[j];
                    if (flag === rule.name) {
                        if (rule.validate.call($item[0], value) === x) {
                            isError = true;
                            errorMsg = csmsg ? csmsg : rule.defaultMsg;
                            break;
                        }
                    }
                }
                if (isError) break;
            }
        }
        //minLength验证
        var minlength = $item.attr("minlength");
        if (!isError && minlength && hasValue) {
            isError = value.replace(/\n/g, '\r\n').length < minlength;
            if (isError) {
                csmsg = $item.attr("minlength-message");
                errorMsg = csmsg ? csmsg : "输入长度应大于等于" + minlength;
            }
        }
        //maxLength验证
        var maxlength = $item.attr("maxlength");
        if (!isError && maxlength && hasValue) {
            isError = value.replace(/\n/g, '\r\n').length > maxlength;
            if (isError) {
                csmsg = $item.attr("maxlength-message");
                errorMsg = csmsg ? csmsg : "输入长度应少于等于" + maxlength;
            }
        }
        //range验证
        var range = $item.attr("range");
        if (!isError && range && hasValue) {
            var values = range.split("~");
            if (values.length === 2) {
                isError = parseFloat(value) < parseFloat(values[0]) || parseFloat(value) > parseFloat(values[1]);
                if (isError) {
                    csmsg = $item.attr("range-message");
                    errorMsg = csmsg ? csmsg : "输入值在【" + values[0] + "~" + values[1] + "】之间";
                }
            } else {
                values = range.split(",");
                if (values.length > 0) {
                    isError = $.inArray(value, values) < 0;
                    if (isError) {
                        csmsg = $item.attr("range-message");
                        errorMsg = csmsg ? csmsg : "输入值为" + range + "的其中一个";
                    }
                }
            }
        }

        //minNumber验证
        var minNumber = $item.attr("minNumber");
        if (!isError && minNumber && hasValue) {
            isError = parseFloat(value) < parseFloat(minNumber);
            if (isError) {
                csmsg = $item.attr("minnumber-message");
                errorMsg = csmsg ? csmsg : "输入值需大于或等于" + minNumber;
            }
        }

        //maxNumber验证
        var maxNumber = $item.attr("maxNumber");
        if (!isError && maxNumber && hasValue) {
            isError = parseFloat(value) > parseFloat(maxNumber);
            if (isError) {
                csmsg = $item.attr("maxnumber-message");
                errorMsg = csmsg ? csmsg : "输入值需小于或等于" + maxNumber;
            }
        }

        //equalto验证
        objectId = $item.attr("equalto");
        if (!isError && objectId && hasValue) {
            objectValue = $(objectId).val();
            isError = objectValue === value;
            if (isError) {
                csmsg = $item.attr("equalto-message");
                errorMsg = csmsg ? csmsg : "请输入与项" + objectId + "相同的值";
            }
        }


        objectId = $item.attr("lesserto");
        if (!isError && objectId && hasValue) {
            objectValue = $(objectId).val();
            if (objectValue) {
                if (isNumber) {
                    isError = parseInt(value) > parseInt(objectValue);
                } else {
                    isError = value > objectValue;
                }
                if (isError) {
                    csmsg = $item.attr("lesserto-message");
                    errorMsg = csmsg ? csmsg : "输入值应在小于对象" + objectId + "的值";
                } else { //如果输入正确了,验证一下其联动的控件
                    objectId = $item.attr("greaterto");
                    if (objectId) {
                        $(objectId).change();
                    }
                }
            }
        }


        objectId = $item.attr("greaterto");
        if (!isError && objectId && hasValue) {
            objectValue = $(objectId).val();
            if (objectValue) {
                if (isNumber) {
                    isError = parseInt(value) < parseInt(objectValue);
                } else {
                    isError = value < objectValue;
                }
                if (isError) {
                    csmsg = $item.attr("greaterto-message");
                    errorMsg = csmsg ? csmsg : "输入值应在大于对象" + objectId + "的值";
                } else { //如果输入正确了,验证一下其联动的控件
                    objectId = $item.attr("lesserto");
                    if (objectId) {
                        $(objectId).change();
                    }
                }
            }
        }

        var controlGroup = $item.parents(".input-field");
        controlGroup.removeClass("has-error has-success");//先清除
        controlGroup.find("#valierr").remove(); //删除文字

        if (!isError && !hasValue) {  //没错又没值的情况下,不添加样式
            return !isError;
        } else {
            switch (window.formStyle) {
                case 0:
                    controlGroup.addClass(isError ? "has-error" : "has-success"); //总体样式
                    if (isError) {
                        controlGroup.append("<div class=\"help-block\" id=\"valierr\">" + errorMsg + "</div>");
                    }
                    break;
            }
        }
        return !isError;
    }

    function validateGroup($group, validMode) {
        var errorMsg; //错误信息
        var isError = false; //是否错误
        var value; //控件的值
        var csmsg;//自定义错误信息
        var hasValue = false;//是否有值

        var groupElement = $group.attr("group-element"); //组元素
        var groupRelation = $group.attr("group-relation"); //组关系
        switch (groupElement) {
            case "radio":
                if (groupRelation === "or") {
                    isError = $group.find(":radio:checked").length === 0;
                    if (isError) {
                        csmsg = $group.attr("required-message") ? $group.attr("required-message") : null; //自定义提示信息
                        errorMsg = csmsg ? csmsg : "请选择一项";
                    }
                }
                break;
            default: //checkbox
                if (groupRelation === "or") {
                    isError = $group.find(":checkbox:checked").length === 0;
                    if (isError) {
                        csmsg = $group.attr("required-message") ? $group.attr("required-message") : null; //自定义提示信息
                        errorMsg = csmsg ? csmsg : "请选择其中一项";
                    }
                }
                break;
        }

        var controlGroup = $group;
        controlGroup.removeClass("has-error has-success");//先清除
        controlGroup.find("#valierr").remove(); //删除文字
        //样式
        switch (window.formStyle) {
            case 0:
                controlGroup.addClass(isError ? "has-error" : "has-success"); //总体样式
                if (isError) {
                    controlGroup.append("<span class=\"help-block\" id=\"valierr\">" + errorMsg + "</span>");
                }
                break;
        }
        return !isError;
    };
    //初始化工作
    function initializeForm(form) {
        var $form = $(form);
        $form.find("[check-type]").each(function () {
            var $item = $(this);
            var itemTagName = $item.prop("tagName");
            switch (itemTagName) {
                case "INPUT":
                    if ($item.attr("check-type").indexOf("time") >= 0 || $item.attr("check-type").indexOf("date") >= 0) {
                        $item.on("change", function () {
                            var validMode = $item.attr("check-type").split(" ");
                            validateField($item, validMode, itemTagName);
                            window.quickVerify = false; //选择过需要重新验证
                        });
                    }
                    else {
                        $item.on("blur", function () { // 失去焦点时
                            var validMode = $item.attr("check-type").split(" ");
                            validateField($item, validMode, itemTagName);
                            window.quickVerify = false; //选择过需要重新验证
                        });
                    }
                    break;
                case "TEXTAREA":
                    $item.on("blur", function () { // 失去焦点时
                        var validMode = $item.attr("check-type").split(" ");
                        validateField($item, validMode, itemTagName);
                        window.quickVerify = false; //选择过需要重新验证
                    });
                    break;
                case "SELECT":
                    $item.on("change", function () {
                        var validMode = $item.attr("check-type").split(" ");
                        validateField($item, validMode, itemTagName);
                        window.quickVerify = false; //选择过需要重新验证
                    });
                    break;
            }
            //设置必填的标志 * 号
            if (window.globalOptions.reqmark && $item.attr("check-type").indexOf("required") > -1) {
                var controlGroup = $item.parents(".input-field");
                controlGroup.removeClass("has-error has-success");
                controlGroup.find("#autoreqmark").remove();
                switch (window.formStyle) {
                    case 0:
                        $item.siblings("label").append("<span id=\"autoreqmark\" style=\"color:#FF9966\"> *</span>");
                        if ($item.siblings("label").hasClass('control-label')) {
                            $item.siblings("label").removeClass('control-label');
                        }
                        controlGroup.find('.control-label').append("<span id=\"autoreqmark\" style=\"color:#FF9966\"> *</span>");
                        break;
                }
            }
        });

        ////组
        $form.find("[group-check-type]").each(function () {
            var $group = $(this);
            var groupElement = $group.attr("group-element"); //组元素
            switch (groupElement) {
                case "SELECT":
                    $group.on("change", function () {
                        var validMode = $group.attr("group-check-type").split(" ");
                        validateField($group, validMode);
                        window.quickVerify = false; //选择过需要重新验证
                    });
                    break;
                case "radio":
                    $group.find(":radio").on("change", function () {
                        var validMode = $group.attr("group-check-type").split(" ");
                        validateGroup($group, validMode);
                        window.quickVerify = false; //选择过需要重新验证
                    });
                    break;
                default://checkbox
                    $group.find(":checkbox").on("change", function () {
                        var validMode = $group.attr("group-check-type").split(" ");
                        validateGroup($group, validMode);
                        window.quickVerify = false; //选择过需要重新验证
                    });
                    break;
            }

            //设置必填的标志 * 号
            if (window.globalOptions.reqmark && $group.attr("group-check-type").indexOf("required") > -1) {
                var controlGroup = $group;
                controlGroup.removeClass("has-error has-success");
                controlGroup.find("#autoreqmark").remove();
                switch (window.formStyle) {
                    case 0:
                        $group.find(".control-label").append("<span id=\"autoreqmark\" style=\"color:#FF9966\"> *</span>");
                        break;
                }
            }
        });

    }




    //表单重置
    $.fn.resetForm = function () {
        return this.each(function () {
            this.reset();
            $(this).find('input:hidden').val(""); //清空隐藏域的值(hidden)
            window.verifyState = false; //表单验证状态,默认是不通过的
            window.quickVerify = false; //快速验证, 为ture表示需要重新验证
            $(this).find("[check-type]").each(function () {
                switch (window.formStyle) {
                    case 0:
                        var controlGroup = $(this).parents(".input-field");
                        controlGroup.removeClass("has-error has-success");
                        controlGroup.find('label').removeClass('active');
                        controlGroup.find('.form-label').removeClass('active');
                        controlGroup.find('input').val();
                        controlGroup.find('textarea').val();
                        $('#valierr').remove();
                        break;
                }
            });
        });
    };

    //表单提交验证
    $.fn.valid = function () {

        var firstErrorElem = null;  //第一个出错的元素
        var validationError = false; // 是否出错了,默认是没有出错

        /*if (window.quickVerify) { //如果已经验证过,且用户没改过内容,直接返回表单状态
            return window.verifyState;
        }*/

        $(this).find("[check-type]").each(function () {
            var $item = $(this);
            var controlGroup = $item.parents(".input-field");
            var itemTagName = $item.prop("tagName");

            var validMode = $item.attr("check-type").split(" ");
            if (!validateField($item, validMode, itemTagName)) {
                if (!firstErrorElem) {
                    firstErrorElem = $item;
                }
                validationError = true;
            }
        });
        $(this).find("[group-check-type]").each(function () {
            var $group = $(this);
            if (!validateGroup($group)) {
                if (!firstErrorElem) {
                    firstErrorElem = $(this);
                }
                validationError = true;
            }
        });
        //聚焦
        if (validationError && window.globalOptions.focus) {
            firstErrorElem.focus();
        }
        window.quickVerify = true;
        window.verifyState = !validationError;
        return window.verifyState;
    };

    //局部验证
    $.fn.partialValidation = function () {
        return this.each(function () {
            initializeForm(this);
        });
    };

    //表单初始化验证
    $.fn.validation = function (callback, options) {
        return this.each(function () {
            $(this).attr("novalidate", "novalidate");  // 设置html5 属性 不需要默认验证
            window.globalOptions = $.extend({}, $.fn.validation.defaults, options); //合并参数
            window.globalOptions.callback = callback;
            window.formStyle = getFormStyle(this);
            initializeForm(this);
        });
    };
    //默认规则
    $.fn.validation.defaults = {
        validRules: [
            { name: "number", validate: function (value) { return (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)); }, defaultMsg: "请输入数字" },
            { name: "mail", validate: function (value) { return (!/^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/i.test(value)); }, defaultMsg: "请输入正确邮箱地址" },
            { name: "url", validate: function (value) { return (!/^(https?|ftp|http):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)) }, defaultMsg: "请输入正确的网址(以http://或https://为前缀)" },
            { name: "mobile", validate: function (value) { return (!/^0?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value)); }, defaultMsg: "请输入正确的手机号" },
            { name: "integer", validate: function (value) { return (!/^[1-9]\d*$/.test(value)); }, defaultMsg: "请输入正整数" },
            { name: "english", validate: function (value) { return (!/^[a-z\_\-A-Z]*$/.test(value)); }, defaultMsg: "请输入英文字符" },
            { name: "chinese", validate: function (value) { return (!/^[\\S\\s]*[\u4e00-\u9fff]+[\\S\\s]*$/.test(value)); }, defaultMsg: "请输入汉字" },
            { name: "wechat", validate: function (value) { return (!/^[a-zA-Z0-9_-]*$/.test(value)); }, defaultMsg: "请输入正确的微信号(6-20个数字、字母、下划线或减号)" },
            { name: "floatnumber", validate: function (value) { return (!/^\d+(\.\d{1,2})?$/.test(value)); }, defaultMsg: "请输入两位有效小数的数字" },
            { name: "floatsinglenumber", validate: function (value) { return (!/^\d+(\.\d{1})?$/.test(value)); }, defaultMsg: "请输入一位有效小数的数字" },
            { name: "rate", validate: function (value) { return (!/^(\d{1,2}(\.\d{1,2})?|100|100.00)$/.test(value)); }, defaultMsg: "请输入正确的百分比(0~100),保留两位有效数字" },
            { name: "varchar", validate: function (value) { return (!/^[a-zA-Z\u4e00-\u9fa5\s]{1,300}$/.test(value)); }, defaultMsg: "请输入英文或者中文字符" },
            { name: "NoPunctuation", validate: function (value) { return (new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]").test(value)); }, defaultMsg: "不能含有标点符号" },
            { name: "date", validate: function (value) { return (!/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(value)); }, defaultMsg: "日期格式 XXXX-XX-XX" },
            { name: "datetime", validate: function (value) { return (!/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/.test(value)); }, defaultMsg: "日期时间格式 XXXX-XX-XX XX:XX:XX" },
            { name: "datetime2", validate: function (value) { return (!/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/.test(value)); }, defaultMsg: "日期时间格式 XXXX-XX-XX XX:XX" },
            { name: "time", validate: function (value) { return (!/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/.test(value)); }, defaultMsg: "时间格式 XX:XX:XX" }
        ],
        reqmark: true, //是否需要添加标记
        callback: null, //function(obj,params){};  自定义验证
        focus: true //true 遇到错误后会自动聚焦
    };
})(window.jQuery);