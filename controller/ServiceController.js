/* CreateService = (req, res)=>{
    const body = req.body;

    if(!body){
        return res.status(400).json({
          success: false,
          error: "You must provide a staff"
        })
    }

    const service = new service(body);

    if(!service){
        return res.status(400).json({
            success:false,
            error: err
        })
    }
} */