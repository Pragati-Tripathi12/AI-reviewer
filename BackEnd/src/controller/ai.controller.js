const aiService=require("../services/ai.service")

module.exports.getReview=async (req,res)=>{
    console.log("Received body:", req.body);
    const code=req.body?.code;
    if(!code){
        return res.status(400).send("prompt required");
    }
    const response=await aiService(code);

    res.send(response);
}