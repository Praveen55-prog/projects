class ApiFeatures{
    constructor(query,querystr){
        this.query=query,
        this.querystr=querystr
    }

    search(){
        let keyword=this.querystr.keyword?{
            name:{
                $regex:this.querystr.keyword,
                $options:"i"
            }
        }:{}
        this.query.find({...keyword})
        return this
    }
    filter(){
        const querystrcopy={...this.querystr}
        const removeFields=['keyword','limit','page']
        removeFields.forEach(field=> delete querystrcopy[field])
        let querystr=JSON.stringify(querystrcopy)
        
        querystr=querystr.replace(/\b(gt|gte|lt|lte)/g,match=>`$${match}`)
        this.query.find(JSON.parse(querystr))
        return this
    }
    paginate(resPerPage){
        let currentPage=Number(this.querystr.page) || 1
        let skip=(currentPage-1)*resPerPage
        this.query.limit(resPerPage).skip()
        return this
    }
}
module.exports=ApiFeatures