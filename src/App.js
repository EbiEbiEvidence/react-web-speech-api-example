import React, { Component } from 'react'
import './App.css'

/**
 * 音声認識APIのイベントハンドラを登録する
 * 
 * @return {webkitSpeechRecognition}
 */
const initSpeechRecognition = ({ onResult, onStart, onEnd }) => {
  // 音声入力オブジェクト生成
  let rec = new window.webkitSpeechRecognition()
  rec.lang = 'ja-JP'
  rec.continuous = false
  rec.interimResults = false

  // 音声認識完了時の処理を登録
  rec.onresult = onResult
  rec.onstart = onStart
  rec.onend = onEnd

  return rec
}

/**
 * 与えられたテキストを音声として読み上げる
 * @param {String} text 
 */
const speak = (text) => {
  // 読み上げ
  const ssu = new window.SpeechSynthesisUtterance()
  ssu.text = text
  ssu.lang = 'ja-JP'
  ssu.rate = 1.0
  window.speechSynthesis.speak(ssu)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.recognizer = initSpeechRecognition({
      onResult: this.onResult,
      onStart: this.onStart,
      onEnd: this.onEnd,
    })
    this.state = {
      transcripts: []
    }
  }

  componentDidMount() {
    this.recognizer.start()
  }

  onStart = () => {

  }

  onEnd = () => {
    this.recognizer.start()
  }

  onResult = (event) => {
    console.log(event)
    const transcript = event.results[0][0].transcript
    speak(transcript)
    this.setState({
      transcripts: [...this.state.transcripts, transcript]
    })
    this.recognizer.stop()
  }

  render() {
    const { transcripts } = this.state

    return (
      <div className="App">
        <h1>オウム返しくん</h1>
        {
          transcripts.map(t => <div>{t}</div>)
        }
      </div>
    )
  }
}

export default App
