import { useEffect, useState } from "react"

export const useSpeech = (initial: string) => {
    const [text, setText] = useState<string>(initial);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        const synth = speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
        setUtterance(u);

        return () => {
            synth.cancel();
        }
    }, [text]);

    const play = () => {
        const synth = speechSynthesis;
        if (!utterance) return;
        if (isPaused) {
            synth.resume();
        }
        synth.speak(utterance);
        utterance.addEventListener("end", () => setIsPaused(true));

        setIsPaused(false);

    }

    const pause = () => {
        const synth = speechSynthesis;
        synth.pause();
        setIsPaused(true);
    }

    const stop = () => {
        const synth = speechSynthesis;
        synth.cancel();
        setIsPaused(true);
    }

    return {
        isPaused,
        play,
        pause,
        stop,
        setText
    }
}