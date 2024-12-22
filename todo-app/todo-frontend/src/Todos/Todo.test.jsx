import { render, screen } from '@testing-library/react'
import Todo from './Todo'

const testTodo = {
    id: '1',
    text: 'Loads of Stuff to Do',
    done: false
}

test('Todo component is rendered', () => {
 
  render(<Todo todo={testTodo} />)

  const element = screen.getByText('Loads of Stuff to Do')
  expect(element).toBeDefined()
})