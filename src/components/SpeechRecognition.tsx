declare global {
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
  
    interface SpeechRecognitionEvent {
      results: SpeechRecognitionResultList;
    }
  
    interface SpeechRecognitionResultList {
      [index: number]: SpeechRecognitionResult;
    }
  
    interface SpeechRecognitionResult extends SpeechRecognitionResult {
      readonly isFinal: boolean;
      readonly [index: number]: SpeechRecognitionAlternative;
    }
  
    interface SpeechRecognitionAlternative extends SpeechRecognitionAlternative {
      readonly transcript: string;
      readonly confidence: number;
    }
  
    interface SpeechRecognitionErrorEvent {
      error: string;
      message: string;
    }
  }
  
  export {};
  