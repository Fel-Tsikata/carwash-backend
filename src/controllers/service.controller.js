const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
} = require("../services/service.service");

const createServiceHandler = async(req,res) => {
    try{
        const service = await createService(req.body);
        res.status(201).json(service);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
};

const getAllServicesHandler = async(req,res) => {
    try{
        const services = await getAllServices();
        res.status(200).json({
            status: "success",
            result: services.length,
            data:services
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};
const getServiceByIdHandler = async(req,res) => {
    const id = req.params.id;
    try{
        const service = await getServiceById(id);
        res.status(200).json({
            status: "success",
            data: service
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};
const updateServiceHandler = async(req,res) => {
     const id = req.params.id;
     try{
        const updatedService = await updateService(id, req.body);
        res.status(200).json({
            status: "success",
            data: updatedService
        })
     }catch(error){
         res.status(500).json({
            status: "error",
            message: error.message
        });
     }
};


module.exports = {
    createServiceHandler,
    getAllServicesHandler,
    getServiceByIdHandler,
    updateServiceHandler,


}