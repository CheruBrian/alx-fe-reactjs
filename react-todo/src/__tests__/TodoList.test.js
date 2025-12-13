import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../components/TodoList'

describe('TodoList Component', () => {
  describe('Initial Render', () => {
    test('renders TodoList component with heading', () => {
      render(<TodoList />)
      const heading = screen.getByRole('heading', { name: /my todo list/i })
      expect(heading).toBeInTheDocument()
    })

    test('renders initial demo todos', () => {
      render(<TodoList />)
      expect(screen.getByText('Learn React')).toBeInTheDocument()
      expect(screen.getByText('Build a Todo App')).toBeInTheDocument()
      expect(screen.getByText('Master Testing')).toBeInTheDocument()
    })

    test('displays correct initial todo count', () => {
      render(<TodoList />)
      expect(screen.getByText(/total todos: 3/i)).toBeInTheDocument()
    })

    test('displays initial stats', () => {
      render(<TodoList />)
      expect(screen.getByText(/completed: 0/i)).toBeInTheDocument()
      expect(screen.getByText(/remaining: 3/i)).toBeInTheDocument()
    })

    test('renders AddTodoForm component', () => {
      render(<TodoList />)
      const input = screen.getByPlaceholderText(/add a new todo/i)
      const button = screen.getByRole('button', { name: /add todo/i })
      expect(input).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })

    test('renders todos as a list', () => {
      render(<TodoList />)
      const todoItems = screen.getAllByRole('checkbox')
      expect(todoItems).toHaveLength(3)
    })
  })

  describe('Adding Todos', () => {
    test('adds a new todo when form is submitted', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const input = screen.getByPlaceholderText(/add a new todo/i)
      const addButton = screen.getByRole('button', { name: /add todo/i })

      await user.type(input, 'Test new todo')
      await user.click(addButton)

      expect(screen.getByText('Test new todo')).toBeInTheDocument()
      expect(screen.getByText(/total todos: 4/i)).toBeInTheDocument()
    })

    test('clears input field after adding todo', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const input = screen.getByPlaceholderText(/add a new todo/i)
      const addButton = screen.getByRole('button', { name: /add todo/i })

      await user.type(input, 'New todo')
      await user.click(addButton)

      expect(input.value).toBe('')
    })

    test('shows error message if input is empty', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const addButton = screen.getByRole('button', { name: /add todo/i })
      await user.click(addButton)

      expect(screen.getByText(/please enter a todo/i)).toBeInTheDocument()
    })

    test('shows error if todo is less than 2 characters', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const input = screen.getByPlaceholderText(/add a new todo/i)
      const addButton = screen.getByRole('button', { name: /add todo/i })

      await user.type(input, 'A')
      await user.click(addButton)

      expect(screen.getByText(/todo must be at least 2 characters long/i)).toBeInTheDocument()
    })

    test('does not add todo if validation fails', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const addButton = screen.getByRole('button', { name: /add todo/i })
      await user.click(addButton)

      expect(screen.getByText(/total todos: 3/i)).toBeInTheDocument()
    })

    test('adds multiple todos successfully', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const input = screen.getByPlaceholderText(/add a new todo/i)
      const addButton = screen.getByRole('button', { name: /add todo/i })

      await user.type(input, 'First todo')
      await user.click(addButton)

      await user.type(input, 'Second todo')
      await user.click(addButton)

      expect(screen.getByText('First todo')).toBeInTheDocument()
      expect(screen.getByText('Second todo')).toBeInTheDocument()
      expect(screen.getByText(/total todos: 5/i)).toBeInTheDocument()
    })

    test('clears error message when user types', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const input = screen.getByPlaceholderText(/add a new todo/i)
      const addButton = screen.getByRole('button', { name: /add todo/i })

      await user.click(addButton)
      expect(screen.getByText(/please enter a todo/i)).toBeInTheDocument()

      await user.type(input, 'New todo')
      expect(screen.queryByText(/please enter a todo/i)).not.toBeInTheDocument()
    })
  })

  describe('Toggling Todos', () => {
    test('toggles todo completion status via checkbox', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const firstCheckbox = screen.getByTestId('todo-checkbox-1')
      expect(firstCheckbox).not.toBeChecked()

      await user.click(firstCheckbox)
      expect(firstCheckbox).toBeChecked()

      await user.click(firstCheckbox)
      expect(firstCheckbox).not.toBeChecked()
    })

    test('toggles todo by clicking on todo text', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const todoText = screen.getByTestId('todo-text-1')
      const checkbox = screen.getByTestId('todo-checkbox-1')

      expect(checkbox).not.toBeChecked()

      await user.click(todoText)
      expect(checkbox).toBeChecked()

      await user.click(todoText)
      expect(checkbox).not.toBeChecked()
    })

    test('updates stats when toggling todos', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      expect(screen.getByText(/completed: 0/i)).toBeInTheDocument()
      expect(screen.getByText(/remaining: 3/i)).toBeInTheDocument()

      const firstCheckbox = screen.getByTestId('todo-checkbox-1')
      await user.click(firstCheckbox)

      expect(screen.getByText(/completed: 1/i)).toBeInTheDocument()
      expect(screen.getByText(/remaining: 2/i)).toBeInTheDocument()
    })

    test('applies completed class to completed todos', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const firstTodoItem = screen.getByTestId('todo-checkbox-1').closest('li')
      expect(firstTodoItem).not.toHaveClass('completed')

      await user.click(screen.getByTestId('todo-checkbox-1'))
      expect(firstTodoItem).toHaveClass('completed')
    })

    test('toggles multiple todos independently', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const checkbox1 = screen.getByTestId('todo-checkbox-1')
      const checkbox2 = screen.getByTestId('todo-checkbox-2')

      await user.click(checkbox1)
      expect(checkbox1).toBeChecked()
      expect(checkbox2).not.toBeChecked()

      await user.click(checkbox2)
      expect(checkbox1).toBeChecked()
      expect(checkbox2).toBeChecked()
    })
  })

  describe('Deleting Todos', () => {
    test('deletes a todo when delete button is clicked', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      expect(screen.getByText('Learn React')).toBeInTheDocument()

      const deleteButton = screen.getByTestId('delete-button-1')
      await user.click(deleteButton)

      expect(screen.queryByText('Learn React')).not.toBeInTheDocument()
      expect(screen.getByText(/total todos: 2/i)).toBeInTheDocument()
    })

    test('deletes correct todo when multiple delete buttons exist', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      expect(screen.getByText('Learn React')).toBeInTheDocument()
      expect(screen.getByText('Build a Todo App')).toBeInTheDocument()

      const deleteButton2 = screen.getByTestId('delete-button-2')
      await user.click(deleteButton2)

      expect(screen.getByText('Learn React')).toBeInTheDocument()
      expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument()
      expect(screen.getByText(/total todos: 2/i)).toBeInTheDocument()
    })

    test('deletes multiple todos sequentially', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const deleteButton1 = screen.getByTestId('delete-button-1')
      await user.click(deleteButton1)
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument()

      const deleteButton2 = screen.getByTestId('delete-button-2')
      await user.click(deleteButton2)
      expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument()

      expect(screen.getByText(/total todos: 1/i)).toBeInTheDocument()
    })

    test('updates stats after deleting a todo', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      expect(screen.getByText(/remaining: 3/i)).toBeInTheDocument()

      const deleteButton = screen.getByTestId('delete-button-1')
      await user.click(deleteButton)

      expect(screen.getByText(/remaining: 2/i)).toBeInTheDocument()
    })

    test('shows empty message when all todos are deleted', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
      
      for (const button of deleteButtons) {
        await user.click(button)
      }

      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()
    })

    test('can add todo after deleting all todos', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
      for (const button of deleteButtons) {
        await user.click(button)
      }

      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()

      const input = screen.getByPlaceholderText(/add a new todo/i)
      const addButton = screen.getByRole('button', { name: /add todo/i })

      await user.type(input, 'New todo after deletion')
      await user.click(addButton)

      expect(screen.getByText('New todo after deletion')).toBeInTheDocument()
      expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    test('complete workflow: add, toggle, delete', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      const input = screen.getByPlaceholderText(/add a new todo/i)
      const addButton = screen.getByRole('button', { name: /add todo/i })

      await user.type(input, 'Integration test todo')
      await user.click(addButton)

      expect(screen.getByText('Integration test todo')).toBeInTheDocument()

      const allCheckboxes = screen.getAllByRole('checkbox')
      const newCheckbox = allCheckboxes[allCheckboxes.length - 1]

      await user.click(newCheckbox)
      expect(newCheckbox).toBeChecked()

      const deleteButtons = screen.getAllByTestId(/^delete-button-/)
      await user.click(deleteButtons[deleteButtons.length - 1])

      expect(screen.queryByText('Integration test todo')).not.toBeInTheDocument()
    })

    test('manages multiple todos with various states', async () => {
      const user = userEvent.setup()
      render(<TodoList />)

      await user.click(screen.getByTestId('todo-checkbox-1'))
      await user.click(screen.getByTestId('todo-checkbox-2'))

      expect(screen.getByText(/completed: 2/i)).toBeInTheDocument()
      expect(screen.getByText(/remaining: 1/i)).toBeInTheDocument()

      await user.type(screen.getByPlaceholderText(/add a new todo/i), 'New task')
      await user.click(screen.getByRole('button', { name: /add todo/i }))

      expect(screen.getByText(/total todos: 4/i)).toBeInTheDocument()
      expect(screen.getByText(/remaining: 2/i)).toBeInTheDocument()

      await user.click(screen.getByTestId('delete-button-1'))

      expect(screen.getByText(/total todos: 3/i)).toBeInTheDocument()
      expect(screen.getByText(/completed: 1/i)).toBeInTheDocument()
    })
  })
})