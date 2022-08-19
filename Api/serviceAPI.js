const { request, response } = require("express");
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
});

router.post("/myPage",(request, response)=>{
    const service = {
        id: request.body.id,
        heading: request.body.heading,
        description: request.body.description,
        img:request.body.img,
        email:request.body.email
    }

    services.push(service);

    response.json({
        status:"success",
        method:request.method,
        data:services,
    });
})

router.put("/myPage/:serviceid", (request, response) => {

    const serviceid = Number(request.params.serviceid);
    const heading = request.body.heading;
    const description = request.body.description;
    const img = request.body.img;
    const email = request.body.email;

    const newService ={
        serviceid,
        heading,
        description,
        img,
        email,
    
    
   
    }
  

    const serviceIndex = services.findIndex((service)=>service.id === serviceid) // hämtar ut index för todo vi vill uppdatera
    services[serviceIndex] = newService                                  // i det index vi hämtar ut vill vi skriva över med newTodo
    



   response.json({             // skickar tillbaka svar .status- success, metod -put 
    status: 'success',
    method: request.method,
    data: newService,
  });
    
})

router.delete('/myPage/:serviceid', (request, response) => {
    
    const serviceid = Number(request.params.serviceid)
    
     const serviceIndex = services.findIndex((service)=>service.id === serviceid) 
                                   
    
    if (serviceIndex > -1) {
      services.splice(serviceIndex, 1)
    }
  
  
  response.json({             // skickar tillbaka svar .status- success, metod -put 
    status: 'success',
    method: request.method,
    data: serviceid,
  });
})  

module.exports = router;