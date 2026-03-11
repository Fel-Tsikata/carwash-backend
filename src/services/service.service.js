const Service = require("../models/service.model");

const createService = async (data) => {
    try {
        const newService = await Service.create(data);
        return newService;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllServices = async () => {
    try{
        const service =  await Service.find();
        return service;
    
    } catch (error) {
        throw new Error(error.message);
    }
};
const getServiceById = async (id) => {
    try{
        const service = await Service.findById(id);
        if(!service){
            throw new Error("Service not found");
        }
        return service;
    }catch(error){
        throw new Error(error.message);
    }
};
const updateService = async (id,data) => {
    try{
        const updatedService = await Service.findByIdAndUpdate(id,data, {new: true});
        if(!updatedService){
            throw new Error("Service not found");
        }
        return updatedService;
    }catch(error){
        throw new Error(error.message);
    }
};
const deleteService = async (id) => {
    try{
        const deletedService = await Service.findByIdAndDelete(id);
        if(!deletedService){
            throw new Error("Service not found");
        }
        return deletedService;
    }catch(error){
        throw new Error(error.message);
    }
};
    

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};