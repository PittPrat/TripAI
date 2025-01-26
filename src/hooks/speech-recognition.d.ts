// speech-recognition.d.ts
interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
  
  type SpeechRecognition = {
    new (): SpeechRecognitionInstance;
  };
  
  interface SpeechRecognitionInstance {
    continuous: boolean;
    interimResults: boolean;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start(): void;
    stop(): void;
  }
  
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionResultList {
    length: number;
    [index: number]: SpeechRecognitionResult;
  }
  
  interface SpeechRecognitionResult {
    length: number;
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
  }
  
  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }
  
  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }
  
  // main.ts or app.ts
  function initSpeechRecognition() {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognitionConstructor) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }
  
    const recognition = new SpeechRecognitionConstructor();
  
    recognition.continuous = true;
    recognition.interimResults = false;
  
    recognition.onresult = (event) => {
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        console.log("Is final:", result.isFinal);
        for (let j = 0; j < result.length; j++) {
          const alternative = result[j];
          console.log("Transcript:", alternative.transcript);
          console.log("Confidence:", alternative.confidence);
        }
      }
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error, event.message);
    };
  
    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };
  
    recognition.start();
  }
  
  // Call the function when needed (e.g., on page load or button click)
  initSpeechRecognition();
  