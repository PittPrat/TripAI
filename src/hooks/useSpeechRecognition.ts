
import { useState, useCallback } from 'react';

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SpeechRecognitionConstructor =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognitionConstructor) {
    console.error("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognitionConstructor();

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
