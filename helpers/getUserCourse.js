const getUserId = function(data){
    let temp = []
    data.map(function(el){
        el.UserCourses.map(function(j) {
            temp.push(j.UserId)
        })
    })
    return temp
}

module.exports =  getUserId