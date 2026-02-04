import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Music Player UI', () => {
  test('renders album list and albums', () => {
    render(<App />)
    const list = screen.getByTestId('album-list')
    expect(list).toBeInTheDocument()
    const album1 = within(list).getByTestId('album-alb1')
    expect(album1).toBeInTheDocument()
    const album2 = within(list).getByTestId('album-alb2')
    expect(album2).toBeInTheDocument()
  })

  test('can play a track and show player bar', async () => {
    render(<App />)
    const user = userEvent.setup()
    const playBtn = screen.getByLabelText('play-t1')
    await user.click(playBtn)
    // now player bar should appear
    const playToggle = await screen.findByTestId('play-toggle')
    expect(playToggle).toBeInTheDocument()
    expect(playToggle).toHaveTextContent('Pause')

    // pause
    await user.click(playToggle)
    expect(playToggle).toHaveTextContent('Play')
  })

  test('liking a track toggles state and player like works', async () => {
    render(<App />)
    const user = userEvent.setup()
    const likeBtn = screen.getByTestId('like-t2')
    expect(likeBtn).toHaveClass('like')
    await user.click(likeBtn)
    expect(likeBtn).toHaveClass('liked')

    // play t2 then like in player bar
    await user.click(screen.getByLabelText('play-t2'))
    const likeNow = await screen.findByTestId('like-now')
    expect(likeNow).toBeInTheDocument()
    // it's liked already
    expect(likeNow).toHaveClass('liked')
    await user.click(likeNow)
    expect(likeNow).not.toHaveClass('liked')
  })

  test('create a playlist and add a track to it', async () => {
    render(<App />)
    const user = userEvent.setup()
    const input = screen.getByTestId('pl-input')
    const create = screen.getByTestId('pl-create')
    await user.type(input, 'Chill Vibes')
    await user.click(create)
    const list = screen.getByTestId('pl-list')
    const pl = within(list).getByText('Chill Vibes')
    expect(pl).toBeInTheDocument()

    // Add a track to playlist via select
    const select = screen.getByTestId('add-to-t3')
    // open options and choose the first (value is playlist id)
    await user.selectOptions(select, Array.from(select.querySelectorAll('option'))[1])
    // the playlist item should update to show 1 track
    const plCard = within(list).getByText('Chill Vibes').closest('.playlist')
    expect(within(plCard).getByText('1 tracks')).toBeInTheDocument()
  })
})
