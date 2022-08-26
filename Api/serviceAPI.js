const express = require("express");
const router = express.Router();
const addsController = require("../controller/addsController")



router.get("/myPage", addsController.getAdds, (request, response) => {

  response.json({
    status: "success",
    method: request.method,
 
  })
});




router.post("/myPage", addsController.createAdds, (request, response) => {
  

  response.json({
    status: "success",
    method: request.method,
    
  });
})

router.put("/myPage/:serviceid", (request, response) => {

  const serviceid = Number(request.params.serviceid);
  const heading = request.body.heading;
  const description = request.body.description;
  const img = request.body.img;
  const email = request.body.email;

  const newService = {
    serviceid,
    heading,
    description,
    img,
    email,

  }


  const serviceIndex = services.findIndex((service) => service.id === serviceid) // hämtar ut index för service vi vill uppdatera
  services[serviceIndex] = newService                                  // i det index vi hämtar ut vill vi skriva över med newService




  response.json({             // skickar tillbaka svar .status- success, metod -put 
    status: 'success',
    method: request.method,
    data: newService,
  });

})

router.delete('/myPage/:serviceid', (request, response) => {

  const serviceid = Number(request.params.serviceid)

  const serviceIndex = services.findIndex((service) => service.id === serviceid)


  if (serviceIndex > -1) {     // om den existerar
    services.splice(serviceIndex, 1)   // tar bort om den existerar på platsen
  }


  response.json({             // skickar tillbaka svar .status- success, metod -put 
    status: 'success',
    method: request.method,
    data: serviceid,
  });
})

module.exports = router;