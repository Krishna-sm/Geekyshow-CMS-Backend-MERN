const slugify = require("slugify")
// exports.Roles = ['gs_user','gs_admin']
exports.Roles = {
    'user':'gs_user',
    'admin':'gs_admin'
}


exports.slugifyFn = (str)=>{
    return slugify(str,{
         replacement: '-',  // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: false,      // convert to lower case, defaults to `false`
  strict: false,     // strip special characters except replacement, defaults to `false`
  locale: 'vi',      // language code of the locale to use
  trim: true  
    })+"-"+new Date().getTime()
}

exports.ImageMimeType = [
    '.jpg','.jpeg','.png','.gif','.svg'
]