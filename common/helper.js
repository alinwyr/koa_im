module.exports = {

    error (code=500, message="操作失败", data={}) {
        if(typeof message == "undefined") message = '操作失败'
        if(typeof code == "undefined") code = 500
        return { code, message, data }
    },
    
    success (data={}, message='操作成功') {
        return { code:0, message, data }
    }
}