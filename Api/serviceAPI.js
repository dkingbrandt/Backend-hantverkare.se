const express = require("express");
const router = express.Router();

let services =[
    {
    id:1234561564,
    heading: "Fin snickare i solna",
    description: "Vi är byggfirman för dig som söker en kompetent och serviceinriktad snickare i Stockholm. Vi gör det mesta inom bygg, där vi täcker in områden som tillbyggnad, ombyggnad, renovering, tapetsering, plattsättning och måleri med mera.",
    img:"bild",
    email: "spiken@hammaren.se"
    //price:
}
];

router.get("/myPage", (request,response)=>{
    
    response.json({
        status:"success",
        method:request.method,
        data:services,
    })
})

module.exports = router;