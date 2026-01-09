import '@testing-library/jest-dom'

// Mock Audio
class MockAudio {
  src = ''
  onended: any = null
  play = async () => {}
  pause = () => {}
}

// @ts-ignore
global.Audio = MockAudio
