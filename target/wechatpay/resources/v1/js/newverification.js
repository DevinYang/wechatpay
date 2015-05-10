$("").
/*
*功能：使select可以编辑，动态输入内容和删除
* 参数：sel  select标签对应dom 对象
*/
function editable(sel) {
    var selectIndex = 0;
    var opt = sel.options[selectIndex];
    var oldtext = opt.text;
    function update() {
        if(oldtext!=opt.text) {
            if(opt.text=='') {//如果将option内容全删了,就删除此option
                sel.remove(opt.index);
            } else {
                opt.value = opt.text;
            }
        }
        var addFlag = true;
        for(var i=0; i<sel.options.length; i++) {
            if(!sel.options[i].text&&!sel.options[i].value) {//如果存在空option则返回
                addFlag = false;
            }
        }
        if(addFlag) {//需要添加新的空option
            //sel.appendChild(document.createElement('option'));//末尾插入option
            sel.insertBefore(document.createElement('option'),sel.options[0]);
        }
        //更新选中的option
        selectIndex = sel.selectedIndex||0;
        opt = sel.options[selectIndex];
        oldtext = opt.text;
    }
    function stopDefault(e) {
        if(e.stopPropagation) {
            e.preventDefault();
            e.stopPropagation()
        } else {
            e.cancelBubble = true;
            e.returnValue = false;
        }
    }
    /*
    * IE和FF中onkeydown和onkeypress事件触发情况有所不同
    */
    function keydown(e) {
        var e=e||window.event;
        var keyCode = e.keyCode || e.which;
        switch(keyCode) {
            case 8:
                if(opt.text.length>0) {
                    opt.text = opt.text.substring(0,opt.text.length-1);
                }
                stopDefault(e);//对退格键，阻止事件冒泡和浏览器默认动作，防止浏览器倒退到前一页面
                break;
            case 13:
                break;
            default:
                break;
        }
    }
    function keypress(e) {
        var e=e||window.event;
        var keyCode = e.keyCode || e.which;
        if(keyCode==8){//注：IE中onkeypress检测不到backspace键，火狐可以
            return;
        }
        opt.text += String.fromCharCode(keyCode);
    }
    sel.onchange=sel.onblur=function(){
        update();
    }
    sel.onkeydown=keydown;
    sel.onkeypress=keypress;    
}
