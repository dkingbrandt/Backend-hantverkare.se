const { request, response, application } = require("express");
const express = require("express");
const router = express.Router();

let services = [
  {
    id: 1234561564,
    heading: "Fin snickare i solna",
    description: "Vi är byggfirman för dig som söker en kompetent och serviceinriktad snickare i Stockholm. Vi gör det mesta inom bygg, där vi täcker in områden som tillbyggnad, ombyggnad, renovering, tapetsering, plattsättning och måleri med mera.",
    img: "https://images.staticjw.com/sni/9922/snickare1.jpg",
    email: "spiken@hammaren.se"
    //price:
  },
  {
    id: 1234561565,
    heading: "VVS Söderort",
    description: "Hela VVS Söderorts verksamhet genomsyras av kvalite och välkända fabrikat. Vi erbjuder ett brett sortiment inom vvs såsom rör och pumpar. Välkommen!",
    img: "https://cdn.pixabay.com/photo/2017/09/26/11/10/plumber-2788329_1280.jpg",
    email: "ror@soderort.se"

  },
  {
    id: 1234561566,
    heading: "Helenelunds Måleri",
    description: "En målerifirma baserad i Sollentuna som utför arbeten i hela Storstockholm Med lång erfarenhet ",
    img: "https://byggzon.se/wp-content/uploads/2019/02/vad-gor-en-malare.jpg",
    email: "pensel@maleri.nu"

  },
  {
    id: 1234561564,
    heading: "Golvfixarn Kista",
    description: "Vi på Golvfixarn Kista har många års erfarenhet av golvläggning vilket gör att vi alltid levererar på högsta nivå. Oavsett om det rör sig om att lägga ett enklare parkettgolv eller om du är intresserad av mer avancerade golvläggningar.",
    img: "https://nardibygg.se/storage/2021/10/laminat-262x203.jpg",
    email: "parkett@kista.com"

  }
];

router.get("/myPage", (request, response) => {

  response.json({
    status: "success",
    method: request.method,
    data: services,
  })
});




router.post("/myPage", (request, response) => {
  const service = {
    id: request.body.id,
    heading: request.body.heading,
    description: request.body.description,
    img: request.body.img,
    email: request.body.email
  }

  services.push(service);

  response.json({
    status: "success",
    method: request.method,
    data: services,
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