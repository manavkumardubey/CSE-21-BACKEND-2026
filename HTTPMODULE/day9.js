import http from 'http';
const server=http.createServer((req,res)=>{
res.writeHead(200,{"content-type":"text/html"});
if(req.url==="/"){
    res.end("<h1>this is home page</h1>")
}
else if(req.url==="/about"){
    res.end("<h2>this is about page</h2>")
}else if(req.url==="/contactus"){
    res.end("<h3>this is contact info:1234445667789</h3>")
}
});
server.listen(3001,()=>{
    console.log("server working on 3001");
})


