import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Music Player UI', () => {
  test('renders albums and plays a track', async () => {
    render(<App />)
    const playButtons = await screen.findAllByText('Play')
    expect(playButtons.length).toBeGreaterThan(0)

    const firstPlay = playButtons[0]
    await userEvent.click(firstPlay)
    const player = await screen.findByTestId('player')
    expect(player).toBeInTheDocument()
    const toggle = screen.getByTestId('play-toggle')
    expect(toggle).toHaveTextContent('Pause')

    await userEvent.click(toggle)
    expect(toggle).toHaveTextContent('Play')
  })

  test('likes and creates playlist', async () => {
    render(<App />)
    const likeBtn = await screen.findByLabelText('like-t1')
    await userEvent.click(likeBtn)
    expect(likeBtn).toHaveClass('like')

    // toggle like off
    await userEvent.click(likeBtn)
    expect(likeBtn).not.toHaveClass('like')

    const input = screen.getByPlaceholderText('New playlist name')
    const createBtn = screen.getByText('Create')
    await userEvent.type(input, 'Chill')
    await userEvent.click(createBtn)
    expect(screen.getByText('Chill')).toBeInTheDocument()

    const select = screen.getAllByRole('combobox')[0]
    await userEvent.selectOptions(select, 't1')
    expect(screen.getByText(/1 tracks/)).toBeInTheDocument()
  })

  test('create playlist via track button', async () => {
    render(<App />)
    const addBtn = await screen.findByLabelText('add-playlist-t1')
    await userEvent.click(addBtn)
    // default name is 'My Playlist'
    expect(screen.getByText('My Playlist')).toBeInTheDocument()
  })
})
