// import { useState, useCallback } from 'react';
// import '@types/web-speech-api';


// export function useSpeechRecognition() {
//   const [isListening, setIsListening] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const SpeechRecognition = Window.SpeechRecognition || Window.webkitSpeechRecognition;
//   const recognition = SpeechRecognition ? new SpeechRecognition() : null;

//   if (recognition) {
//     recognition.continuous = true;
//     recognition.interimResults = true;
//   }

//   const startListening = useCallback((onResult: (text: string) => void) => {
//     if (!recognition) {
//       setError('Speech recognition is not supported in this browser');
//       return;
//     }

//     try {
//       recognition.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map(result => result[0].transcript)
//           .join('');

//         if (event.results[0].isFinal) {
//           onResult(transcript);
//         }
//       };

//       recognition.onerror = (event) => {
//         setError(event.error);
//         setIsListening(false);
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//       };

//       recognition.start();
//       setIsListening(true);
//       setError(null);
//     } catch (err) {
//       setError('Error starting speech recognition');
//       setIsListening(false);
//     }
//   }, [recognition]);

//   const stopListening = useCallback(() => {
//     if (recognition) {
//       recognition.stop();
//       setIsListening(false);
//     }
//   }, [recognition]);

//   return { isListening, startListening, stopListening, error };
// }
import { useState, useCallback } from 'react';

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
  }

  const startListening = useCallback(
    (onResult: (text: string) => void) => {
      if (!recognition) {
        setError('Speech recognition is not supported in this browser');
        return;
      }

      try {
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join('');

          if (event.results[0].isFinal) {
            onResult(transcript);
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          setError(event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        setIsListening(true);
        setError(null);
      } catch (err) {
        setError('Error starting speech recognition');
        setIsListening(false);
      }
    },
    [recognition]
  );

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return { isListening, startListening, stopListening, error };
}
