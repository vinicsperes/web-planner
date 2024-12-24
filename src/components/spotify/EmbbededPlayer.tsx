import { useState } from "react";

export function EmbbededPlayer() {
    const [playlistUrl, setPlaylistUrl] = useState<string>('')
    const [embedUrl, setEmbedUrl] = useState<string>('https://open.spotify.com/embed/playlist/40yArd1QnIa8Siy16rPaND?utm_source=generator')

    function handleInputChange(e: HTMLInputElement) {
        setPlaylistUrl(e.value)
    }

    function extractPlaylistId(url: string) {
        const match = url.match(/playlist\/([a-zA-Z0-9]+)(\?.*)?$/)
        return match ? match[1] : null
    }

    function handlePlaylistInput() {
        const playlistId = extractPlaylistId(playlistUrl)
        if (playlistId) {
            setEmbedUrl(`https://open.spotify.com/embed/playlist/${playlistId}`)
        } else {
            alert('Invalid URL')
        }
    }

    return (
        <div>
            {embedUrl && (
                <div style={{ marginTop: "20px" }}>
                    <iframe
                        src={embedUrl}
                        width="300"
                        height="380"
                        allow="encrypted-media"
                        title="Spotify Embed"
                        style={{ borderRadius: "8px" }}
                    ></iframe>
                </div>
            )}
        </div>
    )
}
