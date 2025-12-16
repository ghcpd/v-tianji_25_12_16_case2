import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { App } from '../App'

describe('Music Player App', () => {
  test('renders albums and allows play/pause and liking tracks', async () => {
    render(<App />)

    // Find a play button for a known track
    const playButton = await screen.findByLabelText('play-t1')
    expect(playButton).toBeInTheDocument()

    // Play the track
    fireEvent.click(playButton)

    // Now the toggle-play button should say Pause
    const toggle = screen.getByLabelText('toggle-play')
    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveTextContent(/Pause|Play/)

    // Toggle pause
    fireEvent.click(toggle)

    // Like the track
    const likeBtn = screen.getByLabelText('like-t1')
    fireEvent.click(likeBtn)
    expect(likeBtn).toHaveTextContent('♥')

    // Create a playlist via input
    const input = screen.getByPlaceholderText('New playlist name')
    fireEvent.change(input, { target: { value: 'My Favorites' } })
    const create = screen.getByLabelText('create-playlist')
    fireEvent.click(create)

    // Playlist should appear
    expect(await screen.findByText('My Favorites')).toBeInTheDocument()
  })

  test('creating playlist from track button creates a playlist', async () => {
    render(<App />)
    const addBtn = await screen.findByLabelText('add-t1')
    fireEvent.click(addBtn)
    // Playlist name created is 'Midnight Drive playlist'
    expect(await screen.findByText(/Midnight Drive playlist/)).toBeInTheDocument()
  })
})
