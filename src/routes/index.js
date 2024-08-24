const express =  require("express")
const router = express.Router()
const AuthRoute  = require("./Auth.route")

const routes = [
    {
        path:'/auth',
        route:AuthRoute
    },
    {
        path:'/admin/blog',
        route:require("./admin/blogs.admin.route")
    }
]


routes.forEach((c)=>{
    router.use(c.path,c.route)
})

module.exports =router