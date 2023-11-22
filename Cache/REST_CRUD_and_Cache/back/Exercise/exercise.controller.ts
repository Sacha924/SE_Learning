const router = require("express").Router();
const exerciseService = require("./exercise.service");

router.get("/", exerciseService.getAllExercises);

router.post("/", exerciseService.createExercise);

router.put("/", exerciseService.updateExercise);

router.delete("/", exerciseService.deleteExercise);


module.exports = router;