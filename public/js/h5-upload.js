$.fn.extend(
    {
        'h5Upload':function(){
            //点击打开文件夹按钮 开始选择文件
            this.find('#fileOpenFolder').click(function(){
                $('#fileUpload').click()
            })
            var that = this
            //向服务器端上传文件
            this.find('#fileUploadAll').click(function(){
                if(imgList.length == 0){
                    console.log('请选择要上传的图片文件')
                    return false
                }
                var data = ''
                that.find('img').each(function(){
                    data += $(this).attr("src")+"@"
                })

                $.ajax({
                    method:'post',
                    data:{imgData:data},
                    url:'/common/api/file_upload',
                    success:function(res){
                        console.dir(res)
                    },
                    error:function(err){
                        console.dir(err)
                    }
                })
            })

            var imgList = []
            // 添加删除图片效果,点击删除按钮后删除指定位置的图片
            $('#h5ImgUploadList').on('click','.del',function(){
                var currentImgIndex = $('#h5ImgUploadList .del').index(this)
                imgList.splice(currentImgIndex,1)
                initImgHtml()
            })

            $('#fileUpload').change(function(){
                imgList.push(this.files[0])
                initImgHtml()
                // 通过FileReader读取文件
                //var reader = new FileReader()
                //reader.readAsDataURL(this.files[0])
                //reader.onload = function(){
                //    //$('#img').attr("src",this.result)
                //    var $img = $('<li><img><i class="del fa fa-remove"></i></li>')
                //    $img.find('img').attr('src',this.result)
                //    $('#h5ImgUploadList').append($img)
                //    $img.load(function(){
                //        console.dir(this)
                //    })
                //    $.ajax({
                //        method:'post',
                //        data:{imgData:this.result},
                //        url:'/common/api/file_upload',
                //        success:function(res){
                //            console.dir(res)
                //        },
                //        error:function(err){
                //            console.dir(err)
                //        }
                //    })
                //}
            })

            //function doAlert(msg){
            //    alert(msg)
            //}
            function initImgHtml(){
                $('#h5ImgUploadList').html('')
                imgList.forEach(function(imgData){
                    var reader = new FileReader()
                    reader.readAsDataURL(imgData)
                    reader.onload = function(){
                        var $img = $('<li><img><i class="del fa fa-remove"></i></li>')
                        $img.find('img').attr('src',this.result)
                        $('#h5ImgUploadList').append($img)
                        $img.load(function(){
                            console.dir(this)
                        })
                    }
                })
            }

        }
    }
)
$('#upload').h5Upload()
