const User =  require('../models/user.js');
const jwt  = require('jsonwebtoken');
const keys = require('../config/keys.js');
module.exports = {

    async delete(req,res){
        try {
            const data = await User.delete(req.params.id)
            console.log(data);
            if(!data){
                return res.status(404).json({
                    succes:false,
                    message:"El registro que intenta borrar no existe",
                    data:{
                        id:req.params.id
                    }
                });
            }

            return res.status(201).json({
                succes:true,
                message:"Usuario eliminado correctamente.. ",
                data:{
                    id:req.params.id
                }
            });

        } catch (error) {
            console.log("Error: "+error);
            return res.status(501).json({
                succes:false,
                message:"Ocurrio un error al eliminar el registro....",
                error:error
            });
            
        }
        
    },

    async getAll(req,res,next){
        try {
            const data = await User.getAll();
            if(data.length ==0){
                return res.status(404).json({
                    succes:false,
                    message:"Aun no existen registros....",
                    data:data
                });
            }
            console.log('Usuario: '+data); 
            return res.status(201).json(data);
        } catch (error) {
            console.log('Error: '+error);
            return res.status(501).json(
                {
                    succes:false,
                    message: 'Error al obtner los usuario',
                }
            );
        }
    },

    async register(req,res,next){
        try {
            const user = req.body;
            const data = await User.create(user);    
        
            return res.status(201).json({
                success: true,
                message:'El registro se realiza correctamente',
                data:data.id_user
            });

        } catch (error) {
            console.log('Error: '+ error);
            return res.status(501).json({
                success: false,
                message:'Error con el registro del usuario...',
                error:error
            });
        }
    },

    async updateUsers(req,res,next){
        try {
            const id = req.params.id;
            const userToUpdate = req.body;
            console.log(id+ "   "+userToUpdate);
            const data  = await User.update(id, userToUpdate);
            
            if(data==null){
                return res.status(404).json({
                    succes:false,
                    message:"No se ha encontrado el registro a actualizar...",
                    data:data
                });
            }

            return res.status(201).json({
                succes:true,
                message:"Registro actualizado correctamente...",
                data:data
            });
            
        } catch (error) {
            return res.status(501).json({
                succes:false,
                message:"Error al intentar actulizar el registro",
                error:error
            });
            
        }
    }
};