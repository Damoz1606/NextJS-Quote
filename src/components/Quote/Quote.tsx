import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '../Card'
import styles from '@/styles/Quote.module.css'
import { copyToClipboard } from '@/utils'
import { useSpeech } from '@/hook'
import { fetchQuote } from '@/api/quote.api'
import { CircleLoader } from '../Loader'

const Quote: React.FC = () => {

    const speech = useSpeech("");
    const [quote, setQuote] = useState<string>("")
    const [author, setAuthor] = useState<string>("");
    const [loadingQuote, setLoadingQuote] = useState<boolean>(true);

    useEffect(() => {
        handleNextQuote();
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleSpeechQuote = () => {
        speech.isPaused
            ? speech.play()
            : speech.stop();
    }

    const handleCopyQuote = () => {
        copyToClipboard(quote);
    }

    const handleNextQuote = async () => {
        setLoadingQuote(true);
        try {
            const result = await fetchQuote();
            console.log(result);
            const newQuote = result.content;
            const newAuthor = result.author;
            setQuote(newQuote);
            setAuthor(newAuthor);
            speech.setText(`${newQuote} by ${newAuthor}`);
        } catch (error) {

        } finally {
            setLoadingQuote(false);
        }
    }

    return (
        <Card>
            <CardHeader>Quote of the day</CardHeader>
            <CardBody>
                {
                    loadingQuote ?
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignContent: "center" }}>
                            <CircleLoader />
                        </div>
                        : <>
                            <div className={styles.quote_area}>
                                <svg className={`${styles.open_quote}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.49999 10C6.27699 10 6.06299 10.034 5.84999 10.065C5.91899 9.833 5.98999 9.597 6.10399 9.385C6.21799 9.077 6.39599 8.81 6.57299 8.541C6.72099 8.25 6.98199 8.053 7.17399 7.804C7.37499 7.562 7.64899 7.401 7.86599 7.2C8.07899 6.99 8.35799 6.885 8.57999 6.737C8.81199 6.604 9.01399 6.457 9.22999 6.387L9.76899 6.165L10.243 5.968L9.75799 4.03L9.16099 4.174C8.96999 4.222 8.73699 4.278 8.47199 4.345C8.20099 4.395 7.91199 4.532 7.58999 4.657C7.27199 4.799 6.90399 4.895 6.56199 5.123C6.21799 5.341 5.82099 5.523 5.47099 5.815C5.13199 6.116 4.72299 6.377 4.42099 6.76C4.09099 7.118 3.76499 7.494 3.51199 7.922C3.21899 8.33 3.01999 8.778 2.80999 9.221C2.61999 9.664 2.46699 10.117 2.34199 10.557C2.10499 11.439 1.99899 12.277 1.95799 12.994C1.92399 13.712 1.94399 14.309 1.98599 14.741C2.00099 14.945 2.02899 15.143 2.04899 15.28L2.07399 15.448L2.09999 15.442C2.27785 16.2728 2.6873 17.0363 3.28096 17.6442C3.87462 18.252 4.62823 18.6794 5.45463 18.8768C6.28103 19.0743 7.14644 19.0337 7.95075 18.7598C8.75506 18.486 9.4654 17.99 9.9996 17.3293C10.5338 16.6686 10.87 15.8701 10.9694 15.0263C11.0688 14.1825 10.9272 13.3278 10.5611 12.561C10.195 11.7943 9.61933 11.1469 8.90064 10.6936C8.18196 10.2404 7.34965 9.99994 6.49999 10ZM17.5 10C17.277 10 17.063 10.034 16.85 10.065C16.919 9.833 16.99 9.597 17.104 9.385C17.218 9.077 17.396 8.81 17.573 8.541C17.721 8.25 17.982 8.053 18.174 7.804C18.375 7.562 18.649 7.401 18.866 7.2C19.079 6.99 19.358 6.885 19.58 6.737C19.812 6.604 20.014 6.457 20.23 6.387L20.769 6.165L21.243 5.968L20.758 4.03L20.161 4.174C19.97 4.222 19.737 4.278 19.472 4.345C19.201 4.395 18.912 4.532 18.59 4.657C18.273 4.8 17.904 4.895 17.562 5.124C17.218 5.342 16.821 5.524 16.471 5.816C16.132 6.117 15.723 6.378 15.421 6.76C15.091 7.118 14.765 7.494 14.512 7.922C14.219 8.33 14.02 8.778 13.81 9.221C13.62 9.664 13.467 10.117 13.342 10.557C13.105 11.439 12.999 12.277 12.958 12.994C12.924 13.712 12.944 14.309 12.986 14.741C13.001 14.945 13.029 15.143 13.049 15.28L13.074 15.448L13.1 15.442C13.2779 16.2728 13.6873 17.0363 14.281 17.6442C14.8746 18.252 15.6282 18.6794 16.4546 18.8768C17.281 19.0743 18.1464 19.0337 18.9507 18.7598C19.7551 18.486 20.4654 17.99 20.9996 17.3293C21.5338 16.6686 21.87 15.8701 21.9694 15.0263C22.0688 14.1825 21.9272 13.3278 21.5611 12.561C21.195 11.7943 20.6193 11.1469 19.9006 10.6936C19.182 10.2404 18.3496 9.99994 17.5 10Z"
                                        fill="black" />
                                </svg>
                                <div className={styles.quote}>
                                    <p>{quote}</p>
                                </div>
                                <svg className={`${styles.end_quote}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.95 8.721L21.925 8.553L21.899 8.559C21.7213 7.72804 21.312 6.96437 20.7183 6.35635C20.1247 5.74833 19.3711 5.32082 18.5446 5.12328C17.7181 4.92574 16.8526 4.96625 16.0482 5.24011C15.2438 5.51397 14.5334 6.00999 13.9991 6.67079C13.4649 7.33159 13.1286 8.13015 13.0293 8.97408C12.93 9.818 13.0717 10.6728 13.4379 11.4396C13.8042 12.2063 14.3801 12.8537 15.0989 13.3068C15.8178 13.76 16.6502 14.0003 17.5 14C17.723 14 17.937 13.966 18.15 13.935C18.081 14.167 18.01 14.403 17.896 14.615C17.782 14.923 17.604 15.19 17.427 15.459C17.279 15.75 17.018 15.947 16.826 16.196C16.625 16.438 16.351 16.599 16.134 16.8C15.921 17.01 15.642 17.115 15.42 17.263C15.188 17.396 14.986 17.543 14.77 17.613L14.231 17.835L13.757 18.032L14.241 19.971L14.838 19.827C15.029 19.779 15.262 19.723 15.527 19.656C15.798 19.606 16.087 19.469 16.409 19.344C16.726 19.201 17.095 19.106 17.437 18.877C17.781 18.659 18.178 18.477 18.528 18.185C18.867 17.884 19.276 17.623 19.578 17.241C19.908 16.883 20.234 16.507 20.487 16.079C20.78 15.671 20.979 15.223 21.189 14.78C21.379 14.337 21.532 13.884 21.657 13.444C21.894 12.562 22 11.724 22.041 11.007C22.075 10.289 22.055 9.692 22.013 9.26C21.9989 9.07959 21.9779 8.89979 21.95 8.721ZM10.95 8.721L10.925 8.553L10.899 8.559C10.7213 7.72804 10.312 6.96437 9.71833 6.35635C9.12471 5.74833 8.37106 5.32082 7.54459 5.12328C6.71812 4.92574 5.85261 4.96625 5.0482 5.24011C4.24379 5.51397 3.53336 6.00999 2.99911 6.67079C2.46486 7.33159 2.12863 8.13015 2.02932 8.97408C1.93 9.818 2.07167 10.6728 2.43793 11.4396C2.80418 12.2063 3.38006 12.8537 4.09892 13.3068C4.81778 13.76 5.65024 14.0003 6.49999 14C6.72299 14 6.93699 13.966 7.14999 13.935C7.08099 14.167 7.00999 14.403 6.89599 14.615C6.78199 14.923 6.60399 15.19 6.42699 15.459C6.27899 15.75 6.01799 15.947 5.82599 16.196C5.62499 16.438 5.35099 16.599 5.13399 16.8C4.92099 17.01 4.64199 17.115 4.41999 17.263C4.18799 17.396 3.98599 17.543 3.76999 17.613L3.23099 17.835C2.92999 17.958 2.75799 18.03 2.75799 18.03L3.24199 19.969L3.83899 19.825C4.02999 19.777 4.26299 19.721 4.52799 19.654C4.79899 19.604 5.08799 19.467 5.40999 19.342C5.72699 19.199 6.09599 19.104 6.43799 18.875C6.78199 18.657 7.17899 18.475 7.52899 18.183C7.86799 17.882 8.27699 17.621 8.57899 17.239C8.90899 16.881 9.23499 16.505 9.48799 16.077C9.78099 15.669 9.97999 15.221 10.19 14.778C10.38 14.335 10.533 13.882 10.658 13.442C10.895 12.56 11.001 11.722 11.042 11.005C11.076 10.287 11.056 9.69 11.014 9.258C10.9991 9.0783 10.9777 8.89918 10.95 8.721Z"
                                        fill="black" />
                                </svg>
                            </div>
                            <div className={`${styles.quote_author}`}>
                                <span>-</span>
                                <span className={`${styles.name}`}>{author}</span>
                            </div>
                        </>
                }
            </CardBody>
            <CardFooter>
                <div className={`${styles.quote_buttons}`}>
                    <div className={`${styles.button_box}`}>
                        <button className={`${styles.speech}`} onClick={handleSpeechQuote} disabled={loadingQuote}>
                            {
                                speech.isPaused
                                    ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                                    </svg>
                            }
                        </button>
                        <button className={`${styles.copy}`} onClick={handleCopyQuote} disabled={loadingQuote}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                        </button>
                    </div>
                    <button onClick={handleNextQuote} className={`${styles.next_quote}`} disabled={loadingQuote}>{loadingQuote ? "Loading..." : "New Quote"}</button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default Quote