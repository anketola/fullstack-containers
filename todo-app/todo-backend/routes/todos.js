const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const currentCount = await getAsync("added_todos") || 0
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  updatedCounter = parseInt(currentCount, 10) + 1 
  await setAsync("added_todos", updatedCounter)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  if (req.todo) {
    res.status(200).send(req.todo);
  } else {
    res.sendStatus(403);
  }
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  Object.assign(req.todo, req.body)
  try {
    const updatedTodo = await req.todo.save()
    res.status(200).send(updatedTodo)
  } catch (error) {
    res.status(500).send({ error: 'Update failed' });
  }

});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
